import { twJoin } from "tailwind-merge";

export type MultilineTextboxProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function MultilineTextbox({
  className,
  ...props
}: MultilineTextboxProps) {
  return (
    <div
      role="textbox"
      aria-multiline={true}
      spellCheck={true}
      aria-haspopup="listbox"
      aria-invalid="false"
      aria-autocomplete="list"
      autoCorrect="off"
      aria-label="Conversar em #general"
      contentEditable={true}
      className={twJoin("outline-none rounded", className)}
      {...props}
    />
  );
}
