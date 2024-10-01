import { twJoin } from "tailwind-merge";

export type PopupContainerProps = React.PropsWithChildren<
  Omit<React.HTMLAttributes<HTMLDivElement>, "id"> & { id: string }
>;
export function PopupContainer({
  children,
  className,
  id,
  ...props
}: PopupContainerProps) {
  return (
    <div
      id={id}
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
