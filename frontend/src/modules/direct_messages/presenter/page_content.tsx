import { Button, Column, Icon, Row } from "@/modules/common";
import { ChatScrollableContainer, SendMessageButton } from "./components";

export function DirectMessagesPageContent() {
  return (
    <Row className={`justify-start items-stretch w-full`}>
      {/* Recent chats tabs */}
      <aside className={`min-w-60 w-60 max-w-60 h-full p-2`}>
        <Column>
          <Row className="w-full justify-between items-center">
            <span className="uppercase text-xs font-bold">
              Mensages diretas
            </span>
            <Button>
              <Icon className="text-base font-medium" name="add" />
            </Button>
          </Row>
        </Column>
      </aside>

      {/* Chat window */}
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
    </Row>
  );
}
