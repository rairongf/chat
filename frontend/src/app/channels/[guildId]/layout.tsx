"use client";

import {
  DirectMessagesPageContent,
  DirectMessagesProvider,
  DirectMessagesStateProvider,
  UserGuildRoutePathMask,
} from "@/modules/direct_messages";
import {
  GuildServerPageContent,
  GuildServerProvider,
  GuildServerStateProvider,
} from "@/modules/guild_server";
import { WebsocketProvider, WebsocketStateProvider } from "@/modules/websocket";
import { usePathname } from "next/navigation";

export default function GuildLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pathSegments = pathname.substring(1).split("/");
  const serverIdOrAlias = pathSegments[1];

  const showDirectMessagesPage = serverIdOrAlias == UserGuildRoutePathMask;

  console.log("[GuildLayout] Guild id or alias:", serverIdOrAlias);

  return (
    <>
      <WebsocketStateProvider>
        <WebsocketProvider>
          {!showDirectMessagesPage && (
            <GuildServerStateProvider>
              <GuildServerProvider guildId={serverIdOrAlias}>
                <GuildServerPageContent>{children}</GuildServerPageContent>
              </GuildServerProvider>
            </GuildServerStateProvider>
          )}
          {showDirectMessagesPage && (
            <DirectMessagesStateProvider>
              <DirectMessagesProvider>
                <DirectMessagesPageContent>
                  {children}
                </DirectMessagesPageContent>
              </DirectMessagesProvider>
            </DirectMessagesStateProvider>
          )}
        </WebsocketProvider>
      </WebsocketStateProvider>
    </>
  );
}
