import Product from "./product";

interface CartProduct {
    sum: number,
    count: number,
    product: Product,
}

interface Cart {
    totalSum: number,
    productCount: number,
    products: Array<CartProduct>,
}

export default Cart