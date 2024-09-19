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
    <div className="flex justify-center items-center w-full h-full bg-blue-950">
      <div
        className={twJoin(
          "md:w-3/5 h-min p-8 rounded-md",
          theme.colors.focusBackground
        )}
      >
        <form onSubmit={handleSubmit}>
          <Column className="justify-start items-stretch w-full gap-5">
            <Column className="items-stretch gap-1">
              <span className="text-center font-bold text-2xl">
                {resource.login.title}
              </span>
              <span className="text-center font-semibold">
                {resource.login.subtitle}
              </span>
            </Column>
            <Column className="items-stretch gap-1">
              <span className="text-start uppercase font-bold text-xs">
                {resource.login.emailInputLabel}
              </span>
              <Input
                className={twJoin(theme.colors.foreground, "text-white p-2")}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Column>
            <Column className="items-stretch gap-0.5">
              <span className="text-start uppercase font-bold text-xs">
                {resource.login.passwordInputLabel}
              </span>
              <Input
                className={twJoin(
                  theme.colors.foreground,
                  "text-white p-2 mt-0.5"
                )}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="text-start text-blue-600 hover:underline"
                type="button"
              >
                <span className="text-sm font-semibold">
                  {resource.login.forgotPasswordButtonLabel}
                </span>
              </Button>
            </Column>

            {/* Login Button */}
            <Column className="items-stretch gap-0.5">
              <Button
                type="submit"
                className={twJoin("text-center p-2.5 rounded", "bg-blue-800")}
              >
                <span className="font-bold text-white">
                  {resource.login.logInButtonLabel}
                </span>
              </Button>
              <span className="text-sm mt-1.5">
                {resource.login.dontHaveAnAccount}
                <Button
                  className="ml-2 text-blue-600 hover:underline"
                  type="button"
                >
                  <span className="text-sm font-semibold">
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
