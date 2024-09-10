import { Avatar, Divider, Icon } from ".";

export function LeftNavigationBar() {
  return (
    <>
      <nav
        className={`flex flex-col justify-start items-center p-3 h-full min-w-16 w-16 max-w-20 gap-2 overflow-y-auto`}
      >
        {/* Direct Messages Tab Option */}
        <Avatar
          initials="RF"
          initialsProps={{}}
          containerProps={{
            className: "flex justify-center items-center w-full aspect-square",
          }}
        />
        <Divider className="w-3/5 h-1" />

        {/* Chat Servers */}
        <Avatar initials="" />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />

        {/* Add Chat Server Option */}
        <Divider className="w-3/5 h-1" />
        <Avatar>
          <Icon name="add" />
        </Avatar>
      </nav>
    </>
  );
}
