//imports
import { Router } from 'express';
import { supabase } from '../db/index.js';
import { requireJwtAuth } from '../sec/jwtauth.js';

//consts
const router = Router();

//debug
router.get('/_debug', async (_req, res) => {
  const { data, error } = await supabase.from('posts').select('*').limit(1);
  res.json({ ok: !error, data, error });
});

////POST ROUTES////
//POST post
//crea un post
router.post('/', requireJwtAuth, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content mancante' });
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
    console.error('POST ERROR:', err);
    res.status(500).json({ error: 'Errore creazione post' });
  }
});

////GET ROUTES////
//GET posts
//lista di tutti i post creati da tutti gli utenti
router.get('/', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, content, created_at, user_id')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('GET POSTS ERROR:', err);
    res.status(500).json({ error: 'Errore recupero post' });
  }
});

//GET posts by user
//lista post creati da un utente
router.get('/by-user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from('posts')
      .select('id, content, created_at, user_id')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('GET POSTS BY USER ERROR:', err);
    res.status(500).json({ error: 'Errore recupero post utente' });
  }
});

//GET commented posts
//lista posts a cui un utente ha aggiunto un commento
router.get('/commented-by/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from('comments')
      .select(`
        posts (
          id,
          content,
          created_at,
          user_id
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;

    const uniquePosts = [
      ...new Map(
        data
          .filter(r => r.posts)
          .map(r => [r.posts.id, r.posts])
      ).values()
    ];

    res.json(uniquePosts);
  } catch (err) {
    console.error('GET COMMENTED POSTS ERROR:', err);
    res.status(500).json({ error: 'Errore post commentati' });
  }
});

//GET liked posts
//posts a cui un utente ha messo like
router.get('/liked-by/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from('likes')
      .select(`
        posts (
          id,
          content,
          created_at,
          user_id
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;

    const uniquePosts = [
      ...new Map(
        data
          .filter(r => r.posts)
          .map(r => [r.posts.id, r.posts])
      ).values()
    ];

    res.json(uniquePosts);
  } catch (err) {
    console.error('GET LIKED POSTS ERROR:', err);
    res.status(500).json({ error: 'Errore post piaciuti' });
  }
});

//GET post
//post con id dato
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (!data) return res.status(404).json({ error: 'Post non trovato' });
    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('GET POST ERROR:', err);
    res.status(500).json({ error: 'Errore recupero post' });
  }
});

////PATCH ROUTES////
//PATCH post
//per modificare il contenuto di un post
router.patch('/:id', requireJwtAuth, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content mancante' });
    }

    const { data, error } = await supabase
      .from('posts')
      .update({ content })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return res.status(403).json({ error: 'Non autorizzato o post inesistente' });
    }

    res.json(data);
  } catch (err) {
    console.error('PATCH POST ERROR:', err);
    res.status(500).json({ error: 'Errore aggiornamento post' });
  }
});

////DELETE ROUTES////
//DELETE post
//rimuovere un post
router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.status(204).send();
  } catch (err) {
    console.error('DELETE POST ERROR:', err);
    res.status(500).json({ error: 'Errore cancellazione post' });
  }
});

export default router;