import { twJoin } from "tailwind-merge";
import { Row, RowProps } from "./layout";

type TopBarProps = RowProps;

export function TopBar({ children, className }: TopBarProps) {
  return (
    <Row
      className={twJoin("w-full h-12 p-2 overflow-x-clip shadow", className)}
    >
      {children}
    </Row>
  );
}
