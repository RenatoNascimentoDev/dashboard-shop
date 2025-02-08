import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  async function handleSignUp(data: SignUpForm) {
    try {
      console.log(data);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Enviamos um link de autenticação para seu e-mail.", {
        action: {
          label: "Login",
          onClick: () => navigate("/sign-in"),
        },
      });
    } catch {
      toast.error("Erro ao cadastrar restaurante.");
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild>
          <Link to="/sign-in" className="absolute right-4 top-8">
            Fazer login
          </Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6"></div>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro e comece suas vendas!
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
            <Input
              id="restaurantName"
              type="text"
              {...register("restaurantName")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input id="managerName" type="text" {...register("managerName")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="e-mail" {...register("email")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Seu celular</Label>
            <Input id="phone" type="tel" {...register("phone")} />
          </div>

          <Button disabled={isSubmitting} className="w-full" type="submit">
            Finalizar cadastro
          </Button>

          <p className="px-6 tex-center text-sm leading-relaxed text-muted-foreground">
            Ao continuar, você concorda com nossos{" "}
            <a className="underline underline-offset-4" href="">
              termos de serviços
            </a>{" "}
            e{" "}
            <a className="underline underline-offset-4" href="">
              politicas de privacidade
            </a>
            .
          </p>
        </form>
      </div>
    </>
  );
}
