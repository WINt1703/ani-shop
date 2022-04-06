import React, {useState} from 'react';
import {Badge, Drawer, Grid, IconButton, InputBase, Paper, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Image from 'next/image';
import Logo from '../../public/logo.svg';
import {useSelector} from "react-redux";
import {cartSelector} from "../../slices/cart";
import Link from "next/link"
import CartMenu from "../CartMenu/index"
import {Cart} from "@shopify/hydrogen/dist/esnext/graphql/types/types";

const NavigationLayout = ({ children }: any) => {
    const cart = useSelector<{}, Cart | null>(cartSelector)
    const [showCart, setShowCart] = useState<boolean>(false)

    return (
        <>
            <Grid margin={1}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', boxShadow: 0, display: 'flex', alignItems: 'center'}}
                >
                    <Link href={"/"} passHref>
                        <Image width={20}
                               height={20}
                               alt={"logo"}
                               src={Logo}/>
                    </Link>

                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search product"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon color={"warning"} />
                    </IconButton>

                    <IconButton onClick={() => setShowCart(true)} aria-label="cart">
                        <Badge badgeContent={cart?.lines.edges.length ? cart?.lines.edges.map(e => e.node.quantity).reduce((r,l) => r + l) : 0} color="info">
                            <ShoppingBasketIcon color={"success"} />
                        </Badge>
                    </IconButton>
                </Paper>
                <Grid container marginTop={1}>
                    { children }
                </Grid>

                <Drawer
                    anchor={"right"}
                    open={showCart}
                    onClose={() => setShowCart(false)}
                >
                    <Grid display={"flex"}
                          alignItems={"center"}
                          bgcolor={"#2E2D4280"}
                          justifyContent={"center"}
                          height={"100%"}
                          width={450}>
                        <CartMenu onClose={() => setShowCart(false)} />
                    </Grid>
                </Drawer>
            </Grid>
        </>
    );
};

export default NavigationLayout;