import {useDispatch, useSelector} from "react-redux";
import {cartSelector, setCart} from "../slices/cart";
import {useState} from "react";
import {addProductOrCreateCart, updateLineOrCreateCart} from "../../../common/utils/cart";
import {Product} from "@shopify/hydrogen/dist/esnext/graphql/types/types";

type useCartResult = {
    addToCart: (product: Product) => Promise<void>,
    isFetching: boolean,
}


const useCart = (): useCartResult => {
    const dispatch = useDispatch()
    const cart = useSelector(cartSelector)
    const [isFetching, setIsFetching] = useState<boolean>(false)

    const addToCart = async (product: Product) => {
        if (cart?.lines.edges.some(e => e.node.merchandise.product.id === product.id)) {
            setIsFetching(true)
            dispatch(setCart(await updateLineOrCreateCart({ product: product, quantity: 1 }, cart)))
            setIsFetching(false)
        }
        else {
            setIsFetching(true)
            dispatch(setCart(await addProductOrCreateCart(product, cart)))
            setIsFetching(false)
        }
    }

    return {
        addToCart: addToCart,
        isFetching: isFetching,
    }
}

export default useCart;