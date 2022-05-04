import React, {useState} from 'react';
import {NextPage} from "next";
import {Grid, CircularProgress, Typography} from "@mui/material";
import styles from "../../../../styles/ProductInfo.module.css"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Link from "next/link"
import {useDispatch, useSelector} from "react-redux";
import {Cart, Product} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import Image from "next/image"
import {cartSelector, setCart} from "../../../module/shopify/slices/cart";
import {addProductOrCreateCart, updateLineOrCreateCart} from "../../utils/cart";
import { LoadingButton } from '@mui/lab';

type ProductsInfoProps = {
    product: Product,
}

const ProductsInfo: NextPage<ProductsInfoProps> = ({ product }) => {
    const dispatch = useDispatch()
    const cart = useSelector<{}, Cart | null>(cartSelector)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const addToCartHandler = async () => {
        if (cart?.lines.edges.some(e => e.node.merchandise.product.id === product.id)) {
            setIsFetching(true)
            dispatch(setCart(await updateLineOrCreateCart({ product: product, quantity: 1 }, cart)))
            setIsFetching(false)
        }
        else {
            setIsFetching(true)
            dispatch(setCart(await addProductOrCreateCart(product, cart)))
            setIsFetching(false)
        }
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