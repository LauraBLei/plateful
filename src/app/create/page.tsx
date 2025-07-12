import { Suspense } from "react";
import { CreatePageContent } from "@/components/pages/create";
import Loader from "@/helpers/loader";

const CreateRecipe = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CreatePageContent />
    </Suspense>
  );
};

export default CreateRecipe;
