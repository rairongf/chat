import { Row } from "@/modules/common";
import { usePathname } from "next/navigation";
import { FriendsSection, RecentChatsTab } from "./components";

export function DirectMessagesPageContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pathSegments = pathname.substring(1).split("/");

  const containsChannelId = pathSegments.length > 2;

  return (
    <Row className={`justify-start items-stretch w-full`}>
      {/* Recent chats tabs */}
      <RecentChatsTab />

      {!containsChannelId && <FriendsSection />}

      {children}
    </Row>
  );
}
