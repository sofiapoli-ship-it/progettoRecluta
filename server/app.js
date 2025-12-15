import express from "express";
import cors from "cors";
import authRoutes from "./api/auth.js";

const app = express();

app.use(cors());
app.use(express.json());import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import 'dotenv/config';

// Router principale delle API
import apiRouter from './server/api/index.js';

/**
 * Crea e configura l'applicazione Express
 */
export function createApp() {
  const app = express();

  /* =========================
     Middleware di base
     ========================= */

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /* =========================
     Sessione (necessaria a Passport)
     ========================= */

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
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
     Logging richieste (debug)
     ========================= */

  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });

  /* =========================
     Routing
     ========================= */

  // API principali
  app.use('/api', apiRouter);

  // Root informativa
  app.get('/', (_req, res) => {
    res.json({
      message: 'Mini Twitter Backend attivo',
      health: '/api/healthz'
    });
  });

  /* =========================
     Gestione errori
     ========================= */

  // 404
  app.use((_req, res) => {
    res.status(404).json({ error: 'Endpoint non trovato' });
  });

  // Error handler globale
  app.use((err, _req, res, _next) => {
    console.error('Errore:', err);
    res
      .status(err.status || 500)
      .json({ error: err.message || 'Errore interno del server' });
  });

  return app;
}

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});