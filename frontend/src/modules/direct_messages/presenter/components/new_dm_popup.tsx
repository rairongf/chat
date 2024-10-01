import {
  Button,
  Column,
  InitialsAvatar,
  Input,
  PictureAvatar,
  Row,
} from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { useState } from "react";
import { twJoin } from "tailwind-merge";
import { useDirectMessages } from "../context";

export function NewDMPopup({
  onSubmit,
}: {
  onSubmit: (friendsIds: string[]) => void;
}) {
  const { theme } = useTheme();
  const { friends } = useDirectMessages();
  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const filteredFriends = friends.filter((friend) => {
    const searchLowercase = search.toLowerCase();

    return (
      friend.name.toLowerCase().includes(searchLowercase) ||
      friend.username.toLowerCase().includes(searchLowercase)
    );
  });
  const stillSelectableCount = 9 - selectedFriendIds.length;

  function handleSelection(id: string) {
    if (isSelected(id)) {
      setSelectedFriendIds((ids) => [...ids.filter((e) => e != id)]);
      return;
    }

    setSelectedFriendIds((ids) => [...ids, id]);
  }

  function isSelected(id: string): boolean {
    return selectedFriendIds.find((e) => e == id) != undefined;
  }

  return (
    <Column
      className={twJoin(
        "justify-start items-stretch rounded shadow-md w-96 max-h-80",
        theme.colors.background.primary
      )}
    >
      <Column className="p-3 justify-start items-start">
        <h3 className={twJoin(theme.colors.text.black, "font-bold text-lg")}>
          Selecionar amigos
        </h3>
        <p className={twJoin(theme.colors.text.highlighted, "text-xs mt-0.5")}>
          Você pode adicionar mais {stillSelectableCount} amigos
        </p>
        <Input
          className={twJoin(
            theme.colors.background.tertiary,
            theme.colors.text.highlighted,
            "mt-5 w-full text-sm px-3 py-1.5"
          )}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Digite o nome de usuário de um amigo"
        />
        <Column className="overflow-y-auto mt-3 w-full items-stretch">
          {filteredFriends.map((friend, index) => {
            return (
              <Button
                key={index}
                className={twJoin(
                  theme.colors.background.primaryHoverHighlighted,
                  "rounded"
                )}
                onClick={() => handleSelection(friend._id)}
              >
                <Row className="justify-between items-center pl-1 pr-2 py-0.5">
                  <Row className="justify-start items-center gap-2">
                    {friend.picture && (
                      <PictureAvatar
                        avatar={{
                          className: twJoin("h-8"),
                        }}
                        src={friend.picture}
                        alt={friend.name}
                      />
                    )}
                    {!friend.picture && (
                      <InitialsAvatar
                        avatar={{
                          className: twJoin(
                            "h-8 p-0.5",
                            theme.colors.background.tertiary
                          ),
                        }}
                        name={friend.name}
                      />
                    )}
                    <span className={twJoin(theme.colors.text.black)}>
                      {friend.name}
                      <span
                        className={twJoin(
                          "ml-2 text-sm",
                          theme.colors.text.base
                        )}
                      >
                        {friend.username}
                      </span>
                    </span>
                  </Row>

                  {/* Checkbox */}
                  <Input
                    type="checkbox"
                    className={twJoin("cursor-pointer h-5 aspect-square")}
                    checked={isSelected(friend._id)}
                  />
                </Row>
              </Button>
            );
          })}
        </Column>
      </Column>
      <div className="w-full p-4 border-t-[1px] border-gray-200">
        <Button
          className={twJoin(
            theme.colors.common.background.blurple,
            theme.colors.text.white,
            "font-medium text-sm w-full p-3 rounded"
          )}
          onClick={() => onSubmit(selectedFriendIds)}
        >
          Criar DM
        </Button>
      </div>
    </Column>
  );
}
