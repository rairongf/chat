import { Column, Input, InputProps } from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";

type RegisterInputWithLabelProps = {
  label: string;
} & InputProps;

export function RegisterInputWithLabel({
  label,
  required,
  ...props
}: RegisterInputWithLabelProps) {
  const { theme } = useTheme();

  return (
    <Column className="items-stretch gap-1">
      <span
        className={twJoin(
          "text-start uppercase font-extrabold text-xs",
          theme.colors.text.gray
        )}
      >
        {label}
        {required && <span className={"text-red-700 font-medium"}> *</span>}
      </span>
      <Input required {...props} />
    </Column>
  );
}
