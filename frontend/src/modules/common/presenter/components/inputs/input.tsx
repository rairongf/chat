import { twJoin } from "tailwind-merge";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input className={twJoin("outline-none rounded", className)} {...props} />
  );
}
