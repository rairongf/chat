"use client";

import {
  DirectMessagesPageContent,
  DirectMessagesProvider,
  DirectMessagesStateProvider,
} from "@/modules/direct_messages";
import { usePathname } from "next/navigation";

export default function ChannelsPage() {
  const pathname = usePathname();
  const pathSegments = pathname.substring(1).split("/");
  const serverIdOrAlias = pathSegments[1];
  const directMessagesAlias = "@me";

  const showDirectMessagesPage = serverIdOrAlias == directMessagesAlias;

  console.log("Server id or alias:", serverIdOrAlias);

  return (
    <>
      {showDirectMessagesPage && (
        <DirectMessagesStateProvider>
          <DirectMessagesProvider>
            <DirectMessagesPageContent />
          </DirectMessagesProvider>
        </DirectMessagesStateProvider>
      )}
    </>
  );
}
