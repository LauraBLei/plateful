import React from "react";

export const Loader = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[200px] py-10">
    <span
      className="inline-block w-12 h-12 border-4 border-brand-black dark:border-brand-white border-t-transparent rounded-full animate-spin"
      aria-label="Loading..."
    />
  </div>
);

export default Loader;
