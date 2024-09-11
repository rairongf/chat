import { Column } from "@/modules/common";
import { useDirectMessages } from "../../context";
import { MessageItem } from "./message_item";

export function ChatScrollableContainer() {
  const { messages } = useDirectMessages();

  return (
    <Column
      className="overflow-y-scroll overflow-x-hidden mr-1"
      style={{
        overflowAnchor: "none",
      }}
    >
      {messages.map((message, index) => {
        return (
          <MessageItem
            key={index}
            senderPicture={
              index == 0
                ? "https://avatars.githubusercontent.com/u/43035850?v=4"
                : undefined
            }
            senderName={`User ${message.sender_id}`}
            content={message.content}
            date={message.createdAt}
          />
        );
      })}
    </Column>
  );
}
