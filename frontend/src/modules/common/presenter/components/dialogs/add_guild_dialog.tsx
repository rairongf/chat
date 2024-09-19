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

export type AddGuildDialogProps = Omit<DialogContainerProps, "children">;

export function AddGuildDialog({ onClose }: AddGuildDialogProps) {
  const { user } = useAuth();
  const [guildName, setGuildName] = useState<string>(
    `Servidor de ${user?.name}`
  );
  const [guildPicture, setGuildPicture] = useState<File>();
  const { resource } = useLanguage();
  const { theme } = useTheme();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = [
      guildNameValidator(guildName),
      guildPictureValidator(guildPicture),
    ].filter((err) => err != undefined);
    if (errors.length > 0) return;

    //TODO: call server API
  }

  function guildNameValidator(value: string | undefined): string | undefined {
    if (!value) return "Must not be empty";
    return;
  }

  function guildPictureValidator(file?: File): string | undefined {
    if (!file) {
      return "Must upload a picture";
    }

    return;
  }

  return (
    <Dialog.Container onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Column className="justify-start items-stretch gap-4 text-center">
          <span></span>
          <span></span>
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
            labelText="Nome do servidor"
            validator={(e) => guildNameValidator(e.target.value)}
            helperText="Ao criar um servidor..."
          />
          <Row className="justify-between w-full items-stretch">
            <Button className=""></Button>
            <Button className="" type="submit"></Button>
          </Row>
        </Column>
      </form>
    </Dialog.Container>
  );
}
