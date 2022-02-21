import React from 'react';
import {Badge, Grid, IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Image from 'next/image';
import Logo from '../../public/logo.svg';
import {useSelector} from "react-redux";
import Cart from "../../slices/cart/models/Cart";
import {cartSelector} from "../../slices/cart";

const NavigationLayout = ({ children }: any) => {
    const cart = useSelector<{}, Cart>(cartSelector)

    return (
        <Grid margin={1}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', boxShadow: 0, display: 'flex', alignItems: 'center'}}
            >
                <Image width={20}
                       height={20}
                       alt={"logo"}
                       src={Logo}/>

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search product"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon color={"warning"} />
                </IconButton>

                <IconButton aria-label="cart">
                    <Badge badgeContent={cart.productCount} color="info">
                        <ShoppingBasketIcon color={"success"} />
                    </Badge>
                </IconButton>
            </Paper>
            <Grid container marginTop={1}>

                { children }
            </Grid>
        </Grid>
    );
};

export default NavigationLayout;