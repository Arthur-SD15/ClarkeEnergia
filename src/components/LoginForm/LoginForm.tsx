import { host } from "../../environmentConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNavigate = () => {
    navigate("/register");
  }

  const handleGoogleLogin = async () => {
    window.location.href = `${host}/auth/google`;
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem("token", token);
      navigate("/home");
    } else {
      console.error("Token não encontrado.");
    }
  }, [navigate]);

  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loadingToast = toast.loading("Carregando...");

    if(!email || !password) {
      toast.update(loadingToast, {
        render: "Preencha todos os campos.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });

      return;
    }
    
    try {
      const response = await axios.post(
        `${host}/auth/login`,
        { 
          email, 
          password 
        },
        { 
          headers: { 
            "Content-Type": "application/json" 
          } 
        }
      );
  
      if (response.status === 201) {
        console.log(response.data);
        localStorage.setItem("token", response.data.access_token);
        toast.update(loadingToast, {
          render: "Login realizado com sucesso!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.update(loadingToast, {
          render: error.response.data.message || "Erro ao realizar login.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(loadingToast, {
          render: "Erro ao realizar login.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  return (
    // @ts-expect-error: This component accepts a dynamic className which TypeScript cannot infer properly.
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form className="grid gap-6" onSubmit={handleEmailLogin}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Entre com seu e-mail abaixo para se autenticar
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="arthur@example.com" 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input 
            onChange={(e) => setPassword(e.target.value)}
            id="password" 
            type="password" 
            required 
          />
        </div>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-muted px-2 text-muted-foreground">
          Ou continuar com
        </span>
      </div>
      <Button 
        onClick={handleGoogleLogin}
        variant="outline" 
        className="w-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
        Entrar com Google
      </Button>
      <div className="text-center text-sm">
        Não possui conta?{" "}
        <button
          onClick={handleNavigate}
          className="underline underline-offset-4"
        >
          Criar Conta
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
      />
    </div>
  );
}
