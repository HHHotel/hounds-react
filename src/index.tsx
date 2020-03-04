import React from "react";
import ReactDOM from "react-dom";
import HoundsWeek from "./app/HoundsWeek";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";
// eslint-disable-next-line
import {HoundsSettings} from "./util/settings/SettingsProvider";
import {WebSettings} from "./util/settings/WebSettingsProvider";

export const ApiConfig = React.createContext({} as api.IHoundsConfig);

const settingsProvider = new WebSettings();
const settings = settingsProvider.load();

// Load settings from a provider

renderWeek({
    apiURL: settings.apiUrl,
    apiVersion: "0.3.4",
    apiAuth: settings.auth,
});

// eslint-disable-next-line
function renderWeek(apiConfig: api.IHoundsConfig) {
    api.checkAuthentication(apiConfig).then((success) => {
        if (!success) {
            alert("Authentication failed");
            return;
        }

        ReactDOM.render(
            <ApiConfig.Provider value={apiConfig}>
                <HoundsWeek />
            </ApiConfig.Provider>,
            document.getElementById("root"));
    });
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
