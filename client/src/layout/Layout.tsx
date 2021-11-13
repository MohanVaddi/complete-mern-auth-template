import React, { Fragment, useContext } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import AppContext from '../context/AppContext';

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { state } = useContext(AppContext);
    const { isLoggedIn } = state.user;
    return (
        <Fragment>
            <Header />
            {children}
            <Footer />
        </Fragment>
    );
};
