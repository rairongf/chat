import { Column } from "@/modules/common";
import { MessageItem } from ".";

export function ChatScrollableContainer() {
  const now = new Date();

  return (
    <Column
      className="overflow-y-scroll overflow-x-hidden mr-1"
      style={{
        overflowAnchor: "none",
      }}
    >
      {Array(16)
        .fill(0)
        .map((_, index) => {
          return (
            <MessageItem
              key={index}
              senderPicture={
                index == 0
                  ? "https://avatars.githubusercontent.com/u/43035850?v=4"
                  : undefined
              }
              senderName="Rairon Ferreira"
              content={`Olá ${index}`}
              date={now}
            />
          );
        })}
      {Array(10)
        .fill(0)
        .map((_, index) => {
          return (
            <MessageItem
              key={index}
              senderName="Teste"
              senderPicture={
                index == 0
                  ? "https://avatars.githubusercontent.com/u/43035850?v=4"
                  : undefined
              }
              content={`Teste ${index}`}
              date={now}
            />
          );
        })}
    </Column>
  );
}
