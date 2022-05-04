import React from 'react';
import {NextPage} from "next";
import {Grid, CircularProgress, Typography} from "@mui/material";
import styles from "../../../../styles/ProductInfo.module.css"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Link from "next/link"
import {Product} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import Image from "next/image"
import { LoadingButton } from '@mui/lab';
import useCart from "../../../modules/shopify/hook/useCart";

type ProductsInfoProps = {
    product: Product,
}

const ProductsInfo: NextPage<ProductsInfoProps> = ({ product }) => {
    const { addToCart, isFetching } = useCart()
    const addToCartHandler = () => {
        addToCart(product).then()
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
                    <LoadingButton sx={{ width: 80, height: 80 }}
                                   loading={isFetching}
                                   loadingPosition={"start"}
                                   startIcon={<AddShoppingCartIcon sx={{ width: 30, height: 30 }}
                                                                   color={"warning"} />}
                                   loadingIndicator={
                                       <Grid display={"flex"}
                                             alignItems={"center"}
                                             direction={"row"}
                                             sx={{ color: "#b38eff" }}>
                                           <CircularProgress size={20} sx={{ color: "#b38eff" }} />
                                           <Typography textTransform={"none"}
                                                       m={0}
                                                       marginLeft={1}
                                                       mt={.5}>Adding</Typography>
                                       </Grid>
                                   }
                                   onClick={addToCartHandler}/>
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