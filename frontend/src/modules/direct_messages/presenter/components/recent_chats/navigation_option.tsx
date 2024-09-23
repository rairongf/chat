import { Button, Icon, Row } from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { usePathname, useRouter } from "next/navigation";
import { twJoin } from "tailwind-merge";

export type RecentChatsTabNavigationOptionProps = {
  iconName: string;
  label: string;
  unreadNotificationsCount?: number;
  routePath: string;
  disableNavigation?: boolean;
};

export function RecentChatsTabNavigationOption({
  iconName,
  label,
  unreadNotificationsCount,
  routePath,
  disableNavigation = false,
}: RecentChatsTabNavigationOptionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  const isSelected = pathname.includes(routePath);

  return (
    <Button
      onClick={() => {
        if (isSelected) return;
        if (disableNavigation) {
          console.log(`Clicked ${routePath} option`);
          return;
        }

        router.push(routePath);
      }}
    >
      <Row
        className={twJoin(
          "justify-between py-2 rounded-md items-center",
          isSelected ? theme.colors.background.tertiary : "",
          theme.colors.background.primaryHoverHighlighted
        )}
      >
        <Row
          className={twJoin(
            "items-center justify-start h-full",
            isSelected ? theme.colors.text.highlighted : theme.colors.text.base
          )}
        >
          <Icon className={"px-3 text-xl"} name={iconName} />
          <span className={twJoin("font-semibold")}>{label}</span>
        </Row>
        {!!unreadNotificationsCount && unreadNotificationsCount! != 0 && (
          <div
            className={twJoin(
              "mx-3 rounded-full h-4 aspect-square flex justify-center items-center",
              "text-center text-xs leading-none font-bold",
              theme.colors.common.background.red,
              theme.colors.text.white
            )}
          >
            {unreadNotificationsCount}
          </div>
        )}
      </Row>
    </Button>
  );
}
