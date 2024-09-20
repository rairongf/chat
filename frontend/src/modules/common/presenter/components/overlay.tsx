import { twJoin } from "tailwind-merge";

export type OverlayProps = React.PropsWithChildren;

export function Overlay({ children }: OverlayProps) {
  return (
    <div
      className={twJoin(
        "absolute top-0 left-0 right-0 bottom-0 bg-black/[.54]",
        "flex justify-center items-center"
      )}
    >
      {children}
    </div>
  );
}
