import { UserGuildRoutePathMask } from "@/modules/direct_messages";
import { usePathname } from "next/navigation";

export default function GuildPage() {
  const pathname = usePathname();
  const pathSegments = pathname.substring(1).split("/");
  const serverIdOrAlias = pathSegments[1];

  const showDirectMessagesPage = serverIdOrAlias == UserGuildRoutePathMask;

  return <>{showDirectMessagesPage && <>{/* Friends list */}</>}</>;
}
