import { AuthProvider, AuthStateProvider } from "@/modules/auth";
import { DialogProvider, PopupProvider } from "@/modules/common";
import { LanguageProvider } from "@/modules/language";
import { SessionProvider, SessionStateProvider } from "@/modules/session";
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
            <AuthStateProvider>
              <AuthProvider>
                <SessionStateProvider>
                  <SessionProvider>
                    <DialogProvider>
                      <PopupProvider>{children}</PopupProvider>
                    </DialogProvider>
                  </SessionProvider>
                </SessionStateProvider>
              </AuthProvider>
            </AuthStateProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
