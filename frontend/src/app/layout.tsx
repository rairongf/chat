import { AuthProvider } from "@/modules/auth/context";
import { DialogProvider } from "@/modules/common";
import { LanguageProvider } from "@/modules/language";
import { SessionProvider } from "@/modules/session/context";
import { ThemeProvider } from "@/modules/theme";
import { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "./styles/globals.css";
import "./styles/material_icons.css";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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
        className={`${nunitoSans.className} w-screen h-screen overflow-hidden`}
      >
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <SessionProvider>
                <DialogProvider>{children}</DialogProvider>
              </SessionProvider>
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
