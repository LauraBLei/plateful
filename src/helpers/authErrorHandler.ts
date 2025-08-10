import { AuthError } from "@supabase/supabase-js";

export const handleAuthError = (error: AuthError) => {
  switch (error.message) {
    case "refresh_token_not_found":
    case "Invalid Refresh Token: Refresh Token Not Found":
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
      break;
    case "JWT expired":
      console.log("Session expired, please sign in again");
      break;
    default:
      console.error("Unhandled auth error:", error.message);
  }
};

export const isAuthError = (error: Error | unknown): error is AuthError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as Error).name === "AuthError"
  );
};
