import React from 'react';
import {getProducts} from "../api/shopify/products";
import {NextPage} from "next";
import {Grid} from "@mui/material";
import ProductsInfo from "../components/ProductInfo/ProductsInfo";
import Product from "../api/shopify/models/Product";

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
    console.log(products)
    return (
        <Grid display={"flex"} direction={"row"}>
            {
                products.map((p, i) => (
                    <ProductsInfo key={i} product={p} />
                ))
            }
        </Grid>
    );
};

export default Index;