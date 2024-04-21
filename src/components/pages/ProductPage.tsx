import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { images } from '../../general/imageStore';
import { useGlobalContext } from '../../general/globalContext';
import { Product } from '../../@types/product';
import { getProducts } from '../../general/apiHandler';

/*

  TODO
  The logic in this page really needs to be improved 

*/

const ProductPage = () => {
  const productId = useParams();
  const { dispatch, state } = useGlobalContext();

  const storeProducts = (products: Array<Product>) => {
    dispatch({ type: 'SET_PRODUCTS', payload: products });
  }

  const addToBasket = (selectedProduct: Product) => {
    dispatch({ type: 'ADD_TO_BASKET', payload: selectedProduct });
};

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      storeProducts(result);
    };

    fetchData();

  }, []);

  const getCurrentProduct = () => {
    const currentProduct = (state.products ?? []).find((product: any) => product.productId === productId.id);
    console.log(currentProduct);
    if(currentProduct === undefined)
      {
        return {
          productId: "",
          productName: "",
          productPrice: 0,
          productDescription: "" 
        }
      }
    return currentProduct;
  }

  return (
    <Box
      sx={{
        //height: '100vh', // 100% of the viewport height
        width: '70%', // 70% of the viewport width
        marginX: 'auto', // Center horizontally
        backgroundColor: 'green', // Use theme's primary color, customizable
        display: 'block',
        //alignItems: 'normal', // Center content vertically inside the box
        //justifyContent: 'center', // Center content horizontally inside the box
        boxSizing: 'border-box', // Includes padding and border in the element's total width and height
        paddingTop: '3%',
      }}
    >
      <Card sx={{ display: 'flex', padding: 5 }}>
        <CardMedia
          sx={{ height: 250, width: 250 }}
          image={images['phProductImage']}
          title='Product Image'
        />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {getCurrentProduct().productName ?? ""}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {"R" + getCurrentProduct().productPrice ?? ""}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getCurrentProduct().productDescription ?? ""}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <Button
                size='small'
                onClick={(() => { addToBasket(getCurrentProduct())})}>
                Add To Cart
              </Button>
            </Box>
          </Box>
      </Card>
    </Box>
  );
};

export default ProductPage;