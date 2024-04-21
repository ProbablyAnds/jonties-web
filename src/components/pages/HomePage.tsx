import React, { useEffect, useState } from 'react';
import { Grid, Card, Box, Button } from '@mui/material';
import ProductCard from '../elements/ProductCard';
import { getProducts, makeOrder } from '../../general/apiHandler';
import '../../App.css';
import ProductGrid from '../elements/ProductGrid';
import { Product } from '../../@types/product';
import { useGlobalContext } from '../../general/globalContext';

const HomePage = () => {
  const { dispatch, state } = useGlobalContext();
  const [products, setProducts] = useState<Array<Product>>([]);

  const storeProducts = (products: Array<Product>) => {
    dispatch({ type: 'SET_PRODUCTS', payload: products });
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      setProducts(result);
      storeProducts(result);
    };

    fetchData();
  }, []);

  const tryMakeOrder = async () => {
    //await makeOrder();
    console.log(state);
  }


  return (
    <>
      <Box
        sx={{
          width: '70%', // 70% of the viewport width
          marginX: 'auto', // Center horizontally
          backgroundColor: 'whitesmoke', // Use theme's primary color, customizable
          display: 'flex',
          alignItems: 'normal', // Center content vertically inside the box
          justifyContent: 'center', // Center content horizontally inside the box
          boxSizing: 'border-box', // Includes padding and border in the element's total width and height
          padding: '3%',
          borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'
        }}
      >
        <ProductGrid productList={products} />
      </Box>
    </>
  );
};

export default HomePage;