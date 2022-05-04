import {NextApiRequest, NextApiResponse} from "next";
import {getCartById} from "../../../modules/shopify/api/cart";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            res.json(await getCartById(req.query.cartId as string))
            break
    }
}
