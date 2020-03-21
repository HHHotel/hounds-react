import React from "react";
import {
    makeStyles,
} from "@material-ui/styles";
import {format} from "date-fns";
import ListItem from "./item/ListItem";
import {
    Card,
    Grid,
    Paper,
    Typography,
} from "@material-ui/core";
// eslint-disable-next-line
import { Theme } from "@material-ui/core";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";

const useStyles = makeStyles((theme: Theme) => ({
    dayCard: {
        margin: 5,
        height: "100%",
    },
    dayList: {
        overflowY: "auto",
        height: "calc(100% - 2rem)",
        marginBottom: "1rem",
    },
    dayHeading: {
        margin: theme.spacing(0),
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        height: "2rem",
        width: "100%",
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark,
    },
    weekGrid: {
        height: "90%",
    },
    weekGridChild: {
        marginBottom: theme.spacing(1),
        height: "100%",
    },
}));

interface IHoundsListProps {
    dates: Date[],
    weekList: api.IScheduleEvent[][],
    className?: string,
}

/**
 * @param {IHoundsListProps} props to render list
 * @return {React.Node} react element to render
 */
function HoundsList(props: IHoundsListProps) {
    const classes = useStyles();
    const weekList = props.weekList
        .map((day) => day.sort(api.compareScheduleEvents)
            .map((ev) => <ListItem sevent={ev} key={ev.id} />),
        );

    return <div className={props.className}>
        <Grid container
            className={classes.weekGrid}
            direction="row"
            wrap="wrap">
            {
                weekList.map((el, index) => (
                    <DayCard key={index}
                        el={el}
                        date={props.dates[index]} />
                ))
            }
        </Grid>
    </div>;
}

export default HoundsList;

interface IDayCardProps {
    el: React.ReactElement,
    date: Date,
}

// eslint-disable-next-line
function DayCard(props: IDayCardProps) {
    const classes = useStyles();
    return <>
        <Grid className={classes.weekGridChild}
            item={true}
            xs={12}
            sm={6}
            md={4}
            lg={3}>
            <Card className={classes.dayCard}
                raised={true}>
                <Paper className={classes.dayHeading}
                    elevation={0} >
                    <Typography variant="h5"
                        align="center">
                        {format(props.date, "E dd")}
                    </Typography>
                </Paper>
                <Grid className={classes.dayList} container
                    wrap="nowrap"
                    direction="column">
                    {props.el}
                </Grid>
            </Card>
        </Grid>
    </>;
}
