import { twJoin } from "tailwind-merge";

export type PopupContainerProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;
export function PopupContainer({
  children,
  className,
  ...props
}: PopupContainerProps) {
  return (
    <div
      className={twJoin("w-max absolute z-10", className)}
      style={{
        display: "none",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
