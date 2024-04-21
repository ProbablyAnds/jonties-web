import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductList from '../elements/BasketList';
import { useGlobalContext } from '../../general/globalContext';
import { Product } from '../../@types/product';
import { ShoppingCartCheckout } from '@mui/icons-material';
import { getOrdersById, makeOrder } from '../../general/apiHandler';
import OrdersList from '../elements/OrdersList';
import { Order } from '../../@types/order';

const OrdersPage = () => {
    const [ usersOrders, setUsersOrders ] = useState<Array<Order>>([]);
    const { dispatch, state } = useGlobalContext();
    

    useEffect(() => {
        const fetchOrders = async () => {
            setUsersOrders(await getOrdersById(state.userId, state.sessionToken));
        }

        fetchOrders();
    }, []);

    return (
        <Box
            sx={{
                //height: '100vh', // 100% of the viewport height
                width: '70%', // 70% of the viewport width
                marginX: 'auto', // Center horizontally
                backgroundColor: 'whitesmoke', // Use theme's primary color, customizable
                display: 'block',
                //alignItems: 'normal', // Center content vertically inside the box
                //justifyContent: 'center', // Center content horizontally inside the box
                boxSizing: 'border-box', // Includes padding and border in the element's total width and height
                padding: '3%',
                borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'
            }}
        >
            <h1>Orders</h1>
            <OrdersList orders={usersOrders}/>
        </Box>
    );
};

export default OrdersPage;