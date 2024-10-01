import { twJoin } from "tailwind-merge";
import { Button, ButtonProps } from "../buttons";

export type PopupTriggerProps = React.PropsWithChildren<
  ButtonProps & {
    popupId: string;
  }
>;

export function PopupTrigger({
  children,
  popupId,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClick,
  ...props
}: PopupTriggerProps) {
  return (
    <Button
      className={twJoin(className)}
      onClick={(e) => {
        console.log("Triggered popup", popupId);

        const popup = document.getElementById(popupId);
        if (!popup) return;

        if (popup.style.display != "none") {
          popup.style.display = "none";
          return;
        }

        //const popupRect = popup.getBoundingClientRect();

        const rect = e.currentTarget.getBoundingClientRect();

        const position = {
          top: rect.top + rect.height + 8,
          left: rect.left,
        };

        popup.setAttribute(
          "style",
          `display: block; top: ${position.top}px; left: ${position.left}px`
        );
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
