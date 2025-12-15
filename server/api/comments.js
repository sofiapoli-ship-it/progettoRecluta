import { Router } from 'express';
import { supabase } from '../db/index.js';
import { authenticateJWT } from '../auth/passport.js';

const router = Router();

/**
 * GET /comments
 * Legge i commenti (opzionalmente per post)
 */
router.get('/', async (req, res) => {
  const postId = req.query.post_id;

  let query = supabase
    .from('comments')
    .select('id, content, created_at, user_id, users(username)')
    .order('created_at', { ascending: false });

  if (postId) {
    query = query.eq('post_id', postId);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ error: 'Errore nel recupero commenti' });
  }

  res.json(data);
});

/**
 * POST /comments
 * Crea un commento (utente autenticato)
 */
router.post('/', authenticateJWT, async (req, res) => {
  const { content, post_id } = req.body;
  const userId = req.user.id;

  if (!content || !post_id) {
    return res.status(400).json({ error: 'Campi mancanti' });
  }

  const { data, error } = await supabase
    .from('comments')
    .insert({
      content,
      post_id,
      user_id: userId
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: 'Errore creazione commento' });
  }

  res.status(201).json(data);
});

/**
 * DELETE /comments/:id
 * Cancella un commento (solo autore)
 */
router.delete('/:id', authenticateJWT, async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;

  const { data: comment } = await supabase
    .from('comments')
    .select('user_id')
    .eq('id', commentId)
    .single();

  if (!comment) {
    return res.status(404).json({ error: 'Commento non trovato' });
  }

  if (comment.user_id !== userId) {
    return res.status(403).json({ error: 'Non autorizzato' });
  }

  await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  res.status(204).send();
});

export default router;