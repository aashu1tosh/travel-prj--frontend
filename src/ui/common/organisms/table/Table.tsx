// Table.tsx
import React from 'react';
import './Table.css'; // Make sure this path is correct

interface TableProps<T> {
    headers: string[];
    data: T[];
    renderRow: (item: T) => React.ReactNode;
}

const Table = <T,>({ headers, data, renderRow }: TableProps<T>) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data &&
                    data?.map((item, index) => (
                        <tr key={index}>{renderRow(item)}</tr>
                    ))}
            </tbody>
        </table>
    );
};

export default Table;
