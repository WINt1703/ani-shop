import React from 'react';
import "../../styles/a.css"
import "../../styles/text.css"
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../common/utils/theme";
import NavigationLayout from "../common/components/NavigationLayout/NavigatonLayout";
import {Provider} from "react-redux";
import rootStore from "../common/stores/root"
import {AppProps} from "next/app"

const App = ({Component, pageProps}: AppProps) => {
    return (
        <Provider store={rootStore}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <NavigationLayout>
                    <Component {...pageProps}/>
                </NavigationLayout>
            </ThemeProvider>
        </Provider>
    );
};


export default App;