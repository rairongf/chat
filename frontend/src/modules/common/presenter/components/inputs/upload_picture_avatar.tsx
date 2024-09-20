import { useLanguage } from "@/modules/language";
import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";
import { Avatar } from "../avatar";
import { Icon } from "../icon";
import { Column } from "../layout";
import { Input, InputProps } from "./input";

export type UploadPictureAvatarProps = {
  inputProps?: Omit<InputProps, "onChange" | "type" | "className">;
  onPictureUpload?: (file: File) => void;
  file?: File;
};

export function UploadPictureAvatar({
  inputProps,
  onPictureUpload,
  file,
}: UploadPictureAvatarProps) {
  const { theme } = useTheme();
  const { resource } = useLanguage();

  return (
    <label
      className={twJoin(
        "flex justify-center items-center size-20 relative hover:cursor-pointer",
        "border-2 border-dashed rounded-full"
      )}
    >
      <div
        className={twJoin(
          "absolute top-0 right-0 rounded-full p-1 flex justify-center",
          theme.colors.common.background.blurple
        )}
      >
        <Icon
          name={"add"}
          className={twJoin("text-base leading-none", theme.colors.text.white)}
        />
      </div>
      {!file && (
        <Column className="items-center justify-center">
          <Icon
            name={"photo_camera"}
            className={twJoin(theme.colors.text.highlighted, "text-2xl")}
          />
          <span
            className={twJoin(
              "uppercase text-xs font-extrabold",
              theme.colors.text.highlighted
            )}
          >
            {resource.addGuildDialog.uploadPictureLabel}
          </span>
        </Column>
      )}
      {file && (
        <Avatar
          imgProps={{
            alt: "Guild picture preview",
            src: URL.createObjectURL(file),
            unoptimized: true,
            width: 80,
            height: 80,
          }}
        />
      )}
      <Input
        type={"file"}
        className={twJoin("hidden")}
        onChange={(e) => {
          if (!e.target.files) return;
          if (e.target.files.length == 0) return;
          onPictureUpload?.(e.target.files[0]);
        }}
        {...inputProps}
      />
    </label>
  );
}
