import React from "react";
import {
    Link,
} from "react-router-dom";

import {Typography} from "@material-ui/core";

import * as api from "@happyhoundhotel/hounds-ts";
import "./ListItem.css";

interface IListItemProps {
    sevent: api.IScheduleEvent
}

/**
 * @param {IListItemProps} props object to determine render
 * @return {React.Node} React element to render
 */
function ListItem(props: IListItemProps) {
    const classes = `event-text ${props.sevent.type}`;
    const insideText = <Typography className={classes}>
        {getEventText(props.sevent)}
    </Typography>;
    if (props.sevent.dogId) {
        return <Link to={`/app/profile/${props.sevent.dogId}`}>
            {insideText}
        </Link>;
    } else {
        return insideText;
    }
}

/**
 * @param {api.IScheduleEvent} sevent event to render
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
