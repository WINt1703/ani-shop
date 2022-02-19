import React from 'react';
import "../styles/a.css"
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../utils/theme";
import NavigationLayout from "../components/NavigationLayout/NavigationLayout";

const App = ({ Component, pageProps }: any) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavigationLayout>
                <Component {...pageProps}/>
            </NavigationLayout>
        </ThemeProvider>
    );
};


export default App;