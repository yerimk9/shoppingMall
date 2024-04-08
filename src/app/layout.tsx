import ReactQueryProvider from "./(baseLayout)/_utils/ReactQueryProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/(baseLayout)/_styles/global.css";
import ThemeToggle from "@/app/(baseLayout)/_components/ThemeToggle";
import { Providers } from "@/redux/provider";
import AuthSession from "./(baseLayout)/_utils/AuthSession";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "shopping Mall",
  description: "Creating a Shopping Mall Website with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSession>
          <Providers>
            <ReactQueryProvider>
              {children}
              <ThemeToggle />
            </ReactQueryProvider>
          </Providers>
        </AuthSession>
      </body>
    </html>
  );
}
