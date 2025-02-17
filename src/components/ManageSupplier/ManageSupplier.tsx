import { useEffect, useState } from "react";
import { host } from "../../environmentConfig";
import { ToastContainer, toast } from "react-toastify";
import { Edit, Trash, ChevronDown, ChevronUp } from "lucide-react";  
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { AxiosError } from 'axios';
import axios from "axios";
import Pagination from "../ui/pagination";
import DeleteSupplierModal from "../Modals/DeleteSupplierModal";
import CreateSupplierModal from "../Modals/CreateSupplierModal";

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
    const [modalAction, setModalAction] = useState<"edit" | "delete" | "visualizar" | "create" | null>(null);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const itemsPerPage = 5;

    const [filterName, setFilterName] = useState<string>("");
    const [filterState, setFilterState] = useState<string>("");
    const [filterAverageRating, setFilterAverageRating] = useState<string>("");
    const [filterCostPerKwh, setFilterCostPerKwh] = useState<string>("");
    const [filterMinKwhLimit, setFilterMinKwhLimit] = useState<string>("");
    const [filterTotalClients, setFilterTotalClients] = useState<string>("");

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get(`${host}/suppliers`);
            setSuppliers(response.data);
        } catch (error) {
            console.error("Erro ao buscar fornecedores", error);
            toast.error("Erro ao buscar fornecedores");
        }
    };

    const filterSuppliers = async () => {
        try {
            const response = await axios.get(`${host}/suppliers`, {
                params: {
                    name: filterName,
                    state: filterState,
                    averageRating: filterAverageRating,
                    costPerKwh: filterCostPerKwh,
                    minKwhLimit: filterMinKwhLimit,
                    totalClients: filterTotalClients,
                }
            });
            setSuppliers(response.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response && error.response.status === 400) {
                    console.error("Erro de requisição inválida", error.response.data.message);
                    toast.error(error.response.data.message || "Erro ao buscar fornecedores");
                }
            } else {
                console.error("Erro desconhecido", error);
                toast.error("Erro ao buscar fornecedores");
            }
        }
    }

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

    const openModal = (action: "edit" | "delete" | "visualizar" | "create", supplier: Supplier | null) => {
        setModalAction(action);
        setSelectedSupplier(supplier);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalAction(null);
        setSelectedSupplier(null);
    };

    const handleCreateSupplier = async (
        name: string,
        logo: string,
        state: string,
        costPerKwh: number,
        minKwhLimit: number,
        totalClients: number,
        averageRating: number
    ) => {
        const loadingToast = toast.loading("Carregando...");

        if (!name || !logo || !state || !costPerKwh || !minKwhLimit || !totalClients || !averageRating) {
            toast.update(loadingToast, {
                render: "Preencha todos os campos.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return;
        }

        if (!logo.endsWith(".png") && !logo.endsWith(".jpg")) {
            toast.update(loadingToast, {
                render: "URL da logo inválida.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return;
        }

        if (averageRating < 1 || averageRating > 5) {
            toast.update(loadingToast, {
                render: "Avaliação inválida.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return;
        }

        if (totalClients < 0) {
            toast.update(loadingToast, {
                render: "Total de clientes inválido.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return;
        }

        if (minKwhLimit < 0 || costPerKwh < 0) {
            toast.update(loadingToast, {
                render: "Valor inválido.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return;
        }
        
        try {
            await axios.post(`${host}/suppliers`, {
                name,
                logo,
                state,
                costPerKwh,
                minKwhLimit,
                totalClients,
                averageRating,
            });
            
            toast.update(loadingToast, {
                render: "Fornecedor criado com sucesso!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
    
            fetchSuppliers();
            closeModal();
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response && error.response.status === 400) {
                    console.error("Erro de requisição inválida", error.response.data.message);
                    toast.update(loadingToast, {
                        render: error.response.data.message || "Erro ao criar fornecedor",
                        type: "error",
                        isLoading: false,
                        autoClose: 3000,
                    });
                    return;
                }
            }
            console.error("Erro desconhecido", error);
            toast.update(loadingToast, {
                render: "Erro ao criar fornecedor",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    }

    const handleDelete = async () => {
        if (selectedSupplier) {
            const loadingToast = toast.loading("Removendo fornecedor...");
    
            try {
                await axios.delete(`${host}/suppliers/${selectedSupplier.id}`);
                setSuppliers(suppliers.filter(supplier => supplier.id !== selectedSupplier.id));
                
                toast.update(loadingToast, {
                    render: "Fornecedor removido com sucesso!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
    
                closeModal();
            } catch (error) {
                console.error("Erro ao remover fornecedor", error);
                
                toast.update(loadingToast, {
                    render: "Erro ao remover fornecedor.",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        }
    };

    const handleResetFilters = () => {
        setFilterName("");
        setFilterState("");
        setFilterAverageRating("");
        setFilterCostPerKwh("");
        setFilterMinKwhLimit("");
        setFilterTotalClients("");
        fetchSuppliers();
    };

    return (
        <div className="bg-munted p-[5vh] flex flex-col">
            <div className="w-full mx-auto">
                <div className="bg-white mb-4 p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)} 
                            />
                        </div>
                        <div>
                            <Label htmlFor="state">Estado</Label>
                            <Input
                                id="state"
                                type="text"
                                name="state"
                                value={filterState}
                                onChange={(e) => setFilterState(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="averageRating">Avaliação Média Mínima</Label>
                            <Input
                                id="averageRating"
                                type="number"
                                name="averageRating"
                                value={filterAverageRating}
                                onChange={(e) => setFilterAverageRating(e.target.value)}
                            />
                        </div>

                        {showAdvancedFilters && (
                            <>
                                <div>
                                    <Label htmlFor="costPerKwh">Custo por kWh Máximo</Label>
                                    <Input
                                        id="costPerKwh"
                                        type="number"
                                        name="costPerKwh"
                                        value={filterCostPerKwh}
                                        onChange={(e) => setFilterCostPerKwh(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="minKwhLimit">Limite Mínimo de kWh</Label>
                                    <Input
                                        id="minKwhLimit"
                                        type="number"
                                        name="minKwhLimit"
                                        value={filterMinKwhLimit}
                                        onChange={(e) => setFilterMinKwhLimit(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="totalClients">Total de Clientes</Label>
                                    <Input
                                        id="totalClients"
                                        type="number"
                                        name="totalClients"
                                        value={filterTotalClients}
                                        onChange={(e) => setFilterTotalClients(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                            className="flex items-center gap-2"
                        >
                            {showAdvancedFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            {showAdvancedFilters ? "Ocultar Filtros" : "Filtros Avançados"}
                        </Button>
                        <div className="flex gap-2">
                            <Button 
                                onClick={filterSuppliers}
                            >
                                Filtrar
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleResetFilters}
                            >
                                Resetar
                            </Button>
                            <Button
                                type="button"
                                onClick={() => openModal("create", null)}
                            >
                                Criar Fornecedor
                            </Button>
                        </div>
                    </div>
                </div>

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

            {isModalOpen && modalAction === "create" && (
                <CreateSupplierModal
                    closeModal={closeModal}
                    handleCreateSupplier={handleCreateSupplier}
                />
            )}

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
