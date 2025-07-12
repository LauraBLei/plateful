import { useEffect, useState } from "react";

/**
 * useHydrated - React hook to determine if the component has hydrated on the client.
 * @returns {boolean} isHydrated - True if the component is hydrated (client-side), false otherwise.
 */
export default function useHydrated(): boolean {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
