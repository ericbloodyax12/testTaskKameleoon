import React from 'react';
import {sortTestsByType} from "../../../../pages/DashboardPage/helper/sortTestsByType.ts";
import {SortIcon} from "../../../../assets/icons/SortIcon.tsx";
import {Test} from "../../../../services/api.ts";

import "./sortColumn.scss"

type TSortColumnProps = {
    setDirection: (value: React.SetStateAction<"asc" | "desc">) => void;
    setTests: (value: React.SetStateAction<Test[]>) => void;
    filteredTests: Test[];
    direction: "asc" | "desc"
}

export const SortColumn: React.FC<TSortColumnProps> = ({setDirection,setTests,filteredTests,direction}) => {
    return (
        <div className={"sortColumn-div-container"}>
            Type
            <div
                style={{cursor: "pointer"}} onClick={() => {
                setDirection((prevState) => prevState === "asc" ? "desc" : "asc")
                setTests(sortTestsByType(filteredTests, direction))
            }}><SortIcon/></div>
        </div>
    );
}

