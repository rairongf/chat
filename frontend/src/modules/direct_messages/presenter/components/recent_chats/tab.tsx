import { Button, Column, Icon, Row } from "@/modules/common";
import { useDirectMessages } from "../../context";
import { RecentChatsTabItem } from "./item";

export function RecentChatsTab() {
  const { channels, connectToChannel } = useDirectMessages();

  return (
    <aside className={`min-w-60 w-60 max-w-60 h-full p-2`}>
      <Column className="gap-1">
        <Row className="w-full justify-between items-center mb-2 pl-2.5 pr-2">
          <span className="uppercase text-xs font-bold">Mensages diretas</span>
          <Button>
            <Icon className="text-base font-medium" name="add" />
          </Button>
        </Row>
        {channels.map((channel, i) => {
          return (
            <RecentChatsTabItem
              key={i}
              name={channel.name}
              date={channel.createdAt}
              onClick={() => connectToChannel({ channelId: channel._id })}
            />
          );
        })}
      </Column>
    </aside>
  );
}
