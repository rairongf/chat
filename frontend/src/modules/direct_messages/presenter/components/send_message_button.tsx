import { Button, Icon, Input, Row } from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";

export function SendMessageButton() {
  const { theme } = useTheme();

  return (
    <form className="mb-6 px-5 w-full">
      <Row
        className={twJoin(
          "justify-start items-center py-2 px-3",
          theme.backgroundSecondary
        )}
      >
        <Input className="bg-transparent grow shrink basis-auto" />
        <Button className="flex justify-center items-center shrink-0">
          <Icon name={"send"} />
        </Button>
      </Row>
    </form>
  );
}
