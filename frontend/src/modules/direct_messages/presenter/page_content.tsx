import { Row } from "@/modules/common";
import { RecentChatsTab } from "./components";

export function DirectMessagesPageContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Row className={`justify-start items-stretch w-full`}>
      {/* Recent chats tabs */}
      <RecentChatsTab />

      {children}
    </Row>
  );
}
