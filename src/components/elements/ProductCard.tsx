import React, { useState, useReducer } from 'react';
import { Card, CardContent, CardMedia, CardActions, Typography, Button, Box } from '@mui/material';
import { images } from '../../general/imageStore';
import globalReducer from '../../general/globalReducer';
import { useGlobalContext } from '../../general/globalContext';
import { Product } from '../../@types/product';
import { Link, useNavigate } from 'react-router-dom';

type ProductCardProps = {
    product: Product;
};

const ProductCard = (props: ProductCardProps) => {
    const { state, dispatch } = useGlobalContext();
    const navigate = useNavigate();

    const addToBasket = (selectedProduct: Product) => {
        dispatch({ type: 'ADD_TO_BASKET', payload: selectedProduct });
    };

    return (
        <div>
            <Card sx={{ padding: '5px', outline: 'solid', margin: '9px' }}>
                <Box onClick={() => navigate('/product/' + props.product.productId)}>
                    <CardMedia
                        sx={{ height: 250, borderRadius: '10px' }}
                        image={images['phProductImage']}
                        title='Product Image'
                    />
                    <CardContent
                        sx={{ textAlign: 'center', textWrap: 'nowrap' }}>
                        <Typography gutterBottom variant='h5' component='div'>
                            {props.product.productName}
                        </Typography>
                        <Typography variant='body2'>
                            R {props.product.productPrice.toString()}
                        </Typography>
                    </CardContent>
                </Box>
                <CardActions>
                    <Button
                         sx={{ backgroundColor: 'darkorange', color: 'black', margin: '2px'}}
                        size='small'
                        onClick={(() => { addToBasket(props.product) })}>
                        Add To Cart
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default ProductCard;