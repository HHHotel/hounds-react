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
import Page, {PageRoute} from "./util/Page";
import SettingsPage from "./app/settings/SettingsPage";

export const ApiContext = React.createContext({} as api.IHoundsConfig);

const settingsProvider = new WebSettings();
const settings: HoundsSettings = settingsProvider.load();

const paths = {
    settings: "/settings",
    week: "/",
    login: "/login",
};

const logout = () => {
    settingsProvider.save({
        ...settings,
        auth: {
            username: "",
            token: "",
        },
    });
    window.location.pathname = paths.login;
};

const login = (auth: api.IHoundAuth, saveUser?: boolean) => {
    if (saveUser) {
        settingsProvider.save({...settings, auth});
    }
    window.location.pathname = paths.week;
};

const apiConfig = {
    apiURL: settings.apiUrl,
    apiVersion: "0.3.4",
    apiAuth: settings.auth,
};

ReactDOM.render(<Page>
    <PageRoute path={paths.settings}>
        <SettingsPage settingsProvider={settingsProvider}/>
    </PageRoute>
    <PageRoute path={paths.week}>
        <ApiContext.Provider value={apiConfig}>
            <HoundsWeek logout={logout} />
        </ApiContext.Provider>
    </PageRoute>
    <PageRoute path={paths.login}>
        <HoundsLogin onLogin={login} settings={settings}/>
    </PageRoute>
</Page>,
document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
