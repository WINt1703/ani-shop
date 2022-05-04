import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Cart, Product} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import {cartSelector, setCart} from "../../../module/shopify/slices/cart";
import {Typography, Grid, Button, IconButton, CircularProgress} from "@mui/material";
import Image from "next/image"
import CloseIcon from '@mui/icons-material/Close';
import {NextPage} from "next";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {purgeCartLines, updateLineOrCreateCart} from "../../utils/cart";

type CartMenuProps = {
    onClose: () => void,
}

const CartMenu: NextPage<CartMenuProps> = ({ onClose }) => {
    const cart = useSelector(cartSelector)
    const dispatch = useDispatch()
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const changeCountHandler = async (product: Product, quantity: number) => {
        setIsFetching(true)
        dispatch(setCart(await updateLineOrCreateCart({ quantity: quantity, product: product }, cart)))
        setIsFetching(false)
    }
    const removeLineHandler = async (id: string) => {
        setIsFetching(true)
        dispatch(setCart(await purgeCartLines(cart!, [id])))
        setIsFetching(false)
    }

    if (!cart?.lines.edges.length)
        return (
            <Typography color={"rgba(255,74,218,0.88)"}
                        variant={"h5"}>
                Cart is empty
            </Typography>
        )

    return (
        <>
            <Grid sx={isFetching ? { opacity: .7, filter: "blur(3px)", pointerEvents: "none", userSelect: "none" } : undefined}
                  width={"100%"}
                  direction={"column"}
                  display={"flex"}
                  height={"100%"} p={1.5}>
                <Grid display={"flex"}
                      alignItems={"center"}
                      direction={"row"}
                      justifyContent={"space-between"}>
                    <Typography variant={"h5"}>
                        Cart items
                    </Typography>

                    <IconButton onClick={onClose}>
                        <CloseIcon color={"warning"}/>
                    </IconButton>
                </Grid>

                <Grid flexGrow={1}>
                    {
                         cart.lines.edges.map((e, i) => (
                            <Grid key={i}
                                  mt={1}
                                  border={2}
                                  padding={1}
                                  height={110}
                                  display={"flex"}
                                  alignItems={"center"}
                                  borderRadius={1.5}
                                  borderColor={"orange"}>
                                <Image width={70}
                                       height={100}
                                       alt={e.node.merchandise.image?.altText || ""}
                                       src={e.node.merchandise.image?.src} />

                                <Grid height={"100%"}
                                      display={"flex"}
                                      marginLeft={2}
                                      width={"100%"}
                                      direction={"column"}
                                >
                                    <Grid container justifyContent={"space-between"}>
                                        <Typography className={"text-truncate"}
                                                    marginBottom={"auto"}>
                                            { e.node.merchandise.product.title }
                                        </Typography>

                                        <IconButton sx={{ padding: 0 }}
                                                    onClick={() => removeLineHandler(e.node.id)}>
                                            <CloseIcon color={"warning"}/>
                                        </IconButton>
                                    </Grid>

                                    <Grid border={1}
                                          mt={1}
                                          padding={.25}
                                          justifyContent={"center"}
                                          borderRadius={1}
                                          alignItems={"center"}
                                          container
                                          width={80}>
                                        <IconButton onClick={() => changeCountHandler(e.node.merchandise.product, -1)}
                                                    sx={{ padding: 0 }}>
                                            <RemoveIcon fontSize={"small"} color={"warning"}/>
                                        </IconButton>

                                        <Typography marginX={1} mt={.75}>
                                            { e.node.quantity }
                                        </Typography>

                                        <IconButton onClick={() => changeCountHandler(e.node.merchandise.product, 1)}
                                                    sx={{ padding: 0 }}>
                                            <AddIcon fontSize={"small"} color={"warning"}/>
                                        </IconButton>
                                    </Grid>

                                    <Typography color={"#c800ff"}
                                                fontSize={16.5}
                                                ml={"auto"}
                                                mt={"auto"}>
                                        { e.node.merchandise.priceV2.amount } { e.node.merchandise.priceV2.currencyCode }
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>

                <Typography variant={"h5"} mb={1}>
                    Total: { cart.estimatedCost.totalAmount.amount } {cart.estimatedCost.totalAmount.currencyCode}
                </Typography>

                <Button variant={"contained"}>
                    Checkout
                </Button>
            </Grid>

            {
                isFetching &&
                <CircularProgress sx={{ position: "absolute" }} color="error" />
            }
        </>
    );
};

export default CartMenu;