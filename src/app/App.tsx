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
    setAuth,
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
    const [apiConfig, setApiConfig] = React.useState(loadApiConfig());
    const [settings, updateSettings] = React.useState(loadSettings());
    const [dates, setDates] = React.useState(getWeekArray(new Date()));

    const saveSettings = (settings: HoundsSettings) => {
        setSettings(settings);
        updateSettings(settings);
    };

    const updateApiAuth = (auth: api.IHoundAuth | null, remember?: boolean) => {
        setAuth(auth, remember);
        setApiConfig({
            ...apiConfig,
            apiAuth: auth,
        } as any);
    };

    React.useEffect(() => {
        api.checkAuthentication(apiConfig).then((valid) => {
            setAuth(valid ? apiConfig.apiAuth : null);
        });
    }, []);

    return (
        <SettingsContext.Provider
            value={{
                settings,
                setSettings: saveSettings,
            }}
        >
            <ApiConfigContext.Provider value={{ apiConfig, updateApiAuth }}>
                <Router>
                    <Switch>
                        <Route path="/app/main">
                            {apiConfig.apiAuth ? (
                                <HoundsWeek dates={dates} setDates={setDates} />
                            ) : (
                                <Redirect to={"/login"} />
                            )}
                        </Route>
                        <Route path="/login">
                            {apiConfig.apiAuth ? (
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
