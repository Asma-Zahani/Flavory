
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination ({ currentPage, totalItems, itemsPerPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const generatePageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage === 1 || currentPage >= 2 ) pageNumbers.push(1);            
            if (currentPage > 3) pageNumbers.push("...");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }
            
            if (currentPage < totalPages - 2) pageNumbers.push("...");
            if (currentPage < totalPages - 1) pageNumbers.push(totalPages);
        }
        
        return pageNumbers;
    };

    const prevPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex items-center justify-center border-contentLight pt-3">
            {totalPages > 1 && 
                <nav className="items-center justify-center">
                    <ul className="flex items-center -space-x-px h-8 text-lg">
                        {currentPage > 1 && 
                            <li>
                                <button onClick={prevPage} className="flex items-center justify-center px-2 text-gray">
                                    <ChevronLeft size={15} />
                                </button>
                            </li>
                        }
                        {generatePageNumbers().map((number, index) => (
                            <li key={index}>
                                {number === "..." ? (
                                    <span className="px-3 h-8 text-gray">...</span>
                                ) : (
                                    <button 
                                        onClick={() => onPageChange(number)}
                                        className={`flex items-center px-3 h-8 ${currentPage === number ? 'text-primary' : 'text-gray'}`}
                                    >
                                        {number}
                                    </button>
                                )}
                            </li>
                        ))}
                        {currentPage < totalPages &&
                            <li>
                                <button onClick={nextPage} className="flex items-center justify-center px-3 h-8 text-gray">
                                    <ChevronRight size={15} />
                                </button>
                            </li>
                        }
                    </ul>
                </nav>
            }
        </div>
    );
};
