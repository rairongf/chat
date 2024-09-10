import { twJoin } from "tailwind-merge";

export type ColumnProps = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>

export function Column({ children, className, ...props }: ColumnProps) {
  return (<>
    <div className={twJoin('flex flex-col', className)} {...props}>{children}</div>
  </>);
}