import { useAuth } from "@/modules/auth/context";
import { Button, Column, Input } from "@/modules/common";
import { useLanguage } from "@/modules/language";
import { useTheme } from "@/modules/theme";
import { FormEvent, useState } from "react";
import { twJoin } from "tailwind-merge";

export function LoginPageContent() {
  const { signIn } = useAuth();
  const { resource } = useLanguage();
  const { theme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const didSucceed = await signIn({
      email: email,
      password: password,
    });

    didSucceed
      ? console.log("Conta acessada!")
      : console.log("Erro ao acessar conta.");
  }

  return (
    <div
      className={twJoin(
        "flex justify-center items-center w-full h-full",
        "bg-indigo-900"
      )}
    >
      <div
        className={twJoin(
          "md:w-3/5 h-min p-8 rounded-md",
          theme.colors.background.black
        )}
      >
        <form onSubmit={handleSubmit}>
          <Column className="justify-start items-stretch w-full gap-5">
            <Column className="items-stretch gap-1">
              <span
                className={twJoin(
                  "text-center font-bold text-2xl",
                  theme.colors.text.white
                )}
              >
                {resource.login.title}
              </span>
              <span className={twJoin("text-center", theme.colors.text.gray)}>
                {resource.login.subtitle}
              </span>
            </Column>
            <Column className="items-stretch gap-1">
              <span
                className={twJoin(
                  "text-start uppercase font-extrabold text-xs",
                  theme.colors.text.gray
                )}
              >
                {resource.login.emailInputLabel}
                <span className={"text-red-700 font-medium"}> *</span>
              </span>
              <Input
                className={twJoin(
                  theme.colors.background.highlightedBlack,
                  theme.colors.text.white,
                  "p-2"
                )}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Column>
            <Column className="items-stretch gap-0.5">
              <span
                className={twJoin(
                  "text-start uppercase font-extrabold text-xs",
                  theme.colors.text.gray
                )}
              >
                {resource.login.passwordInputLabel}
                <span className={"text-red-700 font-medium"}> *</span>
              </span>
              <Input
                className={twJoin(
                  theme.colors.background.highlightedBlack,
                  theme.colors.text.white,
                  "p-2 mt-0.5"
                )}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className={twJoin(
                  "text-start hover:underline",
                  theme.colors.text.link
                )}
                type="button"
              >
                <span className="text-sm font-medium">
                  {resource.login.forgotPasswordButtonLabel}
                </span>
              </Button>
            </Column>

            {/* Login Button */}
            <Column className="items-stretch gap-0.5">
              <Button
                type="submit"
                className={twJoin(
                  "text-center p-2.5 rounded",
                  theme.colors.common.background.blurple
                )}
              >
                <span className="font-semibold text-white">
                  {resource.login.logInButtonLabel}
                </span>
              </Button>
              <span
                className={twJoin("text-sm mt-1.5", theme.colors.text.gray)}
              >
                {resource.login.dontHaveAnAccount}
                <Button
                  className={twJoin(
                    "ml-2 hover:underline",
                    theme.colors.text.link
                  )}
                  type="button"
                >
                  <span className="text-sm font-medium">
                    {resource.login.signUpButtonLabel}
                  </span>
                </Button>
              </span>
            </Column>
          </Column>
        </form>
      </div>
    </div>
  );
}
