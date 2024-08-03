import { PaginationInterface } from '@interface/global.interface';
import React from 'react';
import './Pagination.css';

interface PaginationProps {
    pagination: PaginationInterface;
    setTotalPages: React.Dispatch<React.SetStateAction<PaginationInterface>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const Pagination: React.FC<PaginationProps> = ({
    pagination,
    setTotalPages,
    setRefresh,
}) => {
    const { totalPages, currentPage } = pagination;

    const handleClick = (pageNumber: number) => {
        setTotalPages({ ...pagination, currentPage: pageNumber });
        setRefresh((prev) => !prev);
    };

    const perPageClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const perPage = parseInt(e.target.value, 10);

        setTotalPages({ ...pagination, perpage: perPage });
        setTimeout(() => setRefresh((prev) => !prev), 1800);
    };

    const getPaginationItems = () => {
        const pages: number[] = [];

        const addPage = (page: number) => {
            if (!pages.includes(page)) {
                pages.push(page);
            }
        };

        addPage(1);

        // Show pages around the current page
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 1 && i < totalPages) {
                addPage(i);
            }
        }

        addPage(totalPages); // Always show the last page

        // Add ... if there are gaps
        const pagesWithEllipsis: (number | string)[] = [];
        for (let i = 0; i < pages.length; i++) {
            if (i > 0 && pages[i] !== pages[i - 1] + 1) {
                pagesWithEllipsis.push('...');
            }
            pagesWithEllipsis.push(pages[i]);
        }

        return pagesWithEllipsis;
    };

    return (
        <div className='pagination'>
            <div className='per-page'>
                <input
                    type='number'
                    value={pagination?.perpage}
                    onChange={(e) => perPageClick(e)}
                />
                <h4>Perpage</h4>
            </div>

            <div className='pagination-row'>
                {getPaginationItems().map((pageNumber, index) => (
                    <span
                        key={index}
                        onClick={() =>
                            pageNumber !== '...' &&
                            handleClick(pageNumber as number)
                        }
                        className={
                            pageNumber === currentPage
                                ? 'underline-site-color margin-15'
                                : 'margin-15'
                        }
                    >
                        {pageNumber}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
