import {NextApiRequest, NextApiResponse} from "next";
import {createCart} from "../../../modules/shopify/api/cart";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "PUT":
            res.json(await createCart(req.body.merchandiseId))
            break
    }
}
