import { Router } from 'express';
import { supabase } from '../db/index.js';
import { paginated } from '../utils.js';

// middleware JWT centralizzato
import { requireJwtAuth } from '../sec/jwtauth.js';

const router = Router();

// Campi pubblici dell’utente (mai esporre password o segreti)
const PUBLIC_USER_FIELDS = 'id, username, email, bio, created_at';

/**
 * GET /users
 * Lista utenti con paginazione e ricerca opzionale
 */
router.get('/', async (req, res, next) => {
  try {
    const { limit, offset } = paginated(req);
    const search = req.query.q?.trim();

    let usersQuery = supabase
      .from('users')
      .select(PUBLIC_USER_FIELDS, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      usersQuery = usersQuery.or(
        `username.ilike.*${search}*,email.ilike.*${search}*`
      );
    }

    const { data, error, count } = await usersQuery;
    if (error) throw error;

    res.json({
      items: data,
      count,
      limit,
      offset
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /users/:id
 * Recupera un singolo utente
 */
router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;

    const { data, error } = await supabase
      .from('users')
      .select(PUBLIC_USER_FIELDS)
      .eq('id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /users/:id/likes
 * Post a cui l’utente ha messo like
 */
router.get('/:id/likes', async (req, res, next) => {
  try {
    const userId = req.params.id;

    const { data, error } = await supabase
      .from('likes')
      .select(`
        post_id,
        posts (
          id,
          content,
          created_at,
          user_id
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // estrai solo i post
    const likedPosts = data.map(like => like.posts);

    res.json({
      user_id: userId,
      items: likedPosts,
      count: likedPosts.length
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /users
 * Non consentito: la creazione avviene tramite /auth/register
 */
router.post('/', (_req, res) => {
  res.status(403).json({
    error: 'Operazione non consentita. Usa /auth/register'
  });
});

/**
 * PATCH /users/:id
 * Aggiorna profilo utente (solo proprietario)
 */
router.patch('/:id', requireJwtAuth, async (req, res, next) => {
  try {
    const targetUserId = req.params.id;
    const loggedUserId = req.user.id;

    if (targetUserId !== loggedUserId) {
      return res.status(403).json({
        error: 'Non sei autorizzato a modificare questo profilo'
      });
    }

    const updates = {};
    if (req.body.username) updates.username = req.body.username;
    if (req.body.bio) updates.bio = req.body.bio;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        error: 'Nessun campo valido fornito'
      });
    }

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', targetUserId)
      .select(PUBLIC_USER_FIELDS)
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({
          error: 'Username o email già esistenti'
        });
      }
      throw error;
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /users/:id
 * Cancella account (solo proprietario)
 */
router.delete('/:id', requireJwtAuth, async (req, res, next) => {
  try {
    const targetUserId = req.params.id;
    const loggedUserId = req.user.id;

    if (targetUserId !== loggedUserId) {
      return res.status(403).json({
        error: 'Non sei autorizzato a cancellare questo profilo'
      });
    }

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', targetUserId);

    if (error) throw error;

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;