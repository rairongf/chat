import { Row } from "@/modules/common";

export function GuildServerPageContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Row className={`justify-start items-stretch w-full`}>
      {/* Channels list tab */}

      {children}
    </Row>
  );
}
