import React from 'react';
import {NextPage, NextPageContext} from "next";

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {

        }
    }
}

const Product: NextPage = () => {
    return (
        <div>

        </div>
    );
};

export default Product;