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
    searchContainer: {
        overflow: "hidden",
        overflowY: "scroll",
        width: "100%",
        height: "90vh",
        [theme.breakpoints.up("md")]: {
            height: "50vh",
        },
    },
    search: {
        "position": "relative",
        "borderRadius": theme.shape.borderRadius,
        "backgroundColor": fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        "margin": theme.spacing(1, 0),
        "width": "90%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
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
        width: "100%",
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
        width: "100%",
    },
}));

interface SearchProps {
    style?: React.CSSProperties,
    onSelect?: (result: api.IHoundEvent | api.IHoundDog) => void
    filter?: (result: api.IHoundEvent | api.IHoundDog) => boolean
}

// eslint-disable-next-line
export function HoundsSearch(props: SearchProps): React.ReactElement {
    const classes = useStyles();
    const [searchText, updateSearch] = React.useState("");
    const resArr: Array<api.IHoundDog | api.IHoundEvent> = [];
    const [results, updateResults] = React.useState(resArr);
    const apiConfig = React.useContext(ApiConfig);
    const filter = props.filter ? props.filter : () => true;

    // eslint-disable-next-line
    function search() {
        findEvents(searchText, apiConfig).then((res) => {
            console.log(res);
            updateResults(res.data);
        });
    }

    return <div className={classes.searchContainer} style={props.style}>
        <Grid className={classes.search}
            container
            wrap="nowrap"
            direction="row">
            <div className={classes.searchIcon}>
                <Search />
            </div>
            <InputBase value={searchText}
                onChange={(ev) => updateSearch(ev.target.value)}
                onKeyDown={(ev) => ev.key === "Enter" ? search() : null}
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
        <Grid container direction="column">
            {
                results.slice(0, 100)
                    .filter(filter)
                    .map((res: any, index: any) =>
                        <ResultCard key={index}
                            item={res}
                            type={res.name ? "dog" : "event"}
                            onSelect={props.onSelect}/>,
                    )
            }
        </Grid>
    </div>;
}

interface ResultCardProps {
    item: api.IHoundEvent | api.IHoundDog
    type: "dog" | "event"
    onSelect?: (result: api.IHoundEvent | api.IHoundDog) => void
}

// eslint-disable-next-line
function ResultCard(props: ResultCardProps) {
    const classes = useStyles();

    // eslint-disable-next-line
    function getHeadingText() {
        if (props.type === "dog") {
            const item = props.item as api.IHoundDog;
            return item.name;
        } else {
            const item = props.item as api.IHoundEvent;
            return item.text;
        }
    }
    // eslint-disable-next-line
    function getSubtitleText() {
        if (props.type === "event") {
            const item = props.item as api.IHoundEvent;
            const start = new Date(item.startDate);
            const end = new Date(item.endDate);

            // TODO grab format logic from old app
            return `${format(start, "MMM d")} -> ${format(end, "MMM d Y")}`;
        }
        const item = props.item as api.IHoundDog;

        return item.clientName;
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
                <IconButton onClick={
                    () => props.onSelect ? props.onSelect(props.item) : null
                }>
                    { props.type === "dog" && <Pets /> }
                    { props.type === "event" && <Event /> }
                </IconButton>
            </Grid>
        </Card>
    </>;
}
