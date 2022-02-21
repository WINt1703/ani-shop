import React, {useState} from 'react';
import {NextPage, NextPageContext} from "next";
import {getProductById} from "../../api/shopify/product";
import Product from "../../api/shopify/models/Product";
import {Button, Grid, Tab, Tabs, Typography} from "@mui/material";
import Image from "next/image"
import styles from "../../styles/product.module.css"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {useDispatch} from "react-redux";
import {addProduct} from "../../slices/cart";

type ProductProps = {
    product: Product
}

export async function getServerSideProps({ query }: NextPageContext) {
    return {
        props: {
            product: JSON.parse(JSON.stringify(await getProductById(query.productId as string)))
        }
    }
}

const Product: NextPage<ProductProps> = ({product}) => {
    const dispatch = useDispatch()
    const [indexImage, setIndexImage] = useState<number>(0)
    const changedImageIndexHandler = (event: React.SyntheticEvent, newValue: number) => {
        setIndexImage(newValue);
    };
    const addToCartHandler = () => {
        dispatch(addProduct(product))
    }


    return (
        <Grid m={3}>
            <Typography color={"orange"} variant={"h3"}>
                { product.title }
            </Typography>

            <Grid container mt={2}>
                <Grid item>
                    <Image width={480} height={550} alt={product.images.edges[indexImage].node.altText}
                           src={product.images.edges[indexImage].node.url}/>

                    <Tabs variant={"scrollable"}
                          sx={{ maxWidth: 480 }}
                          TabIndicatorProps={{
                              style: {
                                  background: "#ff4d00",
                              }
                          }}
                          value={indexImage}
                          onChange={changedImageIndexHandler}>
                        {
                            product.images.edges.map((e, i) => (
                                <Tab value={i}
                                     key={i}
                                     icon={
                                         <Image height={50} width={50} alt={e.node.altText} src={e.node.url}/>
                                     } />
                            ))
                        }
                    </Tabs>
                </Grid>
                <Grid item
                      ml={5}
                      container
                      direction={"column"}
                      xs>
                    <Grid direction={"row"} alignItems={"center"} display={"flex"} className={styles.frameInfo}>
                        <Typography mr={3} variant={"h5"}>
                            Price { product.variants.edges[0].node.priceV2.amount } { product.variants.edges[0].node.priceV2.currencyCode }
                        </Typography>

                        <Button onClick={addToCartHandler}
                                startIcon={ <AddShoppingCartIcon/> }>
                            In cart
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Typography variant={"h4"}
                        color={"greenyellow"}
                        mt={3}>
                Description
            </Typography>
            <Typography color={"greenyellow"}>
                { product.description }
            </Typography>
        </Grid>
    );
};

export default Product;