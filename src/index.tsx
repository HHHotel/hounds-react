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

export const ApiConfig = React.createContext({} as api.IHoundsConfig);

const settingsProvider = new WebSettings();
const settings: HoundsSettings = settingsProvider.load();

// eslint-disable-next-line
function logout() {
    settingsProvider.save({
        ...settings,
        auth: {
            username: "",
            token: "",
        },
    });

    window.location.pathname = "/login";
}

const apiConfig = {
    apiURL: settings.apiUrl,
    apiVersion: "0.3.4",
    apiAuth: settings.auth,
};

ReactDOM.render(<Page>
    <PageRoute path="/settings">
        <SettingsPage settingsProvider={settingsProvider}/>
    </PageRoute>
    <PageRoute path="/week">
        <ApiConfig.Provider value={apiConfig}>
            <HoundsWeek logout={logout} />
        </ApiConfig.Provider>
    </PageRoute>
    <PageRoute path="/login">
        <HoundsLogin onLogin={(auth, saveUser) => {
            settingsProvider.save({...settings, auth});
            window.location.pathname = "/week";
        }}
        settings={settings}/>
    </PageRoute>
</Page>,
document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
