export async function verifyOtp(temp_token: string, otp: string) {
  try {
    const res = await fetch("http://localhost:4000/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ temp_token, otp })
    });

    if (!res.ok) {
      return { success: false };
    }

    const data = await res.json();

    return {
      success: data.success ?? false,
      token: data.token ?? null,
    };

  } catch (err) {
    console.error("OTP verification failed:", err);
    return { success: false };
  }
}