import { Column, Divider, Row } from "@/modules/common";
import { useLanguage } from "@/modules/language";
import { useWebsocket } from "@/modules/websocket";
import { MessageItem } from "./message_item";

export function ChatScrollableContainer() {
  const { messages } = useWebsocket();
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
        const isFromOtherSender =
          previousMessage?.sender._id != message.sender._id;

        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

        const previousDateIsInTheSameDay =
          previousMessage &&
          message.createdAt.getTime() - previousMessage!.createdAt.getTime() <=
            oneDayInMilliseconds;

        return (
          <div key={index}>
            {!previousDateIsInTheSameDay && (
              <Row className="justify-center items-center gap-4 pl-6 pr-2 pt-3">
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
              shouldShowAvatar={
                isFirstMessage ||
                isFromOtherSender ||
                !previousDateIsInTheSameDay
              }
              senderPicture={message.sender.picture}
              senderName={message.sender.name}
              senderUsername={message.sender.username}
              content={message.content}
              date={message.createdAt}
            />
          </div>
        );
      })}
    </Column>
  );
}
