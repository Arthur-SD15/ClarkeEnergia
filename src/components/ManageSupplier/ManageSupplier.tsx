import { useEffect, useState } from "react";
import { host } from "../../environmentConfig";
import { ToastContainer, toast } from "react-toastify";
import { Edit, Trash, Search } from "lucide-react";  
import axios from "axios";
import Pagination from "../ui/pagination";
import DeleteSupplierModal from "../Modals/DeleteSupplierModal";

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

const ManageSupplier = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalAction, setModalAction] = useState<"edit" | "delete" | "visualizar" | null>(null);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
    const itemsPerPage = 5;

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get(`${host}/suppliers`);
            setSuppliers(response.data);
        } catch (error) {
            console.error("Erro ao buscar fornecedores", error);
            toast.error("Erro ao buscar fornecedores");
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSuppliers = suppliers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(suppliers.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const openModal = (action: "edit" | "delete" | "visualizar", supplier: Supplier) => {
        setModalAction(action);
        setSelectedSupplier(supplier);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalAction(null);
        setSelectedSupplier(null);
    };

    const handleDelete = async () => {
        if (selectedSupplier) {
            try {
                await axios.delete(`${host}/suppliers/${selectedSupplier.id}`);
                setSuppliers(suppliers.filter(supplier => supplier.id !== selectedSupplier.id));
                toast.success("Fornecedor removido com sucesso!");
                closeModal();
            } catch (error) {
                console.error("Erro ao remover fornecedor", error);
                toast.error("Erro ao remover fornecedor");
            }
        }
    };

    return (
        <div className="bg-munted p-[5vh] flex flex-col">
            <div className="w-full mx-auto mt-8">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-800 bg-white rounded-lg border border-gray-200">
                        <thead className="text-sm text-gray-700 font-bold bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left">Fornecedora</th>
                                <th scope="col" className="px-6 py-3 text-center">Estado</th>
                                <th scope="col" className="px-6 py-3 text-center">Limite Minimo/kWh</th>
                                <th scope="col" className="px-6 py-3 text-center">Custo/kWh</th>
                                <th scope="col" className="px-6 py-3 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSuppliers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-3 text-center text-gray-500 font-bold">
                                        Nenhum fornecedor disponível no momento.
                                    </td>
                                </tr>
                            ) : (
                                currentSuppliers.map((supplier) => {
                                    return (
                                        <tr key={supplier.id} className="hover:bg-gray-50 transition-all duration-200">
                                            <td className="px-6 py-3 text-left flex items-center justify-start">
                                                <img
                                                    src={supplier.logo}
                                                    alt="Logo"
                                                    className="w-10 h-10 mr-2 md:w-8 md:h-8"
                                                />
                                                <span className="text-sm md:text-base">{supplier.name}</span>
                                            </td>
                                            <td className="px-6 py-3 text-center">{supplier.state}</td>
                                            <td className="px-6 py-3 text-center">{supplier.minKwhLimit}</td>
                                            <td className="px-6 py-3 text-center">R$ {supplier.costPerKwh}</td>
                                            <td className="px-6 py-3 text-right flex justify-end">
                                                <button 
                                                    onClick={() => openModal("edit", supplier)} 
                                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                                >
                                                    <Edit size={20} />
                                                </button>
                                                <button 
                                                    onClick={() => openModal("delete", supplier)} 
                                                    className="text-red-500 hover:text-red-700 mr-2"
                                                >
                                                    <Trash size={20} />
                                                </button>
                                                <button 
                                                    onClick={() => openModal("visualizar", supplier)} 
                                                    className="text-green-500 hover:text-green-700"
                                                >
                                                    <Search size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            {isModalOpen && modalAction === "delete" && (
                <DeleteSupplierModal
                    supplier={selectedSupplier}
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                />
            )}

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
};

export default ManageSupplier;
