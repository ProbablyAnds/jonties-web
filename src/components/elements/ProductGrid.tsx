import { Grid } from "@mui/material";
import { Product } from "../../@types/product"
import ProductCard from "./ProductCard";

type ProductGridProps = {
    productList: Array<Product>;
}

const ProductGrid = (props: ProductGridProps) => {
    return (
        <div
            style={{marginLeft: '3%'}}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    props.productList.map((product: Product, index) => (
                        <Grid xs={2} sm={4} md={4} key={index} sx={{}}>
                            <ProductCard product={product}/>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}

export default ProductGrid;