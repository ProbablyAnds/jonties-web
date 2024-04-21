import { Box, Button, CardMedia, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Product } from "../../@types/product";
import { Badge, DeleteForever, Redeem } from "@mui/icons-material";
import { images } from "../../general/imageStore";
import { useNavigate } from "react-router-dom";

type ProductListProps = {
    products: Array<Product>;
    removeFromBasket: (product: Product) => void;
    isBasket: boolean;
}

const ProductList = (props: ProductListProps) => {
    const navigate = useNavigate();
    const filterAndUpdateCount = (products: Array<Product>) => {
        const realProducts = products.filter((product: Product) => product !== undefined);

        const countedProducts =
            realProducts.map((product: Product) => {
                return { ...product, productCount: realProducts.filter((p: Product) => p.productId === product.productId).length };
            });

        const filteredProducts = countedProducts.filter((product, index, self) =>
            index === self.findIndex((t) => (
                t.productId === product.productId && t.productCount === product.productCount
            ))
        );

        return filteredProducts;
    }

    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: 'darkgrey'
            }}>
            <List>
                <ListItem>
                    <Typography sx={{ width: '30%' }}>
                        {"Product Name"}
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <Typography>
                        {"Total Price"}
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <Typography>
                        {"Quantity"}
                    </Typography>

                </ListItem>
                {
                    filterAndUpdateCount(props.products).map((product: Product, index) => (
                        <ListItem key={index}>
                            <ListItemButton
                                onClick={() => navigate('/product/' + product.productId)}>
                                <Redeem fontSize="large" />
                                <Typography sx={{ width: '30%' }}>
                                    {product.productName}
                                </Typography>
                                <div style={{ flexGrow: 1 }} />
                                <Typography>
                                    {"R" + (product.productPrice.valueOf() * product.productCount.valueOf()).toString()}
                                </Typography>
                                <div style={{ flexGrow: 1 }} />
                                <Typography>
                                    {"x" + product.productCount.toString()}
                                </Typography>
                            </ListItemButton>
                            {props.isBasket &&
                                <Button
                                    sx={{ backgroundColor: "red", color: "white" }}
                                    onClick={() => props.removeFromBasket(product)}>
                                    <DeleteForever fontSize="large" />
                                </Button>
                            }
                        </ListItem>
                    ))
                }

            </List>
        </Box>
    )
}

export default ProductList;