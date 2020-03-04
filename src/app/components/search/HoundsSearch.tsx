import React from "react";

import {
    Button,
    IconButton,
    Card,
    Typography,
    Divider,
    InputBase,
    Grid,
    makeStyles,
    createStyles,
    fade,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";

import {
    Search,
    Pets,
    Event,
} from "@material-ui/icons";

import {
    format,
} from "date-fns";

import {ApiConfig} from "../../..";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";
import {findEvents} from "@happyhoundhotel/hounds-ts";

const useStyles = makeStyles((theme: Theme) => createStyles({
    search: {
        "position": "relative",
        "borderRadius": theme.shape.borderRadius,
        "backgroundColor": fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        "marginTop": theme.spacing(2),
        "marginRight": theme.spacing(2),
        "marginLeft": 0,
        "width": "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("md")]: {
            width: 200,
        },
    },
    searchCard: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
    },
}));

interface SearchProps {
}

// eslint-disable-next-line
export function HoundsSearch(props: SearchProps): React.ReactElement {
    const classes = useStyles();
    const [searchText, updateSearch] = React.useState("");
    // eslint-disable-next-line
    const [results, updateResults] = React.useState([] as any);
    const apiConfig = React.useContext(ApiConfig);

    // eslint-disable-next-line
    function search() {
        findEvents(searchText, apiConfig).then((res) => {
            console.log(res);
            updateResults(res.data);
        });
    }

    return <>
        <Grid className={classes.search}
            container
            wrap="nowrap"
            direction="row">
            <div className={classes.searchIcon}>
                <Search />
            </div>
            <InputBase value={searchText}
                onChange={(ev) => updateSearch(ev.target.value)}
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{"aria-label": "search"}}/>

            <Button variant="contained"
                onClick={() => search()}>
                Search
            </Button>
        </Grid>
        <Grid container
            direction="column">
            {
                results.slice(0, 10).map((res: any, index: any) =>
                    <ResultCard key={index} item={res}/>,
                )
            }
        </Grid>
    </>;
}

// eslint-disable-next-line
function ResultCard(props: any) {
    const classes = useStyles();

    // eslint-disable-next-line
    function getHeadingText() {
        return props.item.name || props.item.text;
    }
    // eslint-disable-next-line
    function getSubtitleText() {
        if (props.item.text) {
            const start = new Date(props.item.startDate);
            const end = new Date(props.item.endDate);

            // TODO grab format logic from old app
            return `${format(start, "MMM d")} -> ${format(end, "MMM d Y")}`;
        }

        return props.item.clientName || props.item.startDate;
    }


    return <>
        <Card className={classes.searchCard}>
            <Grid container
                alignContent="space-between"
                justify="space-between"
                direction="row">
                <div style={{flexGrow: 10}}>
                    <Typography variant="h6">
                        {getHeadingText()}
                    </Typography>
                    <Divider />
                    <Typography variant="subtitle1"
                        style={{fontStyle: "italic"}}>
                        {getSubtitleText()}
                    </Typography>
                </div>
                <IconButton>
                    { !props.item.text && <Pets /> }
                    { props.item.text && <Event /> }
                </IconButton>
            </Grid>
        </Card>
    </>;
}
