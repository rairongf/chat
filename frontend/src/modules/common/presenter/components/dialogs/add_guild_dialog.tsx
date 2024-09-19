"use client";

import { useAuth } from "@/modules/auth/context";
import { useLanguage } from "@/modules/language";
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
  const { user } = useAuth();
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
          <span className="">{resource.addGuildDialog.title}</span>
          <span className="">{resource.addGuildDialog.subtitle}</span>
          <UploadPictureAvatar
            onPictureUpload={(file) => setGuildPicture(file)}
            file={guildPicture}
            inputProps={{
              validator: (e) => guildPictureValidator(e.target.files?.[0]),
            }}
          />
          <Input
            className={twJoin(theme.foreground, "text-white p-2")}
            value={guildName}
            onChange={(e) => setGuildName(e.target.value)}
            labelText={resource.addGuildDialog.inputLabel}
            validator={(e) => guildNameValidator(e.target.value)}
            helperText={`${resource.addGuildDialog.inputHelperText.partOne}${resource.addGuildDialog.inputHelperText.linkLabel}${resource.addGuildDialog.inputHelperText.partTwo}`}
          />
          <Row className="justify-between w-full items-stretch">
            <Button className="">
              {resource.addGuildDialog.dismissButtonLabel}
            </Button>
            <Button className="" type="submit">
              {resource.addGuildDialog.submitButtonLabel}
            </Button>
          </Row>
        </Column>
      </form>
    </Dialog.Container>
  );
}
