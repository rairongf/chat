import { twJoin } from "tailwind-merge";

type ToggleSwitchInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
>;

export function ToggleSwitchInput({
  className,
  ...props
}: ToggleSwitchInputProps) {
  return (
    <label className="w-10 h-6 relative inline-block">
      <input
        type={"checkbox"}
        className={twJoin(className, "peer opacity-0 w-0 h-0")}
        {...props}
      />
      <span
        className={twJoin(
          "absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition-all",
          "rounded-3xl bg-gray-600 peer-checked:bg-green-600",
          //
          "before:absolute before:content-[''] before:m-1 before:h-4 ",
          "before:aspect-square before:left-0 before:bottom-0 before:bg-white",
          "before:transition-all before:rounded-full",
          "peer-checked:before:translate-x-full"
        )}
      ></span>
    </label>
  );
}
