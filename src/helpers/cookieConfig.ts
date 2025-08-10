const sevenDaysInSeconds = 60 * 60 * 24 * 7;

/**
 * Secure cookie configuration for Supabase authentication
 */

export const getCookieOptions = () => ({
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  maxAge: sevenDaysInSeconds,
});
