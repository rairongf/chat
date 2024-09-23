"use client";

import { useSession } from "@/modules/session/context";
import { useTheme } from "@/modules/theme";
import { usePathname, useRouter } from "next/navigation";
import { twJoin } from "tailwind-merge";
import { AddGuildDialog, Divider, Icon, useDialog } from "..";
import { LeftNavigationBarItem } from "./left_nav_bar_item";

export function LeftNavigationBar() {
  const { guilds, addGuild } = useSession();
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
          const onClick = () => navigateToRoute(`/channels/${guild._id}`);
          const selected = pathname.includes(`/channels/${guild._id}`);

          if (guild.picture) {
            return (
              <LeftNavigationBarItem
                key={index}
                onClick={onClick}
                imgProps={{
                  src: guild.picture,
                  alt: `Guild ${guild.name} picture`,
                  width: 128,
                  height: 128,
                }}
                selected={selected}
              />
            );
          }

          const nameSegments = guild.name.split(" ");
          const initials =
            nameSegments.length > 1
              ? `${nameSegments[0][0]}${nameSegments[1][0]}`
              : guild.name.substring(0, 2);

          return (
            <LeftNavigationBarItem
              key={index}
              onClick={onClick}
              initials={initials}
              initialsProps={{
                className: twJoin("font-bold text-lg"),
              }}
              selected={selected}
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
                onSave={async (data) => {
                  const result = await addGuild({ ...data });
                  if (result) removeAny();
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
