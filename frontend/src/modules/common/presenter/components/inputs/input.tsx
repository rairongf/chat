"use client";

import {
  Button,
  Column,
  Icon,
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
  obscureText?: boolean;
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
  obscureText = false,
  labelText,
  helperText,
  validator,
  ...props
}: InputProps) {
  const { theme } = useTheme();
  const [isObscure, setIsObscure] = useState<boolean>(obscureText);

  //const inputHasRowSiblings = obscureText || prefix || suffix;
  //const defaultInputClassName = "outline-none rounded";
  const defaultInputWithSiblingsClassName =
    "outline-none rounded bg-transparent grow shrink basis-auto my-2 ml-3";

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

  const {
    onChange: onInputChange,
    type: inputType,
    ...otherInputProps
  } = { ...props };
  const [error, setError] = useState<string>();

  const inputComponent = (
    <input
      className={twJoin(defaultInputWithSiblingsClassName, className)}
      onChange={(e) => {
        const errorOrNull = validator?.(e);
        setError(errorOrNull);
        onInputChange?.(e);
      }}
      type={isObscure ? inputType : "text"}
      {...otherInputProps}
    />
  );

  const { className: rowClassName, ...otherRowProps } = { ...rowProps };

  return (
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
      <Row
        className={twMerge(
          "justify-start items-center rounded max-w-full gap-2 pr-3",
          rowClassName
        )}
        {...otherRowProps}
      >
        {prefix != undefined && prefix}
        {shouldUseTextbox && textareaComponent}
        {!shouldUseTextbox && inputComponent}
        {suffix != undefined && suffix}
        {obscureText && (
          <Button
            className={twJoin(
              "flex justify-center items-center h-full aspect-square p-1 rounded",
              theme.colors.background.hoverBlurple
            )}
            onClick={() => setIsObscure(!isObscure)}
          >
            <Icon
              name={isObscure ? "visibility_off" : "visibility"}
              className={twJoin(theme.colors.text.white, "text-lg")}
            />
          </Button>
        )}
      </Row>
      {!!error && (
        <span
          className={twJoin(
            "text-start font-semibold text-xs",
            "text-rose-400"
          )}
        >
          {error}
        </span>
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
  );
}
