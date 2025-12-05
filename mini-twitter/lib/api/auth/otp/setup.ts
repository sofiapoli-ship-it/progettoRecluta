export async function otpSetup(tempToken: string) {
  try {
    const res = await fetch("http://localhost:4000/api/auth/otp/setup", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${tempToken}`
      }
    });

    if (!res.ok) {
      console.error("OTP Setup error:", res.status);
      return null;
    }

    return await res.json();  // { secret, otpauth_url }

  } catch (err) {
    console.error("OTP Setup crash:", err);
    return null;
  }
}