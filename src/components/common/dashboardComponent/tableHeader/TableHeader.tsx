import React, {JSX} from 'react';

import "../dashboard/dashboard.scss"

type TableColumn = {
    label: string;
    isSortable?: boolean;
    customStyles?: React.CSSProperties;
    renderSortComponent?: () => JSX.Element;
};

type TableHeaderProps = {
    columns: TableColumn[];
};

export const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
    return (
        <thead>
        <tr className="column-names">
            {columns.map((column, index) => (
                <th key={index} style={column.customStyles}>
                    {column.isSortable && column.renderSortComponent ? (
                        column.renderSortComponent()
                    ) : (
                        column.label
                    )}
                </th>
            ))}
        </tr>
        </thead>
    );
};