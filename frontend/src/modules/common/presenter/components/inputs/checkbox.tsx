import { twJoin } from "tailwind-merge";

type CheckboxInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
> & {
  sizeStyle: string;
};

export function CheckboxInput({
  className,
  sizeStyle,
  ...props
}: CheckboxInputProps) {
  return (
    <div className="flex text-white items-center justify-center">
      <input
        type="checkbox"
        className={twJoin(
          "relative peer appearance-none rounded-md cursor-pointer",
          "border-[1px] border-gray-500",
          "checked:bg-indigo-400 checked:border-0 text-white",
          className,
          sizeStyle,
          "aspect-square"
        )}
        {...props}
      />
      <svg
        className={twJoin(
          "absolute invisible peer-checked:visible pointer-events-none p-0.5",
          sizeStyle
        )}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
}
