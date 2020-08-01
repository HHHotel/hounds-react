import React from "react";
import { render } from "react-dom";
import App from "./app/App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const theme = createMuiTheme();

render(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </MuiPickersUtilsProvider>,
    document.getElementById("root")
);
