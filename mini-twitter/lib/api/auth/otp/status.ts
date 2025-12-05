export async function otpStatus(tempToken: string) {
  try {
    const res = await fetch("http://localhost:4000/api/auth/otp/status", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${tempToken}`
      }
    });

    if (!res.ok) return null;

    return await res.json(); // { enabled: boolean }

  } catch (err) {
    console.error("OTP STATUS ERROR:", err);
    return null;
  }
}