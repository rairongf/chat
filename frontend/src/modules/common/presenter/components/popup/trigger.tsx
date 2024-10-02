import { twJoin } from "tailwind-merge";
import { Button, ButtonProps } from "../buttons";
import { PopupContainer } from "./container";
import { RemoveLastPopupCallback, usePopup } from "./context";

export type PopupTriggerProps = React.PropsWithChildren<
  Omit<ButtonProps, "onClick"> & {
    popupRenderer: (removeCallback: RemoveLastPopupCallback) => React.ReactNode;
  }
>;

export function PopupTrigger({
  children,
  popupRenderer,
  className,
  ...props
}: PopupTriggerProps) {
  const { addPopup, removeLastPopup } = usePopup();

  return (
    <Button
      className={twJoin("block", className)}
      onClick={(e) => {
        e.stopPropagation();

        const popup = popupRenderer(removeLastPopup);
        if (!popup) return;

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
          </PopupContainer>
        );
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
