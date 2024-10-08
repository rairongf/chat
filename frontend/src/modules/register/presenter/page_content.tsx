import { Button, CheckboxInput, Column, Input, Row } from "@/modules/common";
import { useLanguage } from "@/modules/language";
import { useTheme } from "@/modules/theme";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { twJoin } from "tailwind-merge";
import { useRegister } from "../context";
import { RegisterInputWithLabel } from "./input_with_label";

export function RegisterPageContent() {
  const router = useRouter();
  const { resource } = useLanguage();
  const { theme } = useTheme();
  const { signUp } = useRegister();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newsletter, setNewsletter] = useState<boolean>(false);

  // Birthday
  const maximumYear = new Date().getFullYear() - 10;
  const [day, setDay] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();
  const birthday =
    year && month && day ? new Date(year, month - 1, day) : undefined;
  const [birthdayError, setBirthdayError] = useState<string>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errors = [
      emailValidator(email),
      nameValidator(name),
      usernameValidator(username),
      passwordValidator(password),
      birthdayValidator(birthday),
    ].filter((err) => err != undefined);
    if (errors.length > 0) {
      console.log("Fix form errors");
      return;
    }

    signUp({
      email,
      birthday: birthday!,
      password,
      username,
      name,
      newsletter,
    });
  }

  function emailValidator(value: string | undefined): string | undefined {
    if (!value || value.length == 0) {
      return resource.register.emailInput.missingEmail;
    }

    return;
  }

  function nameValidator(value: string | undefined): string | undefined {
    if (value?.includes("$@#!%\\/¨&*(){}[]")) {
      return resource.register.nameInput.invalidName;
    }

    return;
  }

  function usernameValidator(value: string | undefined): string | undefined {
    if (!value || value.length == 0) {
      return resource.register.usernameInput.missingUsername;
    }

    return;
  }

  function passwordValidator(value: string | undefined): string | undefined {
    if (!value || value.length == 0) {
      return resource.register.passwordInput.missingPassword;
    }

    return;
  }

  function birthdayValidator(value: Date | undefined): string | undefined {
    if (!value) {
      setBirthdayError(resource.register.birthdayInput.missingBirthday);
      return resource.register.birthdayInput.missingBirthday;
    }

    const now = new Date();
    const minimumDate = new Date(now.getFullYear() - 120, 0, 1);
    if (value.getTime() < minimumDate.getTime()) {
      setBirthdayError(resource.register.birthdayInput.invalidBirthday);
      return resource.register.birthdayInput.invalidBirthday;
    }

    setBirthdayError(undefined);
    return;
  }

  const inputClassName = twJoin(theme.colors.text.white);
  const inputRowClassName = twJoin(theme.colors.background.highlightedBlack);

  return (
    <div
      className={twJoin(
        "flex justify-center items-center w-full h-full",
        "bg-indigo-900"
      )}
    >
      <div
        className={twJoin(
          "sm:w-[30rem] w-full h-min p-8 rounded-md",
          theme.colors.background.black
        )}
      >
        <form onSubmit={handleSubmit}>
          <Column className="justify-start items-stretch w-full gap-5">
            <h2
              className={twJoin(
                theme.colors.text.white,
                "font-bold text-xl text-center"
              )}
            >
              {resource.register.title}
            </h2>

            <RegisterInputWithLabel
              label={resource.register.emailInput.label}
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              validator={(e) => emailValidator(e.target.value)}
              className={inputClassName}
              rowProps={{
                className: inputRowClassName,
              }}
            />
            <RegisterInputWithLabel
              label={resource.register.nameInput.label}
              value={name}
              onChange={(e) => setName(e.target.value)}
              validator={(e) => nameValidator(e.target.value)}
              className={inputClassName}
              rowProps={{
                className: inputRowClassName,
              }}
            />
            <RegisterInputWithLabel
              label={resource.register.usernameInput.label}
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              validator={(e) => usernameValidator(e.target.value)}
              className={inputClassName}
              rowProps={{
                className: inputRowClassName,
              }}
            />
            <RegisterInputWithLabel
              label={resource.register.passwordInput.label}
              type="password"
              value={password}
              obscureText
              required
              onChange={(e) => setPassword(e.target.value)}
              validator={(e) => passwordValidator(e.target.value)}
              className={inputClassName}
              rowProps={{
                className: inputRowClassName,
              }}
            />
            <Column className="items-stretch gap-1">
              <span
                className={twJoin(
                  "text-start uppercase font-extrabold text-xs",
                  theme.colors.text.gray
                )}
              >
                {resource.register.birthdayInput.label}
                <span className={"text-red-700 font-medium"}> *</span>
              </span>
              <Row className="gap-2 w-full max-w-full">
                <Input
                  value={day}
                  min={1}
                  max={31}
                  required
                  onChange={(e) => {
                    const value = new Number(e.target.value) as number;
                    if (isNaN(value)) return;
                    if (value > 31) {
                      setDay(31);
                      return;
                    }
                    setDay(value);
                  }}
                  //validator={() => birthdayValidator(birthday)}
                  className={twJoin(inputClassName, "w-full")}
                  rowProps={{
                    className: inputRowClassName,
                  }}
                />
                <Input
                  value={month}
                  min={1}
                  max={12}
                  required
                  onChange={(e) => {
                    const value = new Number(e.target.value) as number;
                    if (isNaN(value)) return;
                    if (value > 12) {
                      setMonth(12);
                      return;
                    }

                    setMonth(value);
                  }}
                  //validator={() => birthdayValidator(birthday)}
                  className={twJoin(inputClassName, "w-full")}
                  rowProps={{
                    className: inputRowClassName,
                  }}
                />
                <Input
                  value={year}
                  min={maximumYear - 120}
                  max={maximumYear}
                  required
                  onChange={(e) => {
                    const value = new Number(e.target.value) as number;
                    if (isNaN(value)) return;
                    if (value > maximumYear) {
                      setYear(maximumYear);
                      return;
                    }

                    setYear(value);
                  }}
                  //validator={() => birthdayValidator(birthday)}
                  className={twJoin(inputClassName, "w-full")}
                  rowProps={{
                    className: inputRowClassName,
                  }}
                />
              </Row>
              {birthdayError && (
                <span
                  className={twJoin(
                    "text-start font-semibold text-xs",
                    "text-rose-400"
                  )}
                >
                  {birthdayError}
                </span>
              )}
            </Column>
            <Row className="gap-2 items-center">
              <CheckboxInput
                sizeStyle="h-6"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
              />
              <span className={twJoin(theme.colors.text.gray, "text-xs")}>
                {resource.register.newsletterOptionLabel}
              </span>
            </Row>
            <Column>
              <Button
                type="submit"
                className={twJoin(
                  "py-2 px-4 font-bold rounded",
                  theme.colors.text.white,
                  theme.colors.common.background.blurple
                )}
              >
                {resource.register.submitButtonLabel}
              </Button>
              <span className={twJoin("text-xs mt-1", theme.colors.text.gray)}>
                {resource.register.useTermsAndPrivacyPolicy.partOne}
                <Button
                  className={twJoin("hover:underline", theme.colors.text.link)}
                >
                  {
                    resource.register.useTermsAndPrivacyPolicy
                      .useTermsInlineButtonLabel
                  }
                </Button>
                {resource.register.useTermsAndPrivacyPolicy.partTwo}
                <Button
                  className={twJoin("hover:underline", theme.colors.text.link)}
                >
                  {
                    resource.register.useTermsAndPrivacyPolicy
                      .privacyPolicyInlineButtonLabel
                  }
                </Button>
                {resource.register.useTermsAndPrivacyPolicy.partThree}
              </span>
            </Column>
            <Button
              className={twJoin(
                "text-sm text-start hover:underline",
                theme.colors.text.link
              )}
              onClick={() => router.replace("/login")}
            >
              {resource.register.alreadyHasAnAccountButtonLabel}
            </Button>
          </Column>
        </form>
      </div>
    </div>
  );
}
