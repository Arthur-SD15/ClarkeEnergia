
import { LoginForm } from "../components/LoginForm/LoginForm"
import ImageClarke from "../components/ImageClarke/ImageClarke"

const Login = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-muted">
      <div className="relative hidden bg-muted lg:block">
        <ImageClarke />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 lg:hidden">
          <h1 className="text-3xl font-extrabold italic tracking-tight font-[Neue Haas Grotesk] whitespace-pre-line break-words">
            <span className="text-gray-200">Clarke</span>
            <span className="text-[#00e768]">Energia</span>
          </h1>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
