import React, {MouseEventHandler} from 'react';

import "./navigateButton.scss"
import {BackIcon} from "../../../assets/icons/BackIcon.tsx";


type TNavigateButtonProps = {
    onNavigate?: MouseEventHandler<HTMLButtonElement | HTMLDivElement> | undefined;
    children?: string
    isTableButton?: boolean
}

export const NavigateButton: React.FC<TNavigateButtonProps> = ({onNavigate, children, isTableButton}) => {
    return (
        <div className={"navigate-button-container"}>
            {isTableButton
                ?   <button onClick={onNavigate} className={"navigate-button"}>
                        {children}
                    </button>
                :   <div className={"navigate-button--back"} onClick={onNavigate}>
                        <BackIcon/>
                        Back
                    </div>
            }
        </div>
    );
}

