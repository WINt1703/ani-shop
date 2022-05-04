import {Cart} from "@shopify/hydrogen/dist/esnext/graphql/types/types";

export default interface RootStore {
    cart: Cart | null,
}