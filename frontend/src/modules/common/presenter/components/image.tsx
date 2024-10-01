import Image from "next/image";

export type ChatImageProps = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"
> & {
  src: string | import("next/dist/shared/lib/get-img-props").StaticImport;
  alt: string;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  fill?: boolean | undefined;
  loader?: import("next/dist/shared/lib/get-img-props").ImageLoader | undefined;
  quality?: number | `${number}` | undefined;
  priority?: boolean | undefined;
  loading?: "eager" | "lazy" | undefined;
  placeholder?:
    | import("next/dist/shared/lib/get-img-props").PlaceholderValue
    | undefined;
  blurDataURL?: string | undefined;
  unoptimized?: boolean | undefined;
  overrideSrc?: string | undefined;
  onLoadingComplete?:
    | import("next/dist/shared/lib/get-img-props").OnLoadingComplete
    | undefined;
  layout?: string | undefined;
  objectFit?: string | undefined;
  objectPosition?: string | undefined;
  lazyBoundary?: string | undefined;
  lazyRoot?: string | undefined;
} & React.RefAttributes<HTMLImageElement | null>;

export function ChatImage({ alt = "", ...props }: ChatImageProps) {
  return <Image alt={alt} {...props} />;
}
