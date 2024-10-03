import {
  Button,
  Column,
  Divider,
  Icon,
  InitialsAvatar,
  Input,
  PictureAvatar,
  Row,
  Tooltip,
  TopBar,
  User,
} from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { twJoin } from "tailwind-merge";
import { useDirectMessages } from "../../context";

export function FriendsSection() {
  const { theme } = useTheme();
  const router = useRouter();
  const { friends, channels, addNewDm } = useDirectMessages();
  const [search, setSearch] = useState<string>("");
  const filteredFriends = friends.filter((friend) => {
    const searchLowercase = search.toLowerCase();

    return (
      friend.name.toLowerCase().includes(searchLowercase) ||
      friend.username.toLowerCase().includes(searchLowercase)
    );
  });
  const friendsCount = filteredFriends.length;

  function navigateToDM(id: string) {
    router.push(`/channels/@me/${id}`);
  }

  async function handleFriendClick(friend: User) {
    const dmChannel = channels.find((c) => c.members.includes(friend._id));

    if (dmChannel) {
      navigateToDM(dmChannel._id);
      return;
    }

    const response = await addNewDm({ friend });
    if (!response.didSucceed) return;

    navigateToDM(response.channel!._id);
  }

  return (
    <Column className="w-full">
      <TopBar className="justify-between items-center">
        <Row className="ml-1 gap-4 items-center justify-start max-h-full overflow-y-clip">
          <Row className="gap-2 items-center">
            <Icon
              name={"group"}
              className={twJoin(theme.colors.text.base, "text-2xl")}
            />
            <span className={twJoin("font-bold", theme.colors.text.black)}>
              Amigos
            </span>
          </Row>
          <Divider className="py-3 w-[1px]" />

          {/* List Filters */}
          <Button
            className={twJoin(
              "px-2 h-min rounded font-medium",
              theme.colors.text.highlighted,
              theme.colors.text.highlightedHover,
              theme.colors.background.primaryHoverHighlighted,
              true ? theme.colors.background.tertiary : ""
            )}
          >
            Todos
          </Button>
        </Row>

        {/* Options */}
        <Row className="mr-1"></Row>
      </TopBar>

      {/* Friends List */}
      <Column className="gap-4">
        <div className="ml-8 mr-6 mt-4">
          <Input
            className={twJoin(theme.colors.text.highlighted)}
            rowProps={{
              className: twJoin(
                theme.colors.background.tertiary,
                "px-2 py-0.5 items-center h-8"
              ),
            }}
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            suffix={
              search.length == 0 ? (
                <Icon
                  name={"search"}
                  className={twJoin("text-xl", theme.colors.text.highlighted)}
                />
              ) : (
                <Button onClick={() => setSearch("")}>
                  <Icon
                    name={"clear"}
                    className={twJoin("text-xl", theme.colors.text.highlighted)}
                  />
                </Button>
              )
            }
          />
        </div>
        <p
          className={twJoin(
            "ml-8 mt-2 uppercase font-bold text-[11px] leading-none",
            theme.colors.text.base
          )}
        >
          Todos os amigos — {friendsCount}
        </p>
        <div className="overflow-y-auto h-full">
          <Column className="px-5 h-full">
            {filteredFriends.map((friend, index) => {
              return (
                <Button
                  onClick={() => handleFriendClick(friend)}
                  key={index}
                  className={twJoin(
                    "flex flex-row p-2 rounded-md justify-between items-center",
                    "border-t-[1px] border-gray-200 hover:bg-gray-200"
                  )}
                >
                  <Row className="justify-start items-center gap-2">
                    {friend.picture && (
                      <PictureAvatar
                        src={friend.picture}
                        alt={friend.name}
                        avatar={{
                          className: "h-8",
                        }}
                      />
                    )}
                    {!friend.picture && (
                      <InitialsAvatar
                        name={friend.name}
                        avatar={{
                          className: twJoin(
                            "h-8",
                            theme.colors.background.tertiary
                          ),
                        }}
                      />
                    )}
                    <Column className="justify-between items-start">
                      <span
                        className={twJoin("font-bold", theme.colors.text.black)}
                      >
                        {friend.name}
                      </span>
                      <span
                        className={twJoin("text-sm", theme.colors.text.base)}
                      >
                        {friend.username}
                      </span>
                    </Column>
                  </Row>
                  <Row className="justify-end items-center gap-2">
                    <Tooltip message={"Mensagem"} id={`Mensagem_${friend._id}`}>
                      <Button
                        onClick={() => handleFriendClick(friend)}
                        className={twJoin(
                          "rounded-full h-8 aspect-square",
                          "flex justify-center items-center",
                          theme.colors.background.secondary,
                          theme.colors.text.highlighted,
                          theme.colors.text.highlightedHover
                        )}
                      >
                        <Icon
                          name={"chat_bubble"}
                          className={twJoin("text-lg leading-none")}
                        />
                      </Button>
                    </Tooltip>
                    <Tooltip message={"Mais"} id={`Mais_${friend._id}`}>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className={twJoin(
                          "rounded-full h-8 aspect-square",
                          "flex justify-center items-center",
                          theme.colors.background.secondary,
                          theme.colors.text.highlighted,
                          theme.colors.text.highlightedHover
                        )}
                      >
                        <Icon
                          name={"more_vert"}
                          className={twJoin("text-xl leading-none")}
                        />
                      </Button>
                    </Tooltip>
                  </Row>
                </Button>
              );
            })}
          </Column>
        </div>
      </Column>
    </Column>
  );
}
