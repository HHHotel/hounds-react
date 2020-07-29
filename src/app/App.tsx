import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
} from "react-router-dom";

import "./App.css";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";
import {
    // eslint-disable-next-line
    HoundsSettings,
    SettingsContext,
    ApiConfigContext,
    loadApiConfig,
    saveAuth,
    loadSettings,
    setSettings,
} from "./contexts";

// eslint-disable-next-line
import HoundsLogin from "./routes/Login";
import HoundsWeek from "./routes/main/HoundsWeek";
import HoundsSettingsPage from "./routes/HoundsSettings";
import DogProfile from "./routes/profile/Profile";
import { getWeekArray } from "./routes/main/utils";

/**
 * Entrypoint for the application
 * @return {React.ReactElement} el
 */
export default function App() {
    const [apiConf, setApiConf] = React.useState(loadApiConfig());
    const [settings, updateSettings] = React.useState(loadSettings());
    const [dates, setDates] = React.useState(getWeekArray(new Date()));

    const setAuth = (auth: { username: string; token: string } | null) => {
        saveAuth(auth);
        setApiConf({
            ...apiConf,
            apiAuth: auth,
        } as any); // TODO wrap api.IHoundsConfig to allow auth null
    };
    const saveSettings = (settings: HoundsSettings) => {
        setSettings(settings);
        updateSettings(settings);
    };

    React.useEffect(() => {
        api.checkAuthentication(apiConf).then((valid) => {
            setAuth(valid ? apiConf.apiAuth : null);
        });
    }, []);

    return (
        <SettingsContext.Provider
            value={{
                settings,
                setSettings: saveSettings,
            }}
        >
            <ApiConfigContext.Provider value={{ apiConfig: apiConf, setAuth }}>
                <Router>
                    <Switch>
                        <Route path="/app/main">
                            {apiConf.apiAuth ? (
                                <HoundsWeek dates={dates} setDates={setDates} />
                            ) : (
                                <Redirect to={"/login"} />
                            )}
                        </Route>
                        <Route path="/login">
                            {apiConf.apiAuth ? (
                                <Redirect to={"/app/main"} />
                            ) : (
                                <HoundsLogin />
                            )}
                        </Route>
                        <Route path="/app/settings">
                            <HoundsSettingsPage />
                        </Route>
                        <Route path="/app/profile/:dogId">
                            <DogProfile />
                        </Route>
                        <Route path="*">
                            <Redirect to="/app/main" />
                        </Route>
                    </Switch>
                </Router>
            </ApiConfigContext.Provider>
        </SettingsContext.Provider>
    );
}
