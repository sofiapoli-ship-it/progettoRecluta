import { Router } from 'express';
import { supabase } from '../db/index.js';
import { requireFields } from '../utils.js';
import { requireJwtAuth } from '../sec/jwtauth.js';

const router = Router();

/* =========================
   GET /likes
========================= */
router.get('/', async (req, res) => {
  try {
    const { post_id, user_id, count } = req.query;

    let query = supabase
      .from('likes')
      .select('id, user_id, post_id', { count: 'exact' });

    if (post_id) query = query.eq('post_id', post_id);
    if (user_id) query = query.eq('user_id', user_id);

    const { data, error, count: total } = await query;
    if (error) throw error;

    if (count === 'true') {
      return res.json({ count: total });
    }

    res.json({ items: data, count: total });
  } catch (err) {
    console.error('GET LIKES ERROR:', err);
    res.status(500).json({ error: 'Errore recupero likes' });
  }
});

/* =========================
   POST /likes
========================= */
router.post('/', requireJwtAuth, async (req, res) => {
  try {
    requireFields(req.body, ['post_id']);

    const userId = req.user.id;
    const { post_id } = req.body;

    // controllo esistenza
    const { count, error: checkError } = await supabase
      .from('likes')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('post_id', post_id);

    if (checkError) throw checkError;

    if (count > 0) {
      return res.status(200).json({ ok: true });
    }

    const { data, error } = await supabase
      .from('likes')
      .insert({ user_id: userId, post_id })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error('POST LIKE ERROR:', err);
    res.status(500).json({ error: 'Errore creazione like' });
  }
});

/* =========================
   DELETE /likes
========================= */
router.delete('/', requireJwtAuth, async (req, res) => {
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

    res.status(204).send();
  } catch (err) {
    console.error('DELETE LIKE ERROR:', err);
    res.status(500).json({ error: 'Errore rimozione like' });
  }
});

export default router;