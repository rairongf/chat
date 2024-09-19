import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes, ImgHTMLAttributes } from "react";
import { twJoin } from "tailwind-merge";

type ImgProps = Omit<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  "src"
> & {
  src: string | StaticImport;
  alt: string;
  unoptimized?: boolean;
};
type InitialsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;
type StatusIndicatorProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export type AvatarProps = React.PropsWithChildren<{
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  imgProps?: ImgProps;
  initials?: string;
  initialsProps?: InitialsProps;
  statusIndicatorProps?: StatusIndicatorProps;
}>;

export function Avatar({
  containerProps,
  children,
  imgProps,
  initials,
  initialsProps,
  statusIndicatorProps,
}: AvatarProps) {
  /* const placeholderInitials = (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">JL</span>
    </div>
  ); */

  const { className: imgClassName, ...otherImgProps } = { ...imgProps };
  const { className: initialsClassName, ...otherInitialsProps } = {
    ...initialsProps,
  };
  const { className: indicatorClassName, ...otherIndicatorProps } = {
    ...statusIndicatorProps,
  };
  const { className: containerClassName, ...otherContainerProps } = {
    ...containerProps,
  };

  return (
    <>
      {children ?? <></>}
      {!children && (
        <div
          className={twJoin(
            containerClassName,
            imgProps ? "rounded-full overflow-clip" : ""
          )}
          {...otherContainerProps}
        >
          {imgProps && (
            <Image
              className={twJoin("aspect-square object-cover", imgClassName)}
              {...otherImgProps}
            />
          )}
          {!imgProps && initials && (
            <span
              className={twJoin(
                "font-medium text-gray-600 dark:text-gray-300",
                initialsClassName
              )}
              {...otherInitialsProps}
            >
              {initials}
            </span>
          )}

          {statusIndicatorProps && (
            <span
              className={twJoin(
                "bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full",
                indicatorClassName
              )}
              {...otherIndicatorProps}
            ></span>
          )}
        </div>
      )}
    </>
  );
}
