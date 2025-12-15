import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import { supabase } from '../db/index.js';
import { requireJwtAuth } from '../sec/jwtauth.js';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_DURATION = '24h';

/* ======================================================
   REGISTER
   POST /api/auth/register
   ====================================================== */
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Campi obbligatori mancanti' });
    }

    // Controllo se username o email esistono già
    const { data: existing, error: checkError } = await supabase
      .from('users')
      .select('id')
      .or(`username.eq.${username},email.eq.${email}`);

    if (checkError) throw checkError;

    if (existing.length > 0) {
      return res.status(409).json({ error: 'Username o email già registrati' });
    }

    // Hash password (bcrypt gestisce il salt internamente)
    const passwordHash = await bcrypt.hash(password, 10);

    // OTP secret (opzionale)
    const otpSecret = speakeasy.generateSecret({ length: 20 });

    const { data: user, error } = await supabase
      .from('users')
      .insert({
        username,
        email,
        password_hash: passwordHash,
        otp_secret: otpSecret.base32,
        bio: null
      })
      .select()
      .single();

    if (error) throw error;

    const token = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: TOKEN_DURATION }
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
    next(err);
  }
});

/* ======================================================
   LOGIN
   POST /api/auth/login
   ====================================================== */
router.post('/login', async (req, res, next) => {
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

    const passwordValid = await bcrypt.compare(password, user.password_hash);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }

    // Se OTP attivo → step intermedio
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

    // Login normale
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: TOKEN_DURATION }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
});

/* ======================================================
   VERIFY OTP
   POST /api/auth/verify-otp
   ====================================================== */
router.post('/verify-otp', async (req, res, next) => {
  try {
    const { temp_token, otp_token } = req.body;

    if (!temp_token || !otp_token) {
      return res.status(400).json({ error: 'Dati OTP mancanti' });
    }

    const decoded = jwt.verify(temp_token, JWT_SECRET);

    if (decoded.stage !== 'otp') {
      return res.status(401).json({ error: 'Token non valido' });
    }

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', decoded.id)
      .single();

    if (!user) {
      return res.status(401).json({ error: 'Utente non trovato' });
    }

    const otpValid = speakeasy.totp.verify({
      secret: user.otp_secret,
      encoding: 'base32',
      token: otp_token,
      window: 2
    });

    if (!otpValid) {
      return res.status(401).json({ error: 'Codice OTP errato' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: TOKEN_DURATION }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
});

/* ======================================================
   ME
   GET /api/auth/me
   ====================================================== */
router.get('/me', requireJwtAuth, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      bio: req.user.bio,
      has_otp: Boolean(req.user.otp_secret)
    }
  });
});

/* ======================================================
   LOGOUT
   ====================================================== */
router.post('/logout', (_req, res) => {
  res.json({ success: true });
});

export default router;