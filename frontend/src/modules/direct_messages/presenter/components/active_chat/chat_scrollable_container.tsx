import { Column, Divider, Row } from "@/modules/common";
import { useLanguage } from "@/modules/language";
import { useDirectMessages } from "../../context";
import { MessageItem } from "./message_item";

export function ChatScrollableContainer() {
  const { messages } = useDirectMessages();
  const { formatDate } = useLanguage();

  return (
    <Column
      className="overflow-y-scroll overflow-x-hidden h-full mr-1"
      style={{
        overflowAnchor: "none",
      }}
    >
      {messages.map((message, index, list) => {
        const isFirstMessage = index == 0;
        const previousMessage = list.at(index - 1);
        const isFromOtherSender = previousMessage?.senderId != message.senderId;

        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

        const previousDateIsInTheSameDay =
          previousMessage &&
          message.createdAt.getTime() - previousMessage!.createdAt.getTime() <=
            oneDayInMilliseconds;

        return (
          <>
            {!previousDateIsInTheSameDay && (
              <Row
                key={`divider_${index}`}
                className="justify-center items-center gap-4 pl-6 pr-2 py-3"
              >
                <Divider className="w-full h-[2px]" />
                <span className="text-xs text-nowrap">
                  {formatDate(message.createdAt, {
                    day: "2-digit",
                    month: "long",
                  })}
                </span>
                <Divider className="w-full h-[2px]" />
              </Row>
            )}
            <MessageItem
              key={index}
              senderPicture={
                isFirstMessage ||
                isFromOtherSender ||
                !previousDateIsInTheSameDay
                  ? "https://avatars.githubusercontent.com/u/43035850?v=4"
                  : undefined
              }
              senderName={`User ${message.senderId}`}
              content={message.content}
              date={message.createdAt}
            />
          </>
        );
      })}
    </Column>
  );
}
