import {Connection} from "../connection";
import ProductImage from "./ProductImage";
import ProductVariants from "./ProductVariants";

interface Product {
    id: string,
    title: string,
    description: string,
    images: Connection<ProductImage>,
    variants: Connection<ProductVariants>
}

export default Product