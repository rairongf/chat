"use client";

import { useTheme } from "@/modules/theme";
import { usePathname, useRouter } from "next/navigation";
import { twJoin } from "tailwind-merge";
import { AddGuildDialog, Divider, Icon, useDialog } from "..";
import { LeftNavigationBarItem } from "./left_nav_bar_item";

export function LeftNavigationBar() {
  const guilds: { _id: string }[] = [{ _id: "1" }];
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { show, removeAny } = useDialog();

  function navigateToRoute(path: string) {
    if (pathname.includes(path)) return;

    router.push(path);
  }

  return (
    <>
      <nav
        className={twJoin(
          "flex flex-col justify-start items-center p-3 h-full min-w-[4.5rem] w-[4.5rem]",
          "max-w-[4.5rem] gap-2 overflow-y-auto",
          theme.colors.background.tertiary
        )}
      >
        {/* Direct Messages Tab Option */}
        <LeftNavigationBarItem
          onClick={() => navigateToRoute("/channels/@me")}
          selected={pathname.includes("/channels/@me")}
        >
          <Icon name={"home"} className="text-xl" />
        </LeftNavigationBarItem>
        <Divider className="w-3/5 h-[2px]" />

        {/* Guild Servers */}
        {guilds.map((guild, index) => {
          return (
            <LeftNavigationBarItem
              key={index}
              onClick={() => navigateToRoute(`/channels/${guild._id}`)}
              imgProps={{
                src: "",
                alt: "",
              }}
              selected={pathname.includes(`/channels/${guild._id}`)}
            />
          );
        })}

        {/* Add Chat Server Option */}
        <Divider className="w-3/5 h-[2px]" />
        <LeftNavigationBarItem
          onClick={() =>
            show(
              <AddGuildDialog
                onClose={removeAny}
                onSave={(data) => {
                  console.log("Add guild:", data);
                }}
              />,
              {
                key: "add_guild",
              }
            )
          }
        >
          <Icon name="add" className="text-xl" />
        </LeftNavigationBarItem>
      </nav>
    </>
  );
}
