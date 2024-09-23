"use client";

import { ActiveChatView } from "@/modules/common";
import { usePathname } from "next/navigation";

export default function ServerChannelPage() {
  const pathname = usePathname();
  const pathSegments = pathname.substring(1).split("/");

  return (
    <>
      <ActiveChatView
        guildIdOrMask={pathSegments[1]}
        channelId={pathSegments[2]}
      />
    </>
  );
}
