import React from "react";

import {Typography} from "@material-ui/core";
// eslint-disable-next-line
import {Theme} from "@material-ui/core";

import * as api from "@happyhoundhotel/hounds-ts";
import "./ListItem.css";

interface IListItemProps {
    sevent: api.IHoundBooking
}

/**
 * @param {any} props object to determine render
 * @return {React.Node} React element to render
 */
function ListItem(props:any) {
    const classes = `event-text ${props.sevent.type}`;
    return <Typography className={classes}>
        {getEventText(props.sevent)}
    </Typography>;
}

/**
 * @param {api.IScheduleEvent} sevent
 * @return {string} event text
 */
function getEventText(sevent: api.IScheduleEvent) {
    if (!sevent.startDate) {
        return sevent.text;
    }
    const prepend = sevent.startDate && api.getTimePrepend(sevent);
    return `${prepend} ${sevent.text}`;
}

export default ListItem;
