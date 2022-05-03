import {NextApiRequest, NextApiResponse} from "next";
import {addCartLine, removeCartLines, updateCartLine} from "../../../../module/shopify/api/cart";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "PUT":
            res.json(await addCartLine(req.query.cartId as string, req.body.lines))
            break
        case "POST":
            res.json(await updateCartLine(req.query.cartId as string, req.body.lines))
            break
        case "PATCH":
            res.json(await removeCartLines(req.query.cartId as string, req.body.lineIds))
            break
    }
}
