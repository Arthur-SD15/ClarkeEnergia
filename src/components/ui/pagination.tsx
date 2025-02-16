import { Button } from "./button";

interface PaginationProps {
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, onPageChange }: PaginationProps) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center items-center space-x-1 mt-4">
            {pageNumbers.map((number) => (
                <Button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className="bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200 transition-all duration-200"
                >
                    {number}
                </Button>
            ))}
        </div>
    );
};

export default Pagination;