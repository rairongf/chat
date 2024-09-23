import { twJoin } from "tailwind-merge";

export type OverlayProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

export function Overlay({ children, className, ...props }: OverlayProps) {
  return (
    <div
      className={twJoin("absolute top-0 left-0 right-0 bottom-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}
