"use client";

import { Column, Row } from "@/modules/common";
import { useWebsocket } from "@/modules/websocket";
import { useEffect } from "react";
import { ChatScrollableContainer } from "./chat_scrollable_container";
import { SendMessageButton } from "./send_message_button";

export type ActiveChatViewProps = {
  guildIdOrMask: string;
  channelId: string;
};

export function ActiveChatView({ channelId }: ActiveChatViewProps) {
  const { connectToChannel } = useWebsocket();

  useEffect(() => {
    connectToChannel({ channelId });
  }, []);

  return (
    <Column className={`w-full`}>
      {/* Upper Toolbar */}
      {/* <Row></Row> */}

      <Row className="justify-stretch items-stretch h-full">
        {/* Main chat */}
        <main className="flex flex-col justify-start items-stretch w-full max-w-full h-full pt-4 pb-2">
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
