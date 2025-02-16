
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Deslogando...");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <h1 className="text-3xl font-extrabold italic tracking-tight font-[Neue Haas Grotesk] whitespace-pre-line break-words">
          <span className="text-gray-900">Clarke</span>
          <span className="text-[#00e768]">Energia</span>
        </h1>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-900 dark:text-gray-400 border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Administradores
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleLogout}>
            <LogOut className="h-6 w-6 text-gray-900 dark:text-gray-400" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
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
    </header>
  );
}

export default Header;
