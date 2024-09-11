"use client";

import { UserGuildRoutePathMask } from "@/modules/direct_messages";
import { ActiveChatView } from "@/modules/direct_messages/presenter/components";
import { usePathname } from "next/navigation";

export default function ServerChannelPage() {
  const pathname = usePathname();
  const pathSegments = pathname.substring(1).split("/");
  const guildIdOrAlias = pathSegments[1];

  const showDirectMessagesPage = guildIdOrAlias == UserGuildRoutePathMask;

  return <>{showDirectMessagesPage && <ActiveChatView />}</>;
}
