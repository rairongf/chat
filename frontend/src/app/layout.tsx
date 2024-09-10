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
        <ThemeProvider>
          <div className="flex md:flex-row w-full h-full">
            {/* <LeftNavigationBar /> */}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
