import {Connection} from "../api/shopify/connection";
import ProductImage from "./product-image";
import ProductVariants from "./product-variants";

interface Product {
    id: string,
    title: string,
    description: string,
    images: Connection<ProductImage>,
    variants: Connection<ProductVariants>
}

export default Product