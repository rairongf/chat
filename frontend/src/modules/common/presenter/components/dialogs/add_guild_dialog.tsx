"use client";

import { useLanguage } from "@/modules/language";
import { useSession } from "@/modules/session/context";
import { useTheme } from "@/modules/theme";
import { useState } from "react";
import { twJoin } from "tailwind-merge";
import { Dialog } from ".";
import { Button } from "../buttons";
import { Input, UploadPictureAvatar } from "../inputs";
import { Column, Row } from "../layout";
import { DialogContainerProps } from "./container";

export type AddGuildDialogProps = Omit<DialogContainerProps, "children"> & {
  onSave: (data: { name: string; picture?: File }) => void;
};

export function AddGuildDialog({ onClose, onSave }: AddGuildDialogProps) {
  const { user } = useSession();
  const { resource } = useLanguage();
  const [guildName, setGuildName] = useState<string>(
    `${resource.addGuildDialog.inputDefaultValue}${user?.name}`
  );
  const [guildPicture, setGuildPicture] = useState<File>();
  const { theme } = useTheme();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = [
      guildNameValidator(guildName),
      guildPictureValidator(guildPicture),
    ].filter((err) => err != undefined);
    if (errors.length > 0) return;

    onSave({ name: guildName, picture: guildPicture });
  }

  function guildNameValidator(value: string | undefined): string | undefined {
    if (!value)
      return resource.addGuildDialog.inputErrorMessages.missingGuildName;
    return;
  }

  function guildPictureValidator(file?: File): string | undefined {
    if (!file) {
      return resource.addGuildDialog.inputErrorMessages.missingGuildPicture;
    }

    return;
  }

  return (
    <Dialog.Container onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Column className="justify-start items-stretch gap-4 text-center">
          <span
            className={twJoin(
              theme.colors.text.black,
              "font-extrabold text-2xl px-6 pt-6"
            )}
          >
            {resource.addGuildDialog.title}
          </span>
          <span className={twJoin(theme.colors.text.base, "px-4 text-sm")}>
            {resource.addGuildDialog.subtitle}
          </span>
          <div className="flex justify-center ">
            <UploadPictureAvatar
              onPictureUpload={(file) => setGuildPicture(file)}
              file={guildPicture}
              inputProps={{
                validator: (e) => guildPictureValidator(e.target.files?.[0]),
              }}
            />
          </div>
          <div className="px-4">
            <Input
              className={twJoin(
                theme.colors.background.tertiary,
                theme.colors.text.highlighted,
                "p-2 font-semibold"
              )}
              value={guildName}
              onChange={(e) => setGuildName(e.target.value)}
              labelText={resource.addGuildDialog.inputLabel}
              validator={(e) => guildNameValidator(e.target.value)}
              helperText={`${resource.addGuildDialog.inputHelperText.partOne}${resource.addGuildDialog.inputHelperText.linkLabel}${resource.addGuildDialog.inputHelperText.partTwo}`}
            />
          </div>
          <Row
            className={twJoin(
              "justify-between w-full items-stretch p-4",
              theme.colors.background.secondary
            )}
          >
            <Button
              className={twJoin("text-sm", theme.colors.text.base)}
              onClick={onClose}
            >
              {resource.addGuildDialog.dismissButtonLabel}
            </Button>
            <Button
              className={twJoin(
                "p-2 text-sm rounded min-w-24 font-semibold",
                theme.colors.common.background.blurple,
                theme.colors.text.white
              )}
              type="submit"
            >
              {resource.addGuildDialog.submitButtonLabel}
            </Button>
          </Row>
        </Column>
      </form>
    </Dialog.Container>
  );
}
