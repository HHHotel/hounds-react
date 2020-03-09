import React from "react";
import {
    Input,
    Button,
    Grid,
} from "@material-ui/core";

// eslint-disable-next-line
import {SettingsProvider, HoundsSettings} from "../../util/settings/SettingsProvider";

interface SettingsProps {
    settingsProvider: SettingsProvider
}

/**
 * @param {SettingsProps} props
 * @return {React.ReactElement} el
 */
function SettingsPage(props: SettingsProps) {
    const sp = props.settingsProvider;
    const [settings, setSettings] = React.useState(sp.load());

    const saveSettings = (ev: React.FormEvent) => {
        ev.preventDefault();
        sp.save(settings);
    };

    return <form onSubmit={saveSettings}>
        <Grid container direction="column">
            <Input value={settings.apiUrl}
                onChange={(el) =>
                    setSettings({...settings, apiUrl: el.target.value})} />
            <Button variant="contained" type="submit"> Submit </Button>
        </Grid>
    </form>;
}

export default SettingsPage;
