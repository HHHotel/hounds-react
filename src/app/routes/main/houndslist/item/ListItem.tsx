import React from "react";
import {
    Link,
} from "react-router-dom";

import {Typography} from "@material-ui/core";

import * as api from "@happyhoundhotel/hounds-ts";
import "./ListItem.css";
import { SettingsContext } from "../../../../contexts";

interface IListItemProps {
    sevent: api.IScheduleEvent
}

/**
 * @param {IListItemProps} props object to determine render
 * @return {React.ReactElement} React element to render
 */
function ListItem(props: IListItemProps) {
    const classes = `event-text ${props.sevent.type}`;
    const insideText = <Typography className={classes}>
        {getEventText(props.sevent)}
    </Typography>;

    return props.sevent.dogId ? (
        <Link to={`/app/profile/${props.sevent.dogId}`}>
            {insideText}
        </Link>
    ) : (
        insideText
    );
}

/**
 * @param {api.IScheduleEvent} sevent event to render
 * @return {string} event text
 */
function getEventText(sevent: api.IScheduleEvent) {
    const {settings} = React.useContext(SettingsContext);
    if (!sevent.startDate || !sevent.endDate) {
        return sevent.text;
    }

    const end = new Date(sevent.endDate);
    // Set event end for events that should default to opening -> closing
    switch (sevent.startDate.getHours()) {
    case settings.hours.opening.am:
        end.setHours(settings.hours.closing.am);
        break;
    case settings.hours.opening.pm:
        end.setHours(settings.hours.closing.pm);
        break;
    }

    const prepend = sevent.startDate &&
        api.getTimePrepend({...sevent, endDate: end});
    return `${prepend} ${sevent.text}`;
}

export default ListItem;
