import React from "react";
// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";

export interface HoundsSettings {
    apiUrl: string,
    hours: {
        opening: {
            am: number,
            pm: number,
        },
        closing: {
            am: number,
            pm: number,
        }
    },
}

const SETTINGS_KEY = "HOUNDS_WEB_SETTINGS";
// Loads settings from localStorage
export const loadSettings = (): HoundsSettings => {
    const defaultSettings = {
        apiUrl: window.location.host,
        hours: {opening: {am: 8, pm: 16}, closing: {am: 10, pm: 18}},
    };
    const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");

    return settings || defaultSettings;
};

export const setSettings = (usettings: HoundsSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(usettings));
};

const AUTH_KEY = "HOUNDS_AUTH";
// Loads settings from localStorage
export const loadApiConfig = (): api.IHoundsConfig => {
    const settings = loadSettings();
    const stored = localStorage.getItem(AUTH_KEY);
    const auth = stored ? JSON.parse(stored) : null;
    return {
        apiURL: settings.apiUrl,
        apiVersion: "0.3.4", // api.version,
        apiAuth: auth,
    };
};

export const saveAuth = (auth: {username: string, token: string} | null) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
};

export const ApiConfigContext = React.createContext({
    apiConfig: loadApiConfig(),
    setAuth: saveAuth,
});
export const SettingsContext = React.createContext({
    settings: loadSettings(),
    setSettings,
});