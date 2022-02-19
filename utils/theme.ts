import {createTheme} from "@mui/material";

export default createTheme({
    palette: {
        background : {
            default: "#2E2D42",
            paper: "transparent",
        },
        text: {
            primary: "#ff6a00",
            secondary: "#d800ff",
            disabled: "#d0d0d0",
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    color: "#d600ff",
                    backgroundColor: "#2E2D42"
                },
                color: "#d600ff",
            }
        },
    },
});