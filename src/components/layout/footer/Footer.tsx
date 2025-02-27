import React from 'react';

import "./footer.scss"

type TFooterProps = {

}

export const Footer: React.FC<TFooterProps> = ({}) => {
    return (
        <footer className={'footer-container'}>
            <p>© 2024 Barsegyan Erik. All rights reserved.</p>
        </footer>
    );
}

