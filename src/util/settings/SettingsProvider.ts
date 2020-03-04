// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";

export interface HoundsSettings {
    apiUrl: string
    auth: api.IHoundAuth,
    // TODO add settings options
    // * Opening/Closing
    // * init date
    // * local storage
    // * alt api location
}

export interface SettingsProvider {
    load: () => HoundsSettings
    save: (newSettings: HoundsSettings) => void
}

const windowUrl = `${window.location.protocol}//${window.location.host}`;

export const DEFAULT_SETTINGS: HoundsSettings = {
    apiUrl: windowUrl || "http://localhost:8080",
    auth: {
        username: "",
        token: "",
    },
};
