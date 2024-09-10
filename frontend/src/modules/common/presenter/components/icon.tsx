import { twJoin } from "tailwind-merge";

export type IconProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  name: string;
};

export function Icon({ name, className, ...props }: IconProps) {
  return (
    <span className={twJoin("material-symbols-outlined", className)} {...props}>
      {name}
    </span>
  );
}
