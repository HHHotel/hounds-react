import React from "react";
import ReactDOM from "react-dom";
import HoundsWeek from "./app/HoundsWeek";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

import * as api from "@happyhoundhotel/hounds-ts";

export const ApiConfig = React.createContext({} as api.IHoundsConfig);

const API_CONFIG: api.IHoundsConfig = {
    apiURL: "https://hhh-scheduler-testing.herokuapp.com",
    apiVersion: "0.3.4",
    apiAuth: {
        username: "",
        token: "",
    },
};

api.login(
    "matt",
    "",
    API_CONFIG.apiURL,
)
    .then((auth: api.IHoundAuth) => {
        const apiConfig: api.IHoundsConfig = {
            ...API_CONFIG,
            apiAuth: auth,
        };
        ReactDOM.render(
            <ApiConfig.Provider value={apiConfig}>
                <HoundsWeek />
            </ApiConfig.Provider>,
            document.getElementById("root"),
        );
    });


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
