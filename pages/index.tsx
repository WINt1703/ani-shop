import React from 'react';
import {getProducts} from "../api/shopify/products";
import {NextPage} from "next";
import {Grid, Theme, useMediaQuery} from "@mui/material";
import ProductsInfo from "../components/ProductInfo";
import {Product} from "@shopify/hydrogen/dist/esnext/graphql/types/types";

type HomeProps = {
    products: Array<Product>,
}

export async function getServerSideProps() {
    const products = await getProducts()

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        }
    }
}

const Index: NextPage<HomeProps> = ({ products }) => {
    const sm = useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"))

    return (
        <Grid display={"flex"} mx={sm ? "auto" : 0} direction={sm ? "column" : "row"}>
            {
                products.map((p, i) => (
                    <ProductsInfo key={i} product={p} />
                ))
            }
        </Grid>
    );
};

export default Index;