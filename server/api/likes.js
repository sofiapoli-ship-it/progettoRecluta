import { Router } from 'express';
import { supabase } from '../db/index.js';
import { authenticateJWT } from '../auth/passport.js';
import { requireFields } from '../utils.js';

const router = Router();

/**
 * GET /likes
 * Recupera i like, con filtri opzionali o solo il conteggio
 */
router.get('/', async (req, res, next) => {
  try {
    const { post_id, user_id, count } = req.query;

    let likeQuery = supabase
      .from('likes')
      .select('*', { count: 'exact' });

    if (post_id) {
      likeQuery = likeQuery.eq('post_id', post_id);
    }

    if (user_id) {
      likeQuery = likeQuery.eq('user_id', user_id);
    }

    const { data, error, count: total } = await likeQuery;
    if (error) throw error;

    if (count === 'true') {
      return res.json({ count: total });
    }

    res.json({
      items: data,
      count: total
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /likes
 * Aggiunge un like a un post (idempotente)
 */
router.post('/', authenticateJWT, async (req, res, next) => {
  try {
    requireFields(req.body, ['post_id']);

    const userId = req.user.id;
    const { post_id } = req.body;

    // Controllo se il like esiste già
    const { count, error: checkError } = await supabase
      .from('likes')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('post_id', post_id);

    if (checkError) throw checkError;

    if (count > 0) {
      // Like già presente → risposta idempotente
      return res.status(200).json({ ok: true });
    }

    // Inserimento nuovo like
    const { data, error } = await supabase
      .from('likes')
      .insert({
        user_id: userId,
        post_id
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /likes
 * Rimuove un like da un post
 */
router.delete('/', authenticateJWT, async (req, res, next) => {
  try {
    requireFields(req.body, ['post_id']);

    const userId = req.user.id;
    const { post_id } = req.body;

    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', userId)
      .eq('post_id', post_id);

    if (error) throw error;

    // Idempotente: 204 anche se il like non esisteva
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;