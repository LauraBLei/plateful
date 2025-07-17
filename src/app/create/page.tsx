import { Loader } from "lucide-react";
import { Suspense } from "react";
import { CreatePageContent } from "src/components/pages/CreatePage";
import { getCurrentUser } from "src/helpers/getCurrentUser";

const CreateRecipe = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Suspense fallback={<Loader />}>
      <CreatePageContent currentUser={currentUser} />
    </Suspense>
  );
};

export default CreateRecipe;
