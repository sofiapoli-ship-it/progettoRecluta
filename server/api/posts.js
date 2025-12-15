import { Router } from 'express';
import { supabase } from '../db/index.js';
import { requireFields, paginated } from '../utils.js';

// middleware JWT centralizzato
import { requireJwtAuth } from '../sec/jwtauth.js';

const router = Router();

/**
 * GET /posts
 * Restituisce i post con paginazione e filtro opzionale per autore
 */
router.get('/', async (req, res, next) => {
  try {
    const { limit, offset } = paginated(req);
    const authorId = req.query.user_id;

    let postsQuery = supabase
      .from('posts')
      .select(
        'id, content, created_at, user_id, users(id, username)',
        { count: 'exact' }
      )
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (authorId) {
      postsQuery = postsQuery.eq('user_id', authorId);
    }

    const { data, error, count } = await postsQuery;
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
 * GET /posts/:id
 * Restituisce un singolo post
 */
router.get('/:id', async (req, res, next) => {
  try {
    const postId = req.params.id;

    const { data, error } = await supabase
      .from('posts')
      .select('id, content, created_at, users(id, username)')
      .eq('id', postId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!data) {
      return res.status(404).json({ error: 'Post non trovato' });
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /posts
 * Crea un nuovo post (utente autenticato)
 */
router.post('/', requireJwtAuth, async (req, res, next) => {
  try {
    requireFields(req.body, ['content']);

    const newPost = {
      content: req.body.content,
      user_id: req.user.id
    };

    const { data, error } = await supabase
      .from('posts')
      .insert(newPost)
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /posts/:id
 * Aggiorna il contenuto di un post (solo autore)
 */
router.patch('/:id', requireJwtAuth, async (req, res, next) => {
  try {
    if (!req.body.content) {
      return res
        .status(400)
        .json({ error: 'Campo "content" obbligatorio' });
    }

    const postId = req.params.id;
    const currentUser = req.user.id;

    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', postId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;
    if (!post) {
      return res.status(404).json({ error: 'Post non trovato' });
    }

    if (post.user_id !== currentUser) {
      return res.status(403).json({ error: 'Operazione non consentita' });
    }

    const { data, error } = await supabase
      .from('posts')
      .update({ content: req.body.content })
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /posts/:id
 * Cancella un post (solo autore)
 */
router.delete('/:id', requireJwtAuth, async (req, res, next) => {
  try {
    const postId = req.params.id;
    const currentUser = req.user.id;

    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', postId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

    // Idempotenza: se non esiste, 204
    if (!post) {
      return res.status(204).send();
    }

    if (post.user_id !== currentUser) {
      return res.status(403).json({ error: 'Operazione non consentita' });
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) throw error;

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;