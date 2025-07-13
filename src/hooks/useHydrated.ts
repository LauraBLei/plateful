import { useEffect, useState } from "react";

/**
 * useHydrated - React hook to determine if the component has hydrated on the client.
 * This is useful for avoiding server-side rendering issues with client-only code.
 * @returns {boolean} isHydrated - True if the component is hydrated (client-side), false otherwise.
 */
export default function useHydrated(): boolean {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
