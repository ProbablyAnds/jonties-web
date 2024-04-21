import { Box, Button, CardMedia, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Product } from "../../@types/product";
import { Badge, DeleteForever, Redeem } from "@mui/icons-material";
import { images } from "../../general/imageStore";
import { Order } from "../../@types/order";
import { useState } from "react";
import ProductList from "./BasketList";
import { useGlobalContext } from "../../general/globalContext";

type OrdersListProps = {
    orders: Array<Order>;
    //updateOrder: (order: Order) => void;
}

const OrdersList = (props: OrdersListProps) => {
    const { state, dispatch } = useGlobalContext();
    const [isOpen, setIsOpen] = useState(false);
    const [openOrders, setOpenOrders] = useState<Array<number>>([]);

    const handleClick = (index: number) => {
        if (openOrders.includes(index)) {
            setOpenOrders(openOrders.filter((i) => i !== index));
        } else {
            setOpenOrders([...openOrders, index]);
        }
    }

    const getProductsFromOrder = (order: Order): Array<Product> => {
        const temp =  order.products.map((productId) => { return state.products.find((product: Product) => product.productId === productId) as Product });
        console.log(temp);
        return temp;
    }

    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: 'lightgrey'
            }}>
            <List>
                <ListItem>
                    <Typography sx={{ width: '30%', overflowWrap: 'break-word' }}>
                        {"Order Id"}
                    </Typography>
                    <div style={{ flexGrow: 1, overflowWrap: 'break-word' }} />
                    <Typography>
                        {"User Id"}
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <Typography>
                        {"Total Price"}
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <Typography>
                        {"Paid"}
                    </Typography>
                </ListItem>
                {
                    props.orders.map((order: Order, index) => (
                        <ListItem key={index} sx={{ display: 'block', border: '1px solid black' }}>
                            <ListItemButton onClick={() => handleClick(index)}>
                                <Typography sx={{ width: '30%', overflowWrap: 'break-word' }}>
                                    {order.orderId}
                                </Typography>
                                <div style={{ flexGrow: 1, overflowWrap: 'break-word' }} />
                                <Typography>
                                    {order.userId}
                                </Typography>
                                <div style={{ flexGrow: 1 }} />
                                <Typography>
                                    {'R' + order.totalPrice.toString()}
                                </Typography>
                                <div style={{ flexGrow: 1 }} />
                                <Typography>
                                    {order.paid ? "Paid" : "Not Paid"}
                                </Typography>
                            </ListItemButton>
                            <Collapse in={openOrders.includes(index)}>
                                <Box
                                    sx={{ padding: '5px' }}>
                                    <ProductList products={getProductsFromOrder(order)} removeFromBasket={() => { }} isBasket={false} />
                                </Box>
                            </Collapse>
                        </ListItem>
                    ))
                }

            </List>
        </Box>
    )
}

export default OrdersList;