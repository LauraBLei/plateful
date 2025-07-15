import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface MobileSearchBarProps {
  setMenuOpen?: (open: boolean) => void;
}

const MobileSearchBar: React.FC<MobileSearchBarProps> = ({ setMenuOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear search after navigating
    }
  };
  return (
    <div className="mb-2">
      <form
        onSubmit={(e) => {
          handleSearch(e);
          setMenuOpen?.(false);
        }}
        className="relative"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search recipes or users..."
          className="input pr-10"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-black dark:text-brand-white hover:text-brand-orange transition-colors"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  );
};

export default MobileSearchBar;
