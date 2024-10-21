import { twJoin } from "tailwind-merge";
import { Button, ButtonProps } from "../buttons";
import { PopupContainer } from "./container";
import { usePopup } from "./context";

export type PopupTriggerProps = React.PropsWithChildren<
  Omit<ButtonProps, "onClick"> & {
    popup: React.ReactNode;
    popupKey: string;
  }
>;

export function PopupTrigger({
  children,
  popup,
  popupKey,
  className,
  ...props
}: PopupTriggerProps) {
  const { addPopup } = usePopup();

  return (
    <Button
      className={twJoin("block", className)}
      onClick={(e) => {
        e.stopPropagation();

        const rect = e.currentTarget.getBoundingClientRect();

        const position = {
          top: rect.top + rect.height + 8,
          left: rect.left,
        };

        addPopup(
          <PopupContainer
            id="popup"
            style={{
              display: "block",
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {popup}
          </PopupContainer>,
          popupKey
        );
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
