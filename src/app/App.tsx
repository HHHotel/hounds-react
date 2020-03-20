import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
} from "react-router-dom";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import "./App.css";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";
import {SettingsContext, ApiConfigContext, loadApiConfig, saveAuth} from "./contexts";

// eslint-disable-next-line
import HoundsLogin from "./routes/Login";
import HoundsWeek from "./routes/main/HoundsWeek";
import HoundsSettings from "./routes/HoundsSettings";
import DogProfile from "./routes/profile/Profile";

const theme = createMuiTheme();

/**
 * Entrypoint for the application
 * @return {React.ReactElement} el
 */
export default function App() {
    const [apiConf, setApiConf] = React.useState(loadApiConfig());
    const {settings, setSettings} = React.useContext(SettingsContext);

    const setAuth = (auth: {username: string, token: string} | null) => {
        saveAuth(auth);
        setApiConf({
            ...apiConf,
            apiAuth: auth, // TODO wrap api.IHoundsConfig to allow null
        } as any);
    };

    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
            <ThemeProvider theme={theme}>
                <SettingsContext.Provider value={{settings, setSettings}}>
                    <ApiConfigContext.Provider
                        value={{apiConfig: apiConf, setAuth}}>
                        <Switch>
                            <PrivateRoute path="/app/main">
                                <HoundsWeek />
                            </PrivateRoute>
                            <Route path="/app/settings">
                                <HoundsSettings />
                            </Route>
                            <Route path="/app/profile/:dogId">
                                <DogProfile />
                            </Route>
                            <Route path="/login">
                                <HoundsLogin />
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
function PrivateRoute({children, ...rest}: any) {
    const {apiConfig} = React.useContext(ApiConfigContext);
    return (
        <Route
            {...rest}
            render={({location}) =>
                apiConfig.apiAuth ?
                    (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {from: location},
                            }}
                        />
                    )
            }
        />
    );
}
