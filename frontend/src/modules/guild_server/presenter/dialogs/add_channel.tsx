import {
  Button,
  CheckboxInput,
  Column,
  Dialog,
  DialogContainerProps,
  Icon,
  Input,
  Row,
  ToggleSwitchInput,
} from "@/modules/common";
import { useLanguage } from "@/modules/language";
import { useTheme } from "@/modules/theme";
import { useState } from "react";
import { twJoin } from "tailwind-merge";

type GuildChannelTypeOptionProps = {
  iconName: string;
  label: string;
  description: string;
  onClick: () => void;
  selected: boolean;
};

function GuildChannelTypeOption(props: GuildChannelTypeOptionProps) {
  const { theme } = useTheme();

  return (
    <Button
      onClick={() => props.onClick()}
      className={twJoin(
        "rounded w-full",
        theme.colors.background.secondary,
        theme.colors.background.primaryHoverHighlighted
      )}
    >
      <Row className="items-center">
        <Icon name={props.iconName} className="mx-3 text-3xl" />
        <Column className="basis-auto gap-1 items-start justify-center w-full my-1">
          <span className="text-base text-start font-bold">{props.label}</span>
          <span className="text-sm font-semibold text-start">
            {props.description}
          </span>
        </Column>
        <CheckboxInput
          sizeStyle="h-5"
          checked={props.selected}
          readOnly
          className="mx-3"
        />
      </Row>
    </Button>
  );
}

type AddGuildChannelDialogProps = Omit<DialogContainerProps, "children"> & {
  onConfirm: (data: { type: string; name: string; private: boolean }) => void;
};

export function AddGuildChannelDialog({
  onClose,
  onConfirm,
}: AddGuildChannelDialogProps) {
  const { resource } = useLanguage();
  const { theme } = useTheme();
  const channelTypeOptions = [
    {
      value: "text",
      iconName: "tag",
      label: resource.addGuildChannelDialog.channelTypeSelect.options.text.type,
      description:
        resource.addGuildChannelDialog.channelTypeSelect.options.text
          .description,
      nameFormatter: (value: string | undefined) =>
        value?.toLowerCase()?.replaceAll(" ", "-") ?? "",
    },
    {
      value: "voice",
      iconName: "volume_up",
      label:
        resource.addGuildChannelDialog.channelTypeSelect.options.voice.type,
      description:
        resource.addGuildChannelDialog.channelTypeSelect.options.voice
          .description,
      nameFormatter: (value: string | undefined) => value ?? "",
    },
  ];
  const [selectedChannelTypeName, selectChannelType] = useState<string>("text");
  const selectedChannelTypeOption = channelTypeOptions.find(
    (opt) => opt.value == selectedChannelTypeName
  )!;
  const [channelName, setChannelName] = useState("");
  const [isPrivate, setPrivacy] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = [channelNameValidator(channelName)].filter(
      (err) => err != undefined
    );
    if (errors.length > 0) return;

    onConfirm({
      name: channelName,
      type: selectedChannelTypeName,
      private: isPrivate,
    });
  }

  function channelNameValidator(value: string | undefined): string | undefined {
    if (!value || value.length < 1) {
      return "Digite o nome do canal";
    }
  }

  return (
    <Dialog.Container onClose={onClose} className="rounded-xl overflow-clip">
      <form onSubmit={handleSubmit}>
        <Column className="justify-start items-stretch gap-4 text-center">
          <span
            className={twJoin(
              theme.colors.text.black,
              "font-extrabold text-xl leading-6 px-4 pt-3 text-start"
            )}
          >
            {resource.addGuildChannelDialog.title}
          </span>

          {/* Channel Type Selection */}
          <Column className="gap-2 items-start px-4">
            <span
              className={twJoin(
                "uppercase text-xs font-extrabold",
                theme.colors.text.base
              )}
            >
              {resource.addGuildChannelDialog.channelTypeSelect.label}
            </span>
            {channelTypeOptions.map((option, index) => (
              <GuildChannelTypeOption
                key={`${option.value}_${index}`}
                iconName={option.iconName}
                label={option.label}
                description={option.description}
                selected={selectedChannelTypeName === option.value}
                onClick={() => {
                  selectChannelType(option.value);
                  setChannelName(option.nameFormatter(channelName));
                }}
              />
            ))}
          </Column>

          {/* Channel Name Input */}
          <Column className="px-4">
            <Input
              className={twJoin(theme.colors.text.highlighted, "font-semibold")}
              prefix={
                <Icon
                  name={selectedChannelTypeOption.iconName}
                  className="text-lg ml-3"
                />
              }
              required
              rowProps={{
                className: twJoin(theme.colors.background.tertiary, "gap-0"),
              }}
              value={channelName}
              onChange={(e) =>
                setChannelName(
                  selectedChannelTypeOption.nameFormatter(e.target.value)
                )
              }
              labelText={resource.addGuildChannelDialog.channelNameInput.label}
              validator={(e) => channelNameValidator(e.target.value)}
              placeholder={
                resource.addGuildChannelDialog.channelNameInput.placeholder
              }
            />
          </Column>
          <Row className="justify-between items-center px-4 mr-0.5">
            <Row className="items-center">
              <Icon className="mr-1.5 text-lg" name={"lock"} />
              <span className="font-bold">
                {
                  resource.addGuildChannelDialog.channelPrivacyCheckboxLabel
                    .label
                }
              </span>
            </Row>
            <ToggleSwitchInput
              checked={isPrivate}
              onChange={(e) => setPrivacy(e.target.checked)}
            />
          </Row>
          <span className="px-4 text-sm font-semibold text-start">
            {
              resource.addGuildChannelDialog.channelPrivacyCheckboxLabel
                .description
            }
          </span>
          <Row
            className={twJoin(
              "justify-end w-full items-stretch p-4 gap-2",
              theme.colors.background.secondary
            )}
          >
            <Button
              className={twJoin(
                "text-sm p-2 font-semibold",
                theme.colors.text.base
              )}
              onClick={onClose}
            >
              {resource.addGuildChannelDialog.cancelButtonLabel}
            </Button>
            <Button
              className={twJoin(
                "p-2 text-sm rounded min-w-24 font-semibold",
                theme.colors.common.background.blurple,
                theme.colors.text.white
              )}
              type="submit"
            >
              {isPrivate
                ? resource.addGuildChannelDialog.confirmButtonLabels.next
                : resource.addGuildChannelDialog.confirmButtonLabels.create}
            </Button>
          </Row>
        </Column>
      </form>
    </Dialog.Container>
  );
}
