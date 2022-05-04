import React from 'react';
import {getProducts} from "../modules/shopify/api/products";
import {NextPage} from "next";
import {Grid} from "@mui/material";
import ProductsInfo from "../common/components/ProductInfo/ProductInfo";
import {Product} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import SeoLayout from "../common/components/SeoLayout/SeoLayout";

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
    return (
        <SeoLayout>
            <Grid container
                 alignItems={"center"}
                 flexWrap={"wrap"}>
                {
                    products.map((p, i) => (
                        <ProductsInfo key={i} product={p}/>
                    ))
                }
            </Grid>
        </SeoLayout>
    );
};

export default Index;