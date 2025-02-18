import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Supplier } from "../../types/interfaces";
import { estados } from "../../data/estados";

interface EditSupplierModalProps {
    closeModal: () => void;
    handleEditSupplier: (name: string, logo: string, state: string, costPerKwh: number, minKwhLimit: number, totalClients: number, averageRating: number) => void;
    supplier: Supplier | null;
}

const EditSupplierModal = ({ closeModal, handleEditSupplier, supplier }: EditSupplierModalProps) => {
    const [name, setName] = useState("");
    const [logo, setLogo] = useState("");
    const [state, setState] = useState("");
    const [costPerKwh, setCostPerKwh] = useState(0);
    const [minKwhLimit, setMinKwhLimit] = useState(0);
    const [totalClients, setTotalClients] = useState(0);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        if (supplier) {
            setName(supplier.name);
            setLogo(supplier.logo);
            setState(supplier.state);
            setCostPerKwh(supplier.costPerKwh);
            setMinKwhLimit(supplier.minKwhLimit);
            setTotalClients(supplier.totalClients);
            setAverageRating(supplier.averageRating);
        }
    }, [supplier]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl py-8">
                <h2 className="text-xl font-bold mb-6">Editar Fornecedor</h2>
                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div>
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="logo">Logo URL</Label>
                            <Input
                                id="logo"
                                type="text"
                                value={logo}
                                onChange={(e) => setLogo(e.target.value)}
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="state">Estado</Label>
                            <select
                                id="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Selecione um estado</option>
                                {estados.map((estado) => (
                                    <option key={estado.sigla} value={estado.sigla}>
                                        {estado.nome} ({estado.sigla})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="costPerKwh">Custo por kWh</Label>
                            <Input
                                id="costPerKwh"
                                type="number"
                                value={costPerKwh}
                                onChange={(e) => setCostPerKwh(Number(e.target.value))}
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="minKwhLimit">Limite Mínimo de kWh</Label>
                            <Input
                                id="minKwhLimit"
                                type="number"
                                value={minKwhLimit}
                                onChange={(e) => setMinKwhLimit(Number(e.target.value))}
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="totalClients">Total de Clientes</Label>
                            <Input
                                id="totalClients"
                                type="number"
                                value={totalClients}
                                onChange={(e) => setTotalClients(Number(e.target.value))}
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="averageRating">Avaliação Média</Label>
                            <Input
                                id="averageRating"
                                type="number"
                                value={averageRating}
                                onChange={(e) => setAverageRating(Number(e.target.value))}
                                className="w-full"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-8">
                        <Button type="button" variant="outline" onClick={closeModal}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => handleEditSupplier(name, logo, state, costPerKwh, minKwhLimit, totalClients, averageRating)}
                        >
                            Salvar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSupplierModal;