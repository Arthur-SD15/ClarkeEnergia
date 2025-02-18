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

interface Estado {
    nome: string;
    sigla: string;
}

export type { Supplier, Estado };