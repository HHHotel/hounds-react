import {
    // eslint-disable-next-line
    SettingsProvider,
    // eslint-disable-next-line
    HoundsSettings,
    DEFAULT_SETTINGS,
} from "./SettingsProvider";

/**
 * Settings provider using local storage for the web
 * */
export class WebSettings implements SettingsProvider {
    private static LOCAL_STORAGE_KEY = "HOUNDS_WEB_SETTINGS";
    /**
     * Saves the settings given to the web localstorage
     * @param {HoundsSettings} settings to write
     * */
    public save(settings: HoundsSettings) {
        window.localStorage
            .setItem(WebSettings.LOCAL_STORAGE_KEY, JSON.stringify(settings));
    }

    /**
     * Loads the settings from the web localstorage
     * @return {HoundsSettings} settings object
     * */
    public load() {
        const settings = window.localStorage
            .getItem(WebSettings.LOCAL_STORAGE_KEY);

        return settings ? JSON.parse(settings) : DEFAULT_SETTINGS;
    }
}
