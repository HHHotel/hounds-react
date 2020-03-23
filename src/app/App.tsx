import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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

const theme = createMuiTheme();

/**
 * Entrypoint for the application
 * @return {React.ReactElement} el
 */
export default function App() {
    const [apiConf, setApiConf] = React.useState(loadApiConfig());
    const [settings, updateSettings] = React.useState(loadSettings());
    const [dates, setDates] = React.useState(getWeekArray(new Date()));

    const setAuth = (auth: {username: string, token: string} | null) => {
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

    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
            <ThemeProvider theme={theme}>
                <SettingsContext.Provider value={{
                    settings,
                    setSettings: saveSettings,
                }}>
                    <ApiConfigContext.Provider
                        value={{ apiConfig: apiConf, setAuth }}>
                        <Switch>
                            <PrivateRoute path="/app/main">
                                <HoundsWeek dates={dates} setDates={setDates} />
                            </PrivateRoute>
                            <Route path="/app/settings">
                                <HoundsSettingsPage />
                            </Route>
                            <Route path="/app/profile/:dogId">
                                <DogProfile />
                            </Route>
                            <Route path="/login">
                                {apiConf.apiAuth ?
                                    <Redirect to={"/app/main"} /> :
                                    <HoundsLogin />}
                            </Route>
                            <Route path="*">
                                <Redirect to="/app/main" />
                            </Route>
                        </Switch>
                    </ApiConfigContext.Provider>
                </SettingsContext.Provider>
            </ThemeProvider>
        </Router>
    </MuiPickersUtilsProvider>;
}

/**
 * A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 * @param {any} props properties
 * @return {React.ReactElement} el
 */
function PrivateRoute({ children, ...rest }: any) {
    const { apiConfig } = React.useContext(ApiConfigContext);
    return (
        <Route
            {...rest}
            render={({ location }: any) =>
                apiConfig.apiAuth ?
                    (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    )
            }
        />
    );
}
