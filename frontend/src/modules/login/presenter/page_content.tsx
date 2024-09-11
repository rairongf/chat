import { useAuth } from "@/modules/auth/context";
import { Button, Column, Input } from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { FormEvent, useState } from "react";
import { twJoin } from "tailwind-merge";

export function LoginPageContent() {
  const { signIn } = useAuth();
  const { theme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log("E-mail:", email);
    console.log("Password:", password);

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
          theme.focusBackground
        )}
      >
        <form onSubmit={handleSubmit}>
          <Column className="justify-start items-stretch w-full gap-5">
            <Column className="items-stretch gap-1">
              <span className="text-center font-bold text-2xl">
                Boas-vindas de volta!
              </span>
              <span className="text-center font-semibold">
                Estamos muito animados em te ver novamente!
              </span>
            </Column>
            <Column className="items-stretch gap-1">
              <span className="text-start uppercase font-bold text-xs">
                E-mail *
              </span>
              <Input
                className={twJoin(theme.foreground, "text-white p-2")}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Column>
            <Column className="items-stretch gap-0.5">
              <span className="text-start uppercase font-bold text-xs">
                Senha *
              </span>
              <Input
                className={twJoin(theme.foreground, "text-white p-2 mt-0.5")}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="text-start text-blue-600 hover:underline"
                type="button"
              >
                <span className="text-sm font-semibold">Esqueceu a senha?</span>
              </Button>
            </Column>

            {/* Login Button */}
            <Column className="items-stretch gap-0.5">
              <Button
                type="submit"
                className={twJoin("text-center p-2.5 rounded", "bg-blue-800")}
              >
                <span className="font-bold text-white">Entrar</span>
              </Button>
              <span className="text-sm mt-1.5">
                Precisando de uma conta?
                <Button
                  className="ml-2 text-blue-600 hover:underline"
                  type="button"
                >
                  <span className="text-sm font-semibold">Registre-se</span>
                </Button>
              </span>
            </Column>
          </Column>
        </form>
      </div>
    </div>
  );
}
