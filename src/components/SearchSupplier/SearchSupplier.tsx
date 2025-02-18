import { host } from '../../environmentConfig';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '../ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Input } from '../ui/input';
import { Supplier } from '../../types/interfaces';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import Pagination from '../ui/pagination';

const SearchSupplier = () => {
    const [savedSuppliers, setSavedSuppliers] = useState<Supplier[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [consumption, setConsumption] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    const toggleSavedSupplier = (supplier: Supplier) => {
        const isAlreadySaved = savedSuppliers.some(saved => saved.id === supplier.id);
    
        if (isAlreadySaved) {
            setSavedSuppliers(savedSuppliers.filter(saved => saved.id !== supplier.id));
            toast.info(`${supplier.name} foi removido dos salvos.`);
        } else {
            setSavedSuppliers([...savedSuppliers, supplier]);
            toast.success(`${supplier.name} foi adicionado aos salvos.`);
        }
    };

    const fetchSuppliers = async () => {
        if (consumption <= 0) {
            setMessage("Informe um valor válido para o consumo");
            toast.error("Informe um valor válido para o consumo");
            return;
        }
    
        const loadingToast = toast.loading("Carregando fornecedores...");
    
        try {
            const response = await axios.get(`${host}/suppliers/by-consumption`, {
                params: { consumption }
            });
    
            setSuppliers(response.data);
    
            toast.update(loadingToast, {
                render: "Fornecedores carregados!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
    
        } catch (error) {
            console.error("Erro ao buscar fornecedores", error);
            toast.update(loadingToast, {
                render: "Erro ao buscar fornecedores",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSuppliers = suppliers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(suppliers.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-munted p-[5vh] flex flex-col">
            <div
                className="w-full mx-auto mb-6 border-r-4 border-transparent rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                    borderRightColor: '#00e768',
                }}
            >
                <h1 className="text-3xl font-bold italic text-center mt-4 text-white">
                    Fornecedores Disponíveis
                </h1>

                <p className="text-center mb-4 text-sm font-bold italic text-white">
                    Informe a quantidade de kWh que você consome mensalmente e encontre as melhores opções disponíveis para você.
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 w-full mx-auto">
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 w-full">
                    <div className="flex flex-col w-full md:w-10/12 relative">       
                        <Input
                            type="number"
                            value={consumption}
                            onChange={(e) => setConsumption(Number(e.target.value))}
                            placeholder="Informe o consumo (kWh)"
                        />
                        {message && (
                            <p className="text-red-600 font-bold text-sm mt-2 md:absolute md:left-0 md:-bottom-6">
                                {message}
                            </p>
                        )}
                    </div>
                    
                    <Button
                        onClick={fetchSuppliers}
                        className="w-full md:w-1/12"
                    >
                        Buscar
                    </Button>

                    <Button
                        onClick={() => {
                            setConsumption(0);
                            setMessage("");
                            setSuppliers([]);
                        }}
                        type="button"
                        variant="outline"
                        className="w-full md:w-1/12"
                    >
                        Resetar
                    </Button>
                </div>
            </div>

            <div className="w-full mx-auto mt-8">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-800 bg-white rounded-lg border border-gray-200">
                        <thead className="text-sm text-gray-700 font-bold bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left">Fornecedora</th>
                                <th scope="col" className="px-6 py-3 text-center">Limite Minimo/kWh</th>
                                <th scope="col" className="px-6 py-3 text-center">Custo/kWh</th>
                                <th scope="col" className="px-6 py-3 text-center">Avaliação</th>
                                <th scope="col" className="px-6 py-3 text-right">Salvar</th>
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
                                    const isSaved = savedSuppliers.some(saved => saved.id === supplier.id);

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
                                            <td className="px-6 py-3 text-center">{supplier.minKwhLimit}</td>
                                            <td className="px-6 py-3 text-center">R$ {supplier.costPerKwh}</td>
                                            <td className="px-6 py-3 text-center">
                                                <StarRatings rating={supplier.averageRating} starRatedColor="#fbbf24" numberOfStars={5} starDimension="20px" starSpacing="1px" />
                                            </td>
                                            <td className="px-6 py-3 text-right">
                                                <button
                                                    onClick={() => toggleSavedSupplier(supplier)}
                                                    className="p-2 rounded-lg focus:ring-2 focus:outline-none transition duration-300 hover:bg-gray-100"
                                                >
                                                    {isSaved ? (
                                                        <BookmarkCheck className="w-6 h-6 text-green-600" />
                                                    ) : (
                                                        <Bookmark className="w-6 h-6 text-gray-500 hover:text-green-600" />
                                                    )}
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

export default SearchSupplier;
