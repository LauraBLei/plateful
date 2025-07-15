import Link from "next/link";

interface NavLinksProps {
  setMenuOpen?: (open: boolean) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ setMenuOpen }) => (
  <>
    <Link
      href="/"
      className="hover-effect dark:hover:text-brand-orange"
      onClick={() => setMenuOpen?.(false)}
    >
      Home
    </Link>
    <Link
      href="/allRecipes"
      className="hover-effect dark:hover:text-brand-orange"
      onClick={() => setMenuOpen?.(false)}
    >
      All Recipes
    </Link>
  </>
);

export default NavLinks;
