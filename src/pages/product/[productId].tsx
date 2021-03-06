import React, {useState} from 'react';
import {NextPage, NextPageContext} from "next";
import {getProductById} from "../../modules/shopify/api/product";
import LoadingButton from '@mui/lab/LoadingButton';
import {CircularProgress, Grid, Tab, Tabs, Theme, Typography, useMediaQuery} from "@mui/material";
import Image from "next/image"
import styles from "../../../styles/product.module.css"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {Product} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import useCart from "../../modules/shopify/hook/useCart";
import SeoLayout from "../../common/components/SeoLayout/SeoLayout";

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
    const { addToCart, isFetching } = useCart()
    const md = useMediaQuery<Theme>(theme => theme.breakpoints.down("md"))
    const [indexImage, setIndexImage] = useState<number>(0)

    const changedImageIndexHandler = (event: React.SyntheticEvent, newValue: number) => {
        setIndexImage(newValue);
    };
    const addToCartHandler = () => {
        addToCart(product).then()
    }

    return (
        <SeoLayout title={product.title} metaDescription={product.description}>
            <Grid m={3}>
                <Typography color={"orange"} textAlign={md ? "center" : undefined} variant={"h3"}>
                    { product.title }
                </Typography>

                <Grid container justifyContent={md ? "center" : undefined}  mt={2}>
                    <Grid container={md} maxWidth={480}  direction={md ? "column" : undefined} item>
                        <Image width={480}
                               height={550}
                               alt={product.images.edges[indexImage].node.altText!}
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
                                             <Image height={50} width={50} alt={e.node.altText!} src={e.node.url}/>
                                         } />
                                ))
                            }
                        </Tabs>
                    </Grid>
                    <Grid item
                          ml={5}
                          container
                          my={md ? 3 : 0}
                          direction={"column"}
                          md={"auto"}
                          lg>
                        <Grid direction={"row"}
                              alignItems={"center"}
                              justifyContent={md ? "center" : undefined}
                              display={"flex"}
                              className={styles.frameInfo}>
                            <Typography mr={3} variant={"h5"}>
                                Price { product.variants.edges[0].node.priceV2.amount } { product.variants.edges[0].node.priceV2.currencyCode }
                            </Typography>

                            <LoadingButton onClick={addToCartHandler}
                                           loadingIndicator={<>
                                               <Grid display={"flex"}
                                                     alignItems={"center"}
                                                     direction={"row"}
                                                     sx={{ color: "#a77dff" }}>
                                                   <CircularProgress size={20} sx={{ color: "#a77dff" }} />
                                                   <Typography textTransform={"none"}
                                                               m={0}
                                                               marginLeft={1}
                                                               mt={.5}>Adding</Typography>
                                               </Grid>
                                           </>}
                                           loading={isFetching}
                                           variant={"outlined"}
                                           loadingPosition={"start"}
                                           startIcon={ <AddShoppingCartIcon/> }>
                                To cart
                            </LoadingButton>
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
        </SeoLayout>
    );
};

export default Product;