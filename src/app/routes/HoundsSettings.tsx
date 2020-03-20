import React from "react";
import {
    Button,
    Grid,
    TextField,
} from "@material-ui/core";
import {
    TimePicker,
} from "@material-ui/pickers";
import {
    startOfDay,
} from "date-fns";

import {SettingsContext} from "../contexts";

interface SettingsProps {
}

/**
 * @param {SettingsProps} props props for element
 * @return {React.ReactElement} el
 */
function HoundsSettings(props: SettingsProps) {
    const hoursToDate = ({am, pm}: {am: number, pm: number}) => {
        const reduce = (h: number) => {
            const sod = startOfDay(new Date());
            sod.setHours(h);
            return sod;
        };
        return {am: reduce(am), pm: reduce(pm)};
    };

    const {settings, setSettings} = React.useContext(SettingsContext);
    const [url, setUrl] = React.useState(settings.apiUrl);
    const [opening, setOpening] = React.useState(
        hoursToDate(settings.hours.opening),
    );
    const [closing, setClosing] = React.useState(
        hoursToDate(settings.hours.closing),
    );

    const saveSettings = (ev) => {
        ev.preventDefault();
        console.log(opening, closing);
        setSettings({
            apiUrl: url,
            hours: {
                opening: {am: opening.am.getHours(), pm: opening.pm.getHours()},
                closing: {am: closing.am.getHours(), pm: closing.pm.getHours()},
            },
        });
    };

    return <form onSubmit={saveSettings}>
        <Grid container direction="column">
            <TextField onChange={(el) => setUrl(el.target.value)}
                value={url}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="API URL"
                autoFocus
            />
            <TimePicker label="Opening AM"
                views={["hours"]}
                value={opening.am}
                onChange={(uval) =>
                    uval && setOpening({...opening, am: uval})} />

            <TimePicker label="Closing AM"
                views={["hours"]}
                value={closing.am}
                onChange={(uval) =>
                    uval && setOpening({...closing, am: uval})} />

            <TimePicker label="Opening PM"
                views={["hours"]}
                value={opening.pm}
                onChange={(uval) =>
                    uval && setOpening({...opening, pm: uval})} />

            <TimePicker label="Closing PM"
                views={["hours"]}
                value={closing.pm}
                onChange={(uval) =>
                    uval && setOpening({...closing, pm: uval})} />

            <Button color="primary"
                variant="contained"
                type="submit">
                    Save
            </Button>
        </Grid>
    </form>;
}

export default HoundsSettings;
