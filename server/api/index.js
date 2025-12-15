import { Router } from 'express';
import passport from 'passport';

// Router dei moduli
import authRoutes from './auth.js';
import userRoutes from './users.js';
import postRoutes from './posts.js';
import commentRoutes from './comments.js';
import likeRoutes from './likes.js';
import healthRoutes from './health.js';

// Configurazione autenticazione JWT
import { initializePassport } from '../auth/passport.js';

initializePassport(passport);

// Router principale dell'API
const apiRouter = Router();

// Inizializza passport su tutte le rotte API
apiRouter.use(passport.initialize());

// Rotta di health check (GET /healthz)
apiRouter.use(healthRoutes);

// Rotte di autenticazione
apiRouter.use('/auth', authRoutes);

// Rotte utenti
apiRouter.use('/users', userRoutes);

// Rotte post
apiRouter.use('/posts', postRoutes);

// Rotte commenti
apiRouter.use('/comments', commentRoutes);

// Rotte like
apiRouter.use('/likes', likeRoutes);

export default apiRouter;