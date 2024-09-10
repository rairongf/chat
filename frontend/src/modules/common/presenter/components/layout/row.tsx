import { twJoin } from "tailwind-merge";

export type RowProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

export function Row({ children, className, ...props }: RowProps) {
  return (
    <>
      <div className={twJoin("flex flex-row", className)} {...props}>
        {children}
      </div>
    </>
  );
}
