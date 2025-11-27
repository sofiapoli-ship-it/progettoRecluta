const BASE_URL = "https://api.twitter.server.jetop.com/api";

/* ------------------------------------------
   AUTH — LOGIN STEP 1
------------------------------------------- */
export async function loginStep1(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Credenziali errate");

  return res.json(); // { temporaryToken }
}

/* ------------------------------------------
   AUTH — LOGIN STEP 2 (OTP)
------------------------------------------- */
export async function loginStep2(otp: string, tempToken: string) {
  const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tempToken}`,
    },
    body: JSON.stringify({ otp }),
  });

  if (!res.ok) throw new Error("OTP non valido");

  return res.json(); // { token }
}

/* ------------------------------------------
   FEED — POSTS RECENTI
------------------------------------------- */
export async function getFeed(token: string) {
  const res = await fetch(`${BASE_URL}/posts`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Errore nel recupero del feed");

  return res.json();
}

/* ------------------------------------------
   SINGLE POST + COMMENTI
------------------------------------------- */
export async function getPostById(id: string, token: string) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Post non trovato");

  return res.json();
}

/* ------------------------------------------
   CREA POST
------------------------------------------- */
export async function createPost(content: string, token: string) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("Errore nella creazione del post");

  return res.json();
}

/* ------------------------------------------
   COMMENTA POST
------------------------------------------- */
export async function addComment(postId: string, content: string, token: string) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("Errore nell'aggiunta del commento");

  return res.json();
}

/* ------------------------------------------
   LIKE POST
------------------------------------------- */
export async function likePost(postId: string, token: string) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/like`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Errore nel like");

  return res.json();
}

/* ------------------------------------------
   UNLIKE POST
------------------------------------------- */
export async function unlikePost(postId: string, token: string) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/unlike`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Errore nell'unlike");

  return res.json();
}

/* ------------------------------------------
   LIKED POSTS
------------------------------------------- */
export async function getLikedPosts(token: string) {
  const res = await fetch(`${BASE_URL}/posts/liked`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Errore nel recupero dei like");

  return res.json();
}

/* ------------------------------------------
   USER PROFILE (LOGGATO)
------------------------------------------- */
export async function getMyProfile(token: string) {
  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Errore nel recupero del profilo personale");

  return res.json();
}

/* ------------------------------------------
   USER PROFILE PUBBLICO
------------------------------------------- */
export async function getUserByUsername(username: string, token: string) {
  const res = await fetch(`${BASE_URL}/users/${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Utente non trovato");

  return res.json();
}

/* ------------------------------------------
   POST DI UN UTENTE
------------------------------------------- */
export async function getUserPosts(username: string, token: string) {
  const res = await fetch(`${BASE_URL}/users/${username}/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Errore nel recupero dei post utente");

  return res.json();
}