import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import BasketPage from './pages/BasketPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';


const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/' element={<HomePage/>} />
                    <Route path='/basket' element={<BasketPage/>} />
                    <Route path='/product/:id' element={<ProductPage/>} />
                    <Route path='/account' element={<ProfilePage/>} />
                    <Route path='/orders' element={<OrdersPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
;}

export default Router;