import {NextApiRequest, NextApiResponse} from "next";
import {getCartById} from "../../../api/shopify/cart";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            res.json(await getCartById(req.query.cartId as string))
            break
    }
}
