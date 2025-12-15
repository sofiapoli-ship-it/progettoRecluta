import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import 'dotenv/config';

// Router principale API
import apiRouter from './api/index.js';

// Setup app
const app = express();
const PORT = process.env.PORT || 3000;

/* =========================
   Middleware base
   ========================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   Sessione (necessaria a Passport)
   ========================= */
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production'
    }
  })
);

/* =========================
   Passport
   ========================= */
app.use(passport.initialize());
app.use(passport.session());

/* =========================
   Logging richieste
   ========================= */
app.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

/* =========================
   Routing
   ========================= */
app.use('/api', apiRouter);

app.get('/', (_req, res) => {
  res.json({
    message: 'Mini Twitter Backend attivo',
    health: '/api/healthz'
  });
});

/* =========================
   Error handling
   ========================= */
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint non trovato' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Errore interno del server' });
});

/* =========================
   Avvio server
   ========================= */
app.listen(PORT, () => {
  console.log(`✅ Server avviato su http://localhost:${PORT}`);
});