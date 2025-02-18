import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


interface Supplier {
    id: string;
    name: string;
    logo: string;
    state: string;
    costPerKwh: number;
    minKwhLimit: number;
    totalClients: number;
    averageRating: number;
    createdAt: Date;
    updatedAt: Date;
}

interface DeleteSupplierModalProps {
    supplier: Supplier | null;
    closeModal: () => void;
    handleDelete: () => void;
}

const DeleteSupplierModal = ({ supplier, closeModal, handleDelete }: DeleteSupplierModalProps) => {
    const [confirmationText, setConfirmationText] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmationText(value);
        setIsFormValid(value === supplier?.name);
    };

    const handleConfirmDelete = () => {
        if (isFormValid && supplier) {
            handleDelete();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full relative">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                        Para confirmar a exclusão, digite o nome da fornecedora abaixo
                    </p>
                    <Input
                        type="text"
                        value={confirmationText}
                        onChange={handleInputChange}
                        placeholder={supplier?.name || "Nome da fornecedora"}
                    />
                    <div className="flex justify-between space-x-4 mt-3">
                        <Button type="button" variant="outline" onClick={closeModal}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            disabled={!isFormValid}
                            className={`px-6 py-2 rounded-lg text-sm text-white font-semibold ${
                                isFormValid
                                    ? "bg-red-500 hover:bg-red-600 transition-all duration-200"
                                    : "bg-gray-300 cursor-not-allowed"
                            }`}
                        >
                            Confirmar Exclusão
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteSupplierModal;
