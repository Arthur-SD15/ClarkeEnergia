import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import { host } from '../../environmentConfig';

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

const MyConsumption = () => {
    const [consumption, setConsumption] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  
    const handleConsumptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConsumption(Number(e.target.value));
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

    return (
        <div id="my-consumption" className="dark:bg-black min-h-screen p-4 flex flex-col">
            <div className="w-full md:w-10/12 mx-auto mb-6 bg-[#2e2e2ed7] border-r-2 border-transparent rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-[#00e768] to-[#00c95e] group-hover:opacity-100 opacity-90 transition-opacity duration-300"></div>
                <h1 className="text-3xl font-bold italic text-center mt-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Fornecedores Disponíveis
                </h1>
                
                <p className="text-center mb-4 text-sm font-bold italic bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Informe a quantidade de kWh que você consome mensalmente e encontre as melhores opções disponíveis para você.
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-10/12 mx-auto">
                <div className="flex flex-col w-full md:w-10/12 relative">
                    <input
                        type="number"
                        value={consumption}
                        onChange={handleConsumptionChange}
                        placeholder="Informe o consumo (kWh)"
                        className="p-2 rounded-lg bg-[#232323d7] text-white focus:ring-2 focus:ring-white focus:outline-none w-full transition-all duration-200 opacity-90 hover:opacity-100"
                    />

                    {message && (
                        <p className="text-red-600 font-bold text-sm mt-2 md:absolute md:left-0 md:-bottom-6">
                            {message}
                        </p>
                    )}
                </div>
                
                <button
                    onClick={fetchSuppliers}
                    className="bg-[#00e768] text-white font-bold p-2 rounded-lg hover:bg-[#00c95e] focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-300 w-full md:w-32"
                >
                    Buscar
                </button>

                <button
                    onClick={() => {
                        setConsumption(0);
                        setMessage("");
                        setSuppliers([]);
                    }}
                    className="bg-red-600 text-white font-bold p-2 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-300 w-full md:w-32"
                >
                    Resetar
                </button>
            </div>

            <div className="w-full md:w-10/12 mx-auto mt-8">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-200 bg-[#232323d7] rounded-lg">
                        <thead className="text-sm text-white bg-[#2e2e2ed7]">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left">Fornecedora</th>
                                <th scope="col" className="px-6 py-3 text-center">Limite Minimo/kWh</th>
                                <th scope="col" className="px-6 py-3 text-center">Custo/kWh</th>
                                <th scope="col" className="px-6 py-3 text-right">Avaliação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-3 text-center text-gray-300 font-bold">
                                        Nenhum fornecedor disponível no momento.
                                    </td>
                                </tr>
                            ) : (
                                suppliers.map((supplier) => (
                                    <tr key={supplier.id} className="text-center hover:bg-[#18181888] transition-all duration-200">
                                        <td className="px-6 py-3 text-left">{supplier.name}</td>
                                        <td className="px-6 py-3 text-center">{supplier.minKwhLimit}</td>
                                        <td className="px-6 py-3 text-center">{supplier.costPerKwh}</td>
                                        <td className="px-6 py-3 text-right">
                                            <StarRatings rating={supplier.averageRating} starRatedColor="#00e768" numberOfStars={5} starDimension="20px" starSpacing="1px" />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
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
                theme="dark" 
            />
        </div>
    );
};

export default MyConsumption;