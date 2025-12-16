//imports
import { Router } from 'express';
import { supabase } from '../db/index.js';
import { requireJwtAuth } from '../sec/jwtauth.js';

//consts
const router = Router();

////POST ROUTES////
//POST comment
//mettere un commento a un determinato post
router.post('/', requireJwtAuth, async (req, res, next) => {
  try {
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

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

////GET ROUTES////
//GET comments
//se postId fornito -> lista commenti al post
//se userId fornito -> lista commenti fatti a qualsiasi post da user
router.get('/', async (req, res, next) => {
  try {
    const { post_id, user_id } = req.query;

    let query = supabase
      .from('comments')
      .select('id, content, created_at, user_id, post_id, users(username)')
      .order('created_at', { ascending: false });

    if (post_id) {
      query = query.eq('post_id', post_id);
    }

    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
});

////PATCH ROUTES////
//PATCH comment
//modifica un commento
router.patch('/:id', requireJwtAuth, async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content mancante' });
    }

    // verifica che il commento esista ed è dell’utente
    const { data: comment, error: fetchError } = await supabase
      .from('comments')
      .select('id, user_id')
      .eq('id', commentId)
      .single();

    if (fetchError || !comment) {
      return res.status(404).json({ error: 'Commento non trovato' });
    }

    if (comment.user_id !== userId) {
      return res.status(403).json({ error: 'Non autorizzato' });
    }

    // update vero e proprio
    const { data, error } = await supabase
      .from('comments')
      .update({ content })
      .eq('id', commentId)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
});

////DELETE ROUTES////
//DELETE comment
//rimuovere un commento a un determinato post
router.delete('/:id', requireJwtAuth, async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;

    const { data: comment, error } = await supabase
      .from('comments')
      .select('user_id')
      .eq('id', commentId)
      .single();

    if (error || !comment) {
      return res.status(404).json({ error: 'Commento non trovato' });
    }

    if (comment.user_id !== userId) {
      return res.status(403).json({ error: 'Non autorizzato' });
    }

    const { error: deleteError } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (deleteError) throw deleteError;

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;