import { Router } from 'express';
import { supabase } from '../db/index.js';
import { requireJwtAuth } from '../sec/jwtauth.js';

const router = Router();

router.get('/_debug', async (_req, res) => {
  const { data, error } = await supabase.from('posts').select('*').limit(1);
  return res.json({ ok: !error, data, error });
});
/* =========================
   GET /posts
========================= */
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

/* =========================
   GET /posts/:id
========================= */
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

/* =========================
   POST /posts
========================= */
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

/* =========================
   DELETE /posts/:id
========================= */
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

/* =========================
   PATCH /posts/:id
========================= */
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

/* =========================
   PATCH /posts/:id
========================= */
router.patch('/:id', requireJwtAuth, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const { content } = req.body;

  console.log('[PATCH /posts/:id]', { postId, userId, content });

  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Content mancante o non valido' });
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .update({ content })
      .eq('id', postId)
      .eq('user_id', userId)
      .select('*'); // niente .single()

    console.log('[PATCH result]', { data, error });

    if (error) {
      return res.status(500).json({
        error: 'Errore Supabase',
        details: error.message,
        code: error.code
      });
    }

    // 0 righe aggiornate => o non esiste o non sei l’autore
    if (!data || data.length === 0) {
      return res.status(404).json({
        error: 'Post non trovato oppure non sei autorizzata a modificarlo'
      });
    }

    return res.status(200).json(data[0]);
  } catch (err) {
    console.error('PATCH POST UNEXPECTED ERROR:', err);
    return res.status(500).json({ error: 'Errore aggiornamento post' });
  }
});