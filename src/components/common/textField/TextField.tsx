import React from 'react';
import {SearchIcon} from "../../../assets/icons/SearchIcon.tsx";

import './textField.scss'
type TTextFieldProps = {
    filter: string;
    setFilter:  React.Dispatch<React.SetStateAction<string>>
}

export const TextField: React.FC<TTextFieldProps> = ({filter,setFilter}) => {
    return (
        <div className={"inputContainer"}>
            <SearchIcon className={"search-icon"}/>
            <input
                type="text"
                placeholder="What test are you looking for?"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={'textField'}
            />
            <div>
                {}
            </div>
        </div>
    );
}

