 import { Router } from 'express';
import passport from 'passport';

// Router dei moduli
import authRoutes from './auth.js';
import userRoutes from './users.js';
import postRoutes from './posts.js';
import commentRoutes from './comments.js';
import likeRoutes from './likes.js';
import healthRoutes from './health.js';

// Configurazione JWT centralizzata
import { setupJwtAuth } from '../sec/jwtauth.js';

// Inizializza la strategia JWT
setupJwtAuth(passport);

// Router principale dell'API
const apiRouter = Router();

// Inizializza passport per tutte le rotte API
apiRouter.use(passport.initialize());

// Health check (GET /healthz)
apiRouter.use(healthRoutes);

// Autenticazione
apiRouter.use('/auth', authRoutes);

// Utenti
apiRouter.use('/users', userRoutes);

// Post
apiRouter.use('/posts', postRoutes);

// Commenti
apiRouter.use('/comments', commentRoutes);

// Like
apiRouter.use('/likes', likeRoutes);

export default apiRouter;