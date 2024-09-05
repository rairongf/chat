import type { Metadata } from "next";
import { Nunito_Sans } from 'next/font/google';
import "./globals.css";

const nunitoSans = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Chat App",
  description: "Realtime Chat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${nunitoSans.className} w-screen h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
