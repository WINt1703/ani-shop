import {NextApiRequest, NextApiResponse} from "next";
import {addCartLine, updateCartLine} from "../../../../api/shopify/cart";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "PUT":
            res.json(await addCartLine(req.query.cartId as string, req.body.lines))
            break
        case "POST":
            res.json(await updateCartLine(req.query.cartId as string, req.body.lines))
            break
    }
}
