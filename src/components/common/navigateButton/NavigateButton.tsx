import React, {MouseEventHandler} from 'react';

import "./navigateButton.scss"

type TNavigateButtonProps = {
    onNavigate?: MouseEventHandler<HTMLButtonElement> | undefined;
    children: string
}

export const NavigateButton: React.FC<TNavigateButtonProps> = (props) => {
    return (
        <div className={"navigate-button-container"}>
            <button onClick={props.onNavigate} className={"navigate-button"}>
                {props.children}
            </button>
        </div>
    );
}

