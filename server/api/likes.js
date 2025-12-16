//imports
import { Router } from 'express';
import { supabase } from '../db/index.js';
import { requireFields } from '../utils.js';
import { requireJwtAuth } from '../sec/jwtauth.js';

//consts
const router = Router();

////POST ROUTES////
//POST like
//per mettere un like a un post
//uno stesso utente non può mettere più di una volta like a uno stesso post
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

////GET ROUTES////
//GET likes
// se postId -> lista likes a quel post
// se userId -> lista posts a cui user ha messo like
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

////DELETE ROUTES////
//DELETE like 
//Per rimuovere il like da un post
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