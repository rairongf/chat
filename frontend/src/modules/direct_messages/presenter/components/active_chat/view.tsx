import { Column, Row } from "@/modules/common";
import { ChatScrollableContainer } from "./chat_scrollable_container";
import { SendMessageButton } from "./send_message_button";

export function ActiveChatView() {
  /* const pathname = usePathname();
  const pathSegments = pathname.substring(1).split("/");
  const guildIdOrMask = pathSegments[1];
  const channelId = pathSegments[2]; */

  return (
    <Column className={`w-full`}>
      {/* Upper Toolbar */}
      {/* <Row></Row> */}

      <Row className="justify-stretch items-stretch h-full">
        {/* Main chat */}
        <main className="flex flex-col justify-start items-stretch w-full pt-4 pb-2">
          <ChatScrollableContainer />
          <SendMessageButton />
        </main>

        {/* Contact info */}
        {/* <aside
      className={`hidden xl:flex flex-col min-w-[22rem] w-[22rem] max-w-[22rem] h-full`}
    ></aside> */}
      </Row>
    </Column>
  );
}
