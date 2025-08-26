type RecipeFormActionsProps = {
  isEdit: boolean;
  isSubmitting: boolean;
};

export const RecipeFormActions = ({
  isEdit,
  isSubmitting,
}: RecipeFormActionsProps) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="regButton hover-effect disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting
        ? isEdit
          ? "Updating..."
          : "Creating..."
        : isEdit
        ? "Update Recipe"
        : "Create Recipe"}
    </button>
  );
};
