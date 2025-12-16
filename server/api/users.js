//imports
import { Router } from 'express';
import { supabase } from '../db/index.js';
import { paginated } from '../utils.js';
import { requireJwtAuth } from '../sec/jwtauth.js'; //JWT
import bcrypt from 'bcrypt';

//consts
const router = Router();
const PUBLIC_USER_FIELDS = 'id, username, email, bio, created_at'; // Campi pubblici dell’utente non esporre password o segreti

////POST ROUTES////
//POST user
//Non consentito: la creazione avviene tramite /auth/register
router.post('/', (_req, res) => {
  res.status(403).json({
    error: 'Operazione non consentita. Usa /auth/register'
  });
});

////GET ROUTES////
//GET users
//lista di tutti gli utenti registrati
router.get('/', async (req, res, next) => {
  try {
    const { limit, offset } = paginated(req);
    const search = req.query.q?.trim();

    let usersQuery = supabase
      .from('users')
      .select(PUBLIC_USER_FIELDS, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      usersQuery = usersQuery.or(
        `username.ilike.*${search}*,email.ilike.*${search}*`
      );
    }

    const { data, error, count } = await usersQuery;
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

//GET id
//informazioni utente
router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;

    const { data, error } = await supabase
      .from('users')
      .select(PUBLIC_USER_FIELDS)
      .eq('id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
});

//GET liked posts
//lista dei posts a cui l'untente ha messo like
router.get('/:id/likes', async (req, res, next) => {
  try {
    const userId = req.params.id;

    const { data, error } = await supabase
      .from('likes')
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

    // estrai solo i post
    const likedPosts = data.map(like => like.posts);

    res.json({
      user_id: userId,
      items: likedPosts,
      count: likedPosts.length
    });
  } catch (err) {
    next(err);
  }
});

////PATCH ROUTES////
//PATCH username, email, bio
//per cambiare una, due o tutte e tre 
router.patch('/:id', requireJwtAuth, async (req, res, next) => {
  try {
    const targetUserId = req.params.id;
    const loggedUserId = req.user.id;

    if (targetUserId !== loggedUserId) {
      return res.status(403).json({
        error: 'Non sei autorizzato a modificare questo profilo'
      });
    }

    const { username, email, bio } = req.body;

    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (bio !== undefined) updates.bio = bio;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        error: 'Nessun campo valido fornito'
      });
    }

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', targetUserId)
      .select(PUBLIC_USER_FIELDS)
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({
          error: 'Username o email già esistenti'
        });
      }
      throw error;
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
});

//PATCH user password
//cambio di password
router.patch('/:id/password', requireJwtAuth, async (req, res, next) => {
  try {
    const targetUserId = req.params.id;
    const loggedUserId = req.user.id;

    if (targetUserId !== loggedUserId) {
      return res.status(403).json({
        error: 'Non autorizzato'
      });
    }

    const { old_password, new_password } = req.body;

    if (!old_password || !new_password) {
      return res.status(400).json({
        error: 'Password mancanti'
      });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('password_hash')
      .eq('id', targetUserId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    const match = await bcrypt.compare(old_password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Password attuale errata' });
    }

    const newHash = await bcrypt.hash(new_password, 10);

    const { error: updateError } = await supabase
      .from('users')
      .update({ password_hash: newHash })
      .eq('id', targetUserId);

    if (updateError) throw updateError;

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

////DELETE ROUTES////
//DELETE id
//eliminare utente
router.delete('/:id', requireJwtAuth, async (req, res, next) => {
  try {
    const targetUserId = req.params.id;
    const loggedUserId = req.user.id;

    if (targetUserId !== loggedUserId) {
      return res.status(403).json({
        error: 'Non sei autorizzato a cancellare questo profilo'
      });
    }

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', targetUserId);

    if (error) throw error;

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;