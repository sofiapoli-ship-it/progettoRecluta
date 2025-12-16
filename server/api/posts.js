//imports
import { Router } from 'express';
import { supabase } from '../db/index.js';
import { requireJwtAuth } from '../sec/jwtauth.js';

//consts
const router = Router();

////POST ROUTES////
//POST /posts
//creazione di un post
router.post('/', requireJwtAuth, async (req, res) => {
  try {
    if (!req.body.content) {
      return res.status(400).json({ error: 'Content mancante' });
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        content: req.body.content,
        user_id: req.user.id
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nella creazione del post' });
  }
});

////GET ROUTES////
//GET debug
router.get('/_debug', async (_req, res) => {
  const { data, error } = await supabase.from('posts').select('*').limit(1);
  return res.json({ ok: !error, data, error });
});

//GET posts
// avere la lista di tutti i post creati da tutti gli utenti
router.get('/', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, content, created_at, user_id', {count: 'exact'})
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('GET POSTS ERROR:', err);
    res.status(500).json({ error: 'Errore nel recupero dei post' });
  }
});

//GET commented posts
// GET /posts
// lista di post (opzionalmente filtrati per autore)
router.get('/', async (req, res) => {
  try {
    const { user_id } = req.query;

    let query = supabase
      .from('posts')
      .select('id, content, created_at, user_id')
      .order('created_at', { ascending: false });

    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('GET POSTS ERROR:', err);
    res.status(500).json({ error: 'Errore nel recupero dei post' });
  }
});

//avere i posts a cui un utente ha messo almeno un commento
router.get('/commented-by/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from('comments')
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

    // rimuove duplicati (più commenti sullo stesso post)
    const uniquePosts = [
      ...new Map(
        data
          .filter(row => row.posts)
          .map(row => [row.posts.id, row.posts])
      ).values()
    ];

    res.json(uniquePosts);
  } catch (err) {
    console.error('GET COMMENTED POSTS ERROR:', err);
    res.status(500).json({ error: 'Errore recupero post commentati' });
  }
});

//GET post id
//avere i post creati da un utente
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return res.status(404).json({ error: 'Post non trovato' });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel recupero del post' });
  }
});






//DELETE ROUTES

//DELETE /posts/:id
//eliminazione di un post
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
    console.error(err);
    res.status(500).json({ error: 'Errore nella cancellazione' });
  }
});

export default router;

//PATCH ROUTE

//modifica del contenuto di un post
router.patch('/:id', requireJwtAuth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content mancante' });
    }

    // aggiorna solo se il post appartiene all’utente
    const { data, error } = await supabase
      .from('posts')
      .update({ content })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(403).json({ error: 'Non autorizzata' });
    }

    res.json(data);
  } catch (err) {
    console.error('PATCH POST ERROR:', err);
    res.status(500).json({ error: 'Errore aggiornamento post' });
  }
});


//PATCH /posts/:id
// modifica del contenuto di un post
router.patch('/:id', requireJwtAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content mancante' });
    }

    // 1️⃣ verifica che il post esista e sia dell’utente
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('id')
      .eq('id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (!post) {
      return res.status(403).json({
        error: 'Post non trovato o non autorizzato'
      });
    }

    // 2️⃣ update vero
    const { data, error } = await supabase
      .from('posts')
      .update({ content })
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('PATCH POST ERROR:', err);
    res.status(500).json({ error: 'Errore aggiornamento post' });
  }
});