import React from "react";
import ReactDOM from "react-dom";
import HoundsList from "./HoundsList/HoundsList";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

const weekStart = new Date("3/2/2020");

ReactDOM.render(
    <HoundsList weekStart={weekStart}/>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
