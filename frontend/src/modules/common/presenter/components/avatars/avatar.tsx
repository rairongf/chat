import { twJoin } from "tailwind-merge";

export type AvatarProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

export function Avatar({ children, className, ...props }: AvatarProps) {
  return (
    <div
      className={twJoin(
        "relative aspect-square rounded-full overflow-clip flex",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
