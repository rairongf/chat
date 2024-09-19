import { twJoin } from "tailwind-merge";
import { Avatar } from "../avatar";
import { Icon } from "../icon";
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
  return (
    <label
      className={twJoin(
        "flex justify-center items-center size-[58px] shrink-0 relative p-1 ",
        "rounded-lg shadow border border-gray-300",
        "group hover:cursor-pointer hover:bg-indigo-400"
      )}
    >
      <div
        className={twJoin(
          "absolute z-10 top-0 right-0 left-0 bottom-0 text-center",
          !file ? "block" : "hidden group-hover:block"
        )}
      >
        <Icon name={"file_upload"} className="text-2xl m-auto text-white" />
      </div>
      {file && (
        <Avatar
          imgProps={{
            alt: "Guild picture preview",
            className: "group-hover:opacity-40",
            src: URL.createObjectURL(file),
            unoptimized: true,
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
