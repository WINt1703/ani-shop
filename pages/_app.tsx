import React from 'react';
import "../styles/a.css"
import "../styles/text.css"
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../utils/theme";
import NavigationLayout from "../components/NavigationLayout";
import {Provider} from "react-redux";
import rootStore from "../stores/root"

const App = ({Component, pageProps}: any) => {
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