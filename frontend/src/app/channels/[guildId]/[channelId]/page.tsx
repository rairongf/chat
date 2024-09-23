"use client";

import { ActiveChatView } from "@/modules/common";
import { UserGuildRoutePathMask } from "@/modules/direct_messages";
import { usePathname } from "next/navigation";

export default function ServerChannelPage() {
  const pathname = usePathname();
  const pathSegments = pathname.substring(1).split("/");
  const guildIdOrAlias = pathSegments[1];

  const showDirectMessagesPage = guildIdOrAlias == UserGuildRoutePathMask;

  return (
    <>
      {showDirectMessagesPage && (
        <ActiveChatView
          guildIdOrMask={guildIdOrAlias}
          channelId={pathSegments[2]}
        />
      )}
    </>
  );
}
