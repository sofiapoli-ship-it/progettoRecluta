export async function login(username: string, password: string) {
  try {
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    return {
      success: res.ok,
      temp_token: data.temp_token ?? null
    };

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return { success: false, temp_token: null };
  }
}