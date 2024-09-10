import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type ButtonProps = React.PropsWithChildren<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

export function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
