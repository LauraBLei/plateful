// Add error tracking and monitoring
import { supabase } from "@/supabase";

/**
 * Log important events for monitoring
 */
export function logEvent(event: string, data?: any) {
  if (process.env.NODE_ENV === "production") {
    console.log(`[${new Date().toISOString()}] ${event}:`, data);

    // You can also send to external monitoring service
    // like Sentry, LogRocket, etc.
  }
}

/**
 * Log errors with context
 */
export function logError(error: Error, context?: string) {
  console.error(`[ERROR] ${context || "Unknown"}:`, error);

  // In production, send to error tracking service
  if (process.env.NODE_ENV === "production") {
    // Send to Sentry, Bugsnag, etc.
  }
}

/**
 * Health check function
 */
export async function healthCheck() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("count(*)")
      .limit(1);

    if (error) throw error;

    return { status: "healthy", timestamp: new Date().toISOString() };
  } catch (error) {
    logError(error as Error, "Health check failed");
    return { status: "unhealthy", error: (error as Error).message };
  }
}
