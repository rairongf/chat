import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";

type ChannelsListTabProps = React.PropsWithChildren;

export function ChannelsListTab({ children }: ChannelsListTabProps) {
  const { theme } = useTheme();

  return (
    <aside
      className={twJoin(
        "h-full p-2 overflow-y-auto overflow-x-clip",
        theme.colors.background.secondary
      )}
    >
      {children}
    </aside>
  );
}
