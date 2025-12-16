//import
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import { supabase } from '../db/index.js';
import { requireJwtAuth } from '../sec/jwtauth.js';

//consts
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;
const SESSION_DURATION = '24h';

////ROUTES POSTS////
//POST register
//per aggiungere un utente nel database
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Campi obbligatori mancanti' });
    }

    // controllo duplicati
    const { data: existing, error: checkError } = await supabase
      .from('users')
      .select('id')
      .or(`username.eq.${username},email.eq.${email}`);

    if (checkError) throw checkError;
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Utente già esistente' });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);
    const otp = speakeasy.generateSecret({ length: 20 });

    // inserimento utente
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        username,
        email,
        password_hash: passwordHash,
        otp_secret: null,
        bio: null
      })
      .select()
      .single();

    if (error) throw error;

    // JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: SESSION_DURATION }
    );

    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });

  } catch (err) {
    console.error('REGISTER ERROR:', err);
    res.status(500).json({ error: 'Errore interno' });
  }
});

//POST login
//per effettuare il login ossia ricevere il token che permetterà tutte le operazioni protette da token
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Credenziali mancanti' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }

    // otp deve essere attivo per passare allo step successivo
    if (user.otp_secret) {
      const tempToken = jwt.sign(
        { id: user.id, stage: 'otp' },
        JWT_SECRET,
        { expiresIn: '5m' }
      );

      return res.json({
        requires_otp: true,
        temp_token: tempToken
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: SESSION_DURATION }
    );

    res.json({ token });

  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ error: 'Errore interno' });
  }
});

//POST otp
router.post('/enable-otp', requireJwtAuth, async (req, res) => {
  try {
    const otp = speakeasy.generateSecret({
      length: 16,
      name: `MiniTwitter (${req.user.email})`
    });

    const { error } = await supabase
      .from('users')
      .update({ otp_secret: otp.base32 }) // SOLO base32
      .eq('id', req.user.id);

    if (error) throw error;

    res.json({
      otp_enabled: true,
      secret: otp.base32,        // 👉 da inserire MANUALMENTE in Google
      otpauth_url: otp.otpauth_url
    });
  } catch (err) {
    console.error('ENABLE OTP ERROR:', err);
    res.status(500).json({ error: 'Errore attivazione OTP' });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { temp_token, otp_token } = req.body;

    if (!temp_token || !otp_token) {
      return res.status(400).json({ error: 'Token mancanti' });
    }

    const decoded = jwt.verify(temp_token, JWT_SECRET);

    if (decoded.stage !== 'otp') {
      return res.status(401).json({ error: 'Token non valido' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, otp_secret')
      .eq('id', decoded.id)
      .single();

    if (error || !user || !user.otp_secret) {
      return res.status(401).json({ error: 'Utente non valido' });
    }

    const valid = speakeasy.totp.verify({
      secret: user.otp_secret,
      encoding: 'base32',
      token: otp_token,
      window: 1
    });

    if (!valid) {
      return res.status(401).json({ error: 'OTP errato' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: SESSION_DURATION }
    );

    res.json({ token });
  } catch (err) {
    console.error('OTP ERROR:', err);
    res.status(500).json({ error: 'Errore OTP' });
  }
});

//POST LOGOUT
//scordarsi del token
router.post('/logout', (_req, res) => {
  res.json({ success: true });
});

export default router;

////ROUTES GETS////
//GET test
//verificare che postman funzioni
router.get('/_test', (_req, res) => {
  res.json({
    ok: true,
    message: 'AUTH ROUTER FUNZIONA'
  });
});

//GET me
//ottenere le informazioni di un utente registrato
router.get('/me', requireJwtAuth, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      bio: req.user.bio
    }
  });
});

//GET otp setup
router.get('/otp/setup', requireJwtAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const secret = speakeasy.generateSecret({
      length: 16,
      name: `MiniTwitter (${req.user.email})`
    });

    const { error } = await supabase
      .from('users')
      .update({
        otp_secret: secret.base32
      })
      .eq('id', userId);

    if (error) throw error;

    res.json({
      otp_enabled: true,
      secret: secret.base32,
      otpauth_url: secret.otpauth_url
    });
  } catch (err) {
    console.error('OTP SETUP ERROR:', err);
    res.status(500).json({ error: 'Errore setup OTP' });
  }
});
