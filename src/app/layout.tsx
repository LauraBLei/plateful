import type { Metadata } from "next";
import { Footer } from "src/components/footer/footer";
import { Header } from "src/components/header/header";
import { getCurrentUser } from "src/helpers/getCurrentUser";
import Providers from "src/providers/providers";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Plateful",
  description: "Share your recipes!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers initialUser={currentUser}>
          <div className="min-h-screen items-center flex flex-col gap-5 transition-colors duration-500 dark:bg-brand-black bg-brand-white">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
