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
import HoundsLogin from "./app/Login";

export const ApiConfig = React.createContext({} as api.IHoundsConfig);

const settingsProvider = new WebSettings();
const settings = settingsProvider.load();

// eslint-disable-next-line
function logout() {
    settingsProvider.save({
        ...settings,
        auth: {
            username: "",
            token: "",
        },
    });

    renderLogin();
}

const apiConfig = {
    apiURL: settings.apiUrl,
    apiVersion: "0.3.4",
    apiAuth: settings.auth,
};

api.checkAuthentication(apiConfig).then((success) => {
    if (success) {
        renderWeek(apiConfig);
    } else {
        renderLogin();
    }
});

// eslint-disable-next-line
function renderLogin() {
    ReactDOM.render(
        <HoundsLogin onLogin={(auth, saveUser) => {
            if (saveUser) {
                settingsProvider.save({
                    ...settings,
                    auth,
                });
            }
            renderWeek({...apiConfig, apiAuth: auth});
        }}
        settings={settings}
        />,
        document.getElementById("root"),
    );
}

// eslint-disable-next-line
function renderWeek(apiConfig: api.IHoundsConfig) {
    ReactDOM.render(
        <ApiConfig.Provider value={apiConfig}>
            <HoundsWeek logout={logout} />
        </ApiConfig.Provider>,
        document.getElementById("root"),
    );
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
