import {
  Column,
  MultilineTextbox,
  MultilineTextboxProps,
  Row,
  RowProps,
} from "@/modules/common";
import { useState } from "react";
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
  labelText?: string;
  helperText?: string;
  validator?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => string | undefined;
};

export function Input({
  className,
  shouldUseTextbox = false,
  textboxProps,
  prefix,
  suffix,
  rowProps,
  labelText,
  helperText,
  validator,
  ...props
}: InputProps) {
  const inputHasRowSiblings = !!prefix || !!suffix;
  const inputHasColumnSiblings = !!validator || !!helperText || !!labelText;
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

  const { onChange: onInputChange, ...otherInputProps } = { ...props };
  const [error, setError] = useState<string>();

  const inputComponent = (
    <input
      className={twJoin(
        inputHasRowSiblings
          ? defaultInputWithSiblingsClassName
          : defaultInputClassName,
        className
      )}
      onChange={(e) => {
        const errorOrNull = validator?.(e);
        setError(errorOrNull);
        onInputChange?.(e);
      }}
      {...otherInputProps}
    />
  );

  const inputOrTextboxWithColumnSiblings = (
    <>
      {!inputHasColumnSiblings && (
        <>
          {shouldUseTextbox && textareaComponent}
          {!shouldUseTextbox && inputComponent}
        </>
      )}
      {inputHasColumnSiblings && (
        <Column className="items-stretch gap-1">
          {!!labelText && (
            <span className="text-start uppercase font-bold text-xs">
              {labelText}
            </span>
          )}
          {shouldUseTextbox && textareaComponent}
          {!shouldUseTextbox && inputComponent}
          {!!error && (
            <span className="text-start font-semibold text-xs">{error}</span>
          )}
          {!!helperText && (
            <span className="text-start font-semibold text-[0.625rem] leading-none">
              {helperText}
            </span>
          )}
        </Column>
      )}
    </>
  );

  if (inputHasRowSiblings) {
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
        {inputOrTextboxWithColumnSiblings}
        {suffix != undefined && suffix}
      </Row>
    );
  }

  return <>{inputOrTextboxWithColumnSiblings}</>;
}
