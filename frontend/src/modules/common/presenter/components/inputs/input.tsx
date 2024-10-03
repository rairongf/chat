"use client";

import {
  Column,
  MultilineTextbox,
  MultilineTextboxProps,
  Row,
  RowProps,
} from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";

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
  const { theme } = useTheme();

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
        <Column className="items-stretch gap-1.5">
          {!!labelText && (
            <span
              className={twJoin(
                "text-start uppercase font-extrabold text-xs",
                theme.colors.text.base
              )}
            >
              {labelText}
            </span>
          )}
          {shouldUseTextbox && textareaComponent}
          {!shouldUseTextbox && inputComponent}
          {!!error && (
            <span className="text-start font-semibold text-xs">{error}</span>
          )}
          {!!helperText && (
            <span
              className={twJoin(
                "text-start font-semibold text-xs",
                theme.colors.text.base
              )}
            >
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
        className={twMerge(
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
