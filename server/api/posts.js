import { Router } from 'express';
import { supabase } from '../db/index.js';
import { requireJwtAuth } from '../sec/jwtauth.js';

const router = Router();

/* =========================
   GET ALL POSTS
========================= */
router.get('/', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        content,
        created_at,
        user_id
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('GET POSTS ERROR:', err);
    res.status(500).json({ error: 'Errore nel recupero dei post' });
  }
});

/* =========================
   CREATE POST
========================= */
router.post('/', requireJwtAuth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Contenuto mancante' });
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        content,
        user_id: req.user.id
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error('CREATE POST ERROR:', err);
    res.status(500).json({ error: 'Errore creazione post' });
  }
});

/* =========================
   DELETE POST
========================= */
router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.json({ success: true });
  } catch (err) {
    console.error('DELETE POST ERROR:', err);
    res.status(500).json({ error: 'Errore eliminazione post' });
  }
});

export default router;