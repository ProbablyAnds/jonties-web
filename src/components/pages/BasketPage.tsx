import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import ProductList from '../elements/BasketList';
import { useGlobalContext } from '../../general/globalContext';
import { Product } from '../../@types/product';
import { ShoppingCartCheckout } from '@mui/icons-material';
import { makeOrder } from '../../general/apiHandler';

const BasketPage = () => {
  const { dispatch, state } = useGlobalContext();

  const removeFromBasket = (product: Product) => {
    dispatch({ type: 'REMOVE_FROM_BASKET', payload: product.productId });
  }
  
  const tryMakeOrder = async () => {
    const result = await makeOrder(state.userId, state.currentBasket, state.sessionToken);

    if(result.status === 200)
      {
        dispatch({ type: 'CLEAR_BASKET' });
        alert("Your order was placed!");
      }
    
  }

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
        <h1>Basket</h1>
        <ProductList products={state.currentBasket?? []} removeFromBasket={removeFromBasket} isBasket={true}/>
        <Button
          sx={{backgroundColor: "orange", color: "white", marginTop: "10px"}}
          onClick={() => {tryMakeOrder()}}>
          <ShoppingCartCheckout fontSize='large'/>
        </Button>
      </Box>
  );
};

export default BasketPage;