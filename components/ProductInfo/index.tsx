import React from 'react';
import {NextPage} from "next";
import {Grid, IconButton, Typography} from "@mui/material";
import styles from "../../styles/ProductInfo.module.css"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Link from "next/link"
import {useDispatch} from "react-redux";
import {addProduct} from "../../slices/cart";
import {Product} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import Image from "next/image"

type ProductsInfoProps = {
    product: Product,
}

const ProductsInfo: NextPage<ProductsInfoProps> = ({ product }) => {
    const dispatch = useDispatch()
    const addToCartHandler = () => {
        dispatch(addProduct(product))
    }

    return (
        <Grid item
              margin={1}
              display={"flex"}
              direction={"column"}
              className={styles.productEdge}
              alignItems={"center"}
              justifyContent={"center"}>
            <Grid position={"relative"}>
                <Grid className={styles.productOverlay}>
                    <IconButton sx={{ width: 80, height: 80 }} onClick={addToCartHandler}>
                        <AddShoppingCartIcon color={"warning"} fontSize={"large"} />
                    </IconButton>
                </Grid>

                <Image alt={product.images.edges[0].node.altText || ""}
                       height={250}
                       width={200}
                       src={product.images.edges[0].node.url}/>
            </Grid>

            <Link passHref href={"product/[productId]"} as={`product/${product.id.split('/').slice(-1)[0]}`}>
                <Typography maxWidth={250}
                            className={styles.productDescription}
                            textAlign={"center"}>
                    { product.description }
                </Typography>
            </Link>
        </Grid>
    );
};

export default ProductsInfo;