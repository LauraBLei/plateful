import { Loader } from "lucide-react";
import { Suspense } from "react";
import { SearchPage } from "src/components/pages/SearchPage";

const Search = async () => {
  return (
    <Suspense fallback={<Loader />}>
      <SearchPage />
    </Suspense>
  );
};

export default Search;
