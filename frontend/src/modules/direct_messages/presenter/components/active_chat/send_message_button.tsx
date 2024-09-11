import { Button, Icon, Input, Row } from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { useState } from "react";
import { twJoin } from "tailwind-merge";
import { useDirectMessages } from "../../context";

export function SendMessageButton() {
  const { theme } = useTheme();
  const [content, setContent] = useState<string>();
  const { sendMessage } = useDirectMessages();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content || content.length == 0) return;

    sendMessage({ content });
    setContent(undefined);
  }

  return (
    <form className="mb-6 px-5 w-full" onSubmit={handleSubmit}>
      <Row
        className={twJoin(
          "justify-start items-center py-2 px-3",
          theme.backgroundSecondary
        )}
      >
        <Input
          className="bg-transparent grow shrink basis-auto"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          className="flex justify-center items-center shrink-0"
          type="submit"
        >
          <Icon name={"send"} />
        </Button>
      </Row>
    </form>
  );
}
