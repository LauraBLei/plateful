import { Copyright } from "lucide-react";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 items-center flex-wrap justify-center w-full text-brand-black bg-brand-orange font-primary flex font-semibold gap-5 py-5">
      <p className="flex gap-2">
        <Copyright /> <span>Plateful</span>
      </p>
      <a href="https://leidev.net" target="_blank" rel="noopener noreferrer">
        Website by Lei Dev
      </a>
    </div>
  );
};
