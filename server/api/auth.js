import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import { supabase } from '../db/index.js';

// USIAMO IL MIDDLEWARE DAL FILE sec/jwtauth.js
import { requireJwtAuth } from '../sec/jwtauth.js';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;
const SESSION_DURATION = '24h';

/**
 * POST /auth/register
 * Crea un nuovo utente
 */
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Campi obbligatori mancanti' });
    }

    const { data: duplicate } = await supabase
      .from('users')
      .select('id')
      .or(`username.eq.${username},email.eq.${email}`)
      .single();

    if (duplicate) {
      return res.status(409).json({ error: 'Username o email già registrati' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const otp = speakeasy.generateSecret({ length: 20 });

    const { data: user, error } = await supabase
      .from('users')
      .insert({
        username,
        email,
        password_hash: passwordHash,
        salt,
        otp_secret: otp.base32,
        bio: null
      })
      .select()
      .single();

    if (error) throw error;

    const token = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: SESSION_DURATION }
    );

    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token,
      otp_secret: otp.base32
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /auth/login
 * Step 1: username + password
 */
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Credenziali mancanti' });
    }

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (!user) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }

    // 🔐 STEP OTP
    if (user.otp_secret) {
      const tempToken = jwt.sign(
        {
          id: user.id,
          stage: 'otp' // ⬅️ coerente con jwtauth.js
        },
        JWT_SECRET,
        { expiresIn: '5m' }
      );

      return res.json({
        requires_otp: true,
        temp_token: tempToken
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: SESSION_DURATION }
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

/**
 * POST /auth/verify-otp
 * Step 2: verifica OTP
 */
router.post('/verify-otp', async (req, res, next) => {
  try {
    const { temp_token, otp_token } = req.body;

    if (!temp_token || !otp_token) {
      return res.status(400).json({ error: 'Dati OTP mancanti' });
    }

    let decoded;
    try {
      decoded = jwt.verify(temp_token, JWT_SECRET);
    } catch {
      return res.status(401).json({ error: 'Token OTP non valido o scaduto' });
    }

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
      { expiresIn: SESSION_DURATION }
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

/**
 * POST /auth/logout
 */
router.post('/logout', (_req, res) => {
  res.json({
    success: true,
    message: 'Logout effettuato'
  });
});

/**
 * GET /auth/otp/setup
 */
router.get('/otp/setup', requireJwtAuth, async (req, res, next) => {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('otp_secret, email')
      .eq('id', req.user.id)
      .single();

    let secret = user.otp_secret;

    if (!secret) {
      const generated = speakeasy.generateSecret({ length: 20 });
      secret = generated.base32;

      await supabase
        .from('users')
        .update({ otp_secret: secret })
        .eq('id', req.user.id);
    }

    const otpUrl = speakeasy.otpauthURL({
      secret,
      label: `MiniTwitter:${user.email}`,
      issuer: 'MiniTwitter',
      encoding: 'base32'
    });

    res.json({
      secret,
      otpauth_url: otpUrl
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /auth/otp/status
 */
router.get('/otp/status', requireJwtAuth, async (req, res, next) => {
  try {
    const { data } = await supabase
      .from('users')
      .select('otp_secret')
      .eq('id', req.user.id)
      .single();

    res.json({
      otp_enabled: Boolean(data?.otp_secret)
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /auth/me
 */
router.get('/me', requireJwtAuth, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      bio: req.user.bio,
      has_otp: !!req.user.otp_secret
    }
  });
});

export default router;