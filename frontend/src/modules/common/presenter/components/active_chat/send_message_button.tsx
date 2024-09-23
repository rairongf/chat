import { Button, Icon, Input } from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { useWebsocket } from "@/modules/websocket";
import { twJoin } from "tailwind-merge";

export function SendMessageButton() {
  const { theme } = useTheme();
  const { sendMessage } = useWebsocket();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const textbox = document.getElementById("textbox-input");
    const content = textbox?.innerHTML;
    if (!content || content.length == 0) return;

    sendMessage({ content });
    textbox.textContent = null;
  }

  return (
    <form
      className="mb-6 px-5 max-w-full"
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key != "Enter") return;
        handleSubmit(e);
      }}
    >
      <Input
        rowProps={{
          className: twJoin(
            theme.colors.background.tertiary,
            "w-full max-w-full"
          ),
        }}
        shouldUseTextbox={true}
        textboxProps={{
          id: "textbox-input",
        }}
        suffix={
          <Button
            className="flex justify-center items-center shrink-0"
            type="submit"
          >
            <Icon name={"send"} />
          </Button>
        }
      />
    </form>
  );
}
