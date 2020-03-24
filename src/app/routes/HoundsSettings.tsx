import React from "react";
import {
    Button,
    Grid,
    TextField,
    Container,
} from "@material-ui/core";
import {
    TimePicker,
} from "@material-ui/pickers";
import {
    startOfDay,
} from "date-fns";

import { SettingsContext } from "../contexts";

import HoundsNav from "../components/HoundsNav";

interface SettingsProps {
}

/**
 * @param {SettingsProps} props props for element
 * @return {React.ReactElement} el
 */
function HoundsSettings(props: SettingsProps) {
    const hoursToDate = ({ am, pm }: {am: number, pm: number}) => {
        const reduce = (h: number) => {
            const sod = startOfDay(new Date());
            sod.setHours(h);
            return sod;
        };
        return { am: reduce(am), pm: reduce(pm) };
    };

    const { settings, setSettings } = React.useContext(SettingsContext);
    const [url, setUrl] = React.useState(settings.apiUrl);
    const [eventTimeStep, setEventTimeStep] = React.useState(
        settings.eventTimeStep || 5,
    );
    const [opening, setOpening] = React.useState(
        hoursToDate(settings.hours.opening),
    );
    const [closing, setClosing] = React.useState(
        hoursToDate(settings.hours.closing),
    );

    const minMaxProps = { inputProps: { min: 1, max: 60 } };

    const saveSettings = (ev: React.FormEvent) => {
        ev.preventDefault();
        setSettings({
            apiUrl: url,
            hours: {
                opening: { am: opening.am.getHours(), pm: opening.pm.getHours() },
                closing: { am: closing.am.getHours(), pm: closing.pm.getHours() },
            },
            eventTimeStep,
        });
    };

    return <>
        <HoundsNav title="Settings" />
        <form onSubmit={saveSettings}>
            <Container maxWidth="xs">
                <Grid container alignContent="center" justify="center">
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
                        inputVariant="outlined"
                        views={["hours"]}
                        margin="normal"
                        value={opening.am}
                        onChange={(uval) =>
                            uval && setOpening({ ...opening, am: uval })} />
                    <TimePicker label="Closing AM"
                        inputVariant="outlined"
                        views={["hours"]}
                        margin="normal"
                        value={closing.am}
                        onChange={(uval) =>
                            uval && setClosing({ ...closing, am: uval })} />
                    <TimePicker label="Opening PM"
                        inputVariant="outlined"
                        views={["hours"]}
                        margin="normal"
                        value={opening.pm}
                        onChange={(uval) =>
                            uval && setOpening({ ...opening, pm: uval })} />
                    <TimePicker label="Closing PM"
                        inputVariant="outlined"
                        views={["hours"]}
                        margin="normal"
                        value={closing.pm}
                        onChange={(uval) =>
                            uval && setClosing({ ...closing, pm: uval })} />

                    <TextField value={eventTimeStep}
                        onChange={(el) =>
                            setEventTimeStep(
                                el.target.value ?
                                    parseInt(el.target.value, 10) :
                                    1,
                            )}
                        InputProps={minMaxProps}
                        type="number"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Event Time Step"
                        autoFocus
                    />

                    <Button fullWidth
                        color="primary"
                        variant="contained"
                        type="submit">
                    Save
                    </Button>
                </Grid>
            </Container>
        </form>
    </>;
}

export default HoundsSettings;
