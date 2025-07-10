// Simple analytics tracking
export function trackUserAction(
  action: string,
  metadata?: Record<string, any>
) {
  if (typeof window !== "undefined") {
    // Track with Google Analytics, Plausible, or similar
    console.log("User action:", action, metadata);

    // Example for future analytics integration:
    // gtag('event', action, metadata);
    // or plausible(action, { props: metadata });
  }
}

// Track important events
export const Analytics = {
  recipeCreated: (recipeId: number) =>
    trackUserAction("recipe_created", { recipeId }),
  recipeDeleted: (recipeId: number) =>
    trackUserAction("recipe_deleted", { recipeId }),
  userFollowed: (userId: string) =>
    trackUserAction("user_followed", { userId }),
  searchPerformed: (query: string) =>
    trackUserAction("search_performed", { query }),
  userSignup: () => trackUserAction("user_signup"),
  userLogin: () => trackUserAction("user_login"),
};
