import React, { ReactNode, useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Button } from '@mui/material';
import SearchBar from './elements/SearchBar';
import LoginModal from './elements/LoginModal';
import { useGlobalContext } from '../general/globalContext';
import AccountDropdown from './elements/AccountDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { Login, Pets, ShoppingCart } from '@mui/icons-material';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { state } = useGlobalContext();
    const navigate = useNavigate();

    return (
        <>
            <AppBar component={'nav'} sx={{ position: 'sticky', backgroundColor: 'palevioletred' }}>
                <Toolbar>

                    <Button
                        sx={{ backgroundColor: 'white', color: 'black', margin: '2px'}}
                        onClick={() => navigate('/')}>
                        <Typography variant='h6' component='div' sx={{ mr: 2 }}>
                                Jonties
                        </Typography>
                        <Pets/>
                    </Button>

                    {/* <SearchBar /> removed due to time contraints*/}

                    <div style={{ flexGrow: 1 }} />
                    <Button
                        variant='outlined'
                        color='inherit'
                        onClick={() => { console.log(state) }}>
                        Debug state
                    </Button>
                    <Button
                        onClick={() => {navigate('/basket')}}
                        sx={{ backgroundColor: 'white', color: 'black', margin: '2px'}}>
                        <ShoppingCart />
                    </Button>
                    {Boolean(state.userId)
                        ? <AccountDropdown />
                        : <Button
                            variant='outlined'
                            onClick={() => setShowLoginModal(!showLoginModal)}
                            sx={{ backgroundColor: 'white', color: 'black', margin: '2px'}}>
                            <Login />
                        </Button>}
                </Toolbar>
            </AppBar>
            {showLoginModal &&
                <LoginModal onSuccess={() => setShowLoginModal(false)} />
            }
            <main>{children}</main>
        </>
    )
};

export default Layout;