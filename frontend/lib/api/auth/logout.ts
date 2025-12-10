// lib/api/auth/logout.ts

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("temp_token");
}