import {
  MultilineTextbox,
  MultilineTextboxProps,
  Row,
  RowProps,
} from "@/modules/common";
import { twJoin } from "tailwind-merge";

export type InputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "prefix"
> & {
  shouldUseTextbox?: boolean;
  textboxProps?: MultilineTextboxProps;
  rowProps?: RowProps;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

export function Input({
  className,
  shouldUseTextbox = false,
  textboxProps,
  prefix,
  suffix,
  rowProps,
  ...props
}: InputProps) {
  const defaultInputClassName = "outline-none rounded";
  const defaultInputWithSiblingsClassName =
    "outline-none rounded bg-transparent grow shrink basis-auto";

  const defaultTextboxClassName =
    "bg-transparent max-h-[40vh] overflow-y-auto max-w-full grow shrink basis-auto pr-2";
  const {
    className: textboxClassName,
    style: textboxStyle,
    ...otherTextboxProps
  } = {
    ...textboxProps,
  };
  const textareaComponent = (
    <MultilineTextbox
      className={twJoin(defaultTextboxClassName, textboxClassName)}
      style={{
        whiteSpace: "break-spaces",
        wordBreak: "break-word",
        overflowWrap: "break-word",
        ...textboxStyle,
      }}
      {...otherTextboxProps}
    />
  );

  if (prefix || suffix) {
    const { className: rowClassName, ...otherRowProps } = { ...rowProps };

    return (
      <Row
        className={twJoin(
          "justify-start items-start py-2 px-3 rounded gap-2 max-w-full",
          rowClassName
        )}
        {...otherRowProps}
      >
        {prefix != undefined && prefix}
        {shouldUseTextbox && textareaComponent}
        {!shouldUseTextbox && (
          <input
            className={twJoin(defaultInputWithSiblingsClassName, className)}
            {...props}
          />
        )}
        {suffix != undefined && suffix}
      </Row>
    );
  }

  return (
    <>
      {shouldUseTextbox && textareaComponent}
      {!shouldUseTextbox && (
        <input
          className={twJoin(defaultInputClassName, className)}
          {...props}
        />
      )}
    </>
  );
}
