import { Loader } from "lucide-react";
import { Suspense } from "react";
import { CreatePageContent } from "src/components/pages/create";

const CreateRecipe = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CreatePageContent />
    </Suspense>
  );
};

export default CreateRecipe;
