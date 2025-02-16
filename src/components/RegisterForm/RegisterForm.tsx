import { host } from "../../environmentConfig"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { ArrowLeft } from "lucide-react";
import axios, { AxiosError } from "axios"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loadingToast = toast.loading("Carregando...");

        if(birthday > new Date().toISOString().split('T')[0]) {
            toast.update(loadingToast, {
                render: "Data de nascimento inválida.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return;
        }

        if(!name || !surname || !email || !birthday || !password || !confirmPassword) {
            toast.update(loadingToast, {
                render: "Preencha todos os campos.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return;
        }

        if(password !== confirmPassword) {
            toast.update(loadingToast, {
                render: "As senhas não coincidem.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return;
        }

        if(password.length < 6) {
            toast.update(loadingToast, {
                render: "A senha deve conter no mínimo 6 caracteres.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return;
        }
    
        try {
            const response = await axios.post(
                `${host}/users`,
                {
                  name,
                  surname,
                  birthDate: new Date(birthday).toISOString(),
                  email,
                  password
                },
                {
                  headers: {
                    "Content-Type": "application/json"
                  }
                }
            );

            if(response.status === 201) {
                toast.update(loadingToast, {
                    render: "Cadastro realizado com sucesso!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                toast.update(loadingToast, {
                render: error.response.data.message || "Erro ao realizar cadastro.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
                });
            } else {
                toast.update(loadingToast, {
                    render: "Erro ao realizar cadastro.",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-1">
                    <form className="p-6 md:p-8" onSubmit={handleRegister}>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <ArrowLeft 
                                    className="cursor-pointer" 
                                    onClick={() => navigate("/")}
                                />
                                <h1 className="text-3xl font-extrabold italic tracking-tight font-[Neue Haas Grotesk] whitespace-pre-line break-words">
                                    <span className="text-gray-800">Clarke</span>
                                    <span className="text-[#00e768]">Energia</span>
                                </h1>
                            </div>
                           
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="surname">Sobrenome</Label>
                                    <Input
                                        id="surname"
                                        type="text"
                                        onChange={(e) => setSurname(e.target.value)}
                                        required
                                    />
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
                                    <Label htmlFor="birthday">Data de nascimento</Label>
                                    <Input
                                        id="birthday"
                                        type="date"
                                        onChange={(e) => setBirthday(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirmPassword">Confirmar senha</Label>
                                    <Input 
                                        id="confirmPassword" 
                                        type="password" 
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full">
                                Cadastrar-se
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
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
    )
}
