import React from 'react';
import {NextPage} from "next";
import Head from "next/head";

interface SeoLayout {
    title?: string,
    metaDescription?: string,
    children: any,
}

const SeoLayout: NextPage<SeoLayout> = ({ title,
                                          metaDescription,
                                          children }) => {
    return (
        <>
            <Head>
                <title> { title || "Anime hoodie shop" } </title>
                <meta name="description" content={ metaDescription || "You find best anime hoodie" }/>
            </Head>
            { children }
        </>
    );
};

export default SeoLayout;