import React from "react";

import ListItem from "./HoundsListItem/ListItem";
import {Divider} from "@material-ui/core";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";
import week from "./week.json";


interface IHoundsListProps {
}

/**
 * @param {IHoundsListProps} props to render list
 * @return {React.Node} react element to render
 */
function HoundsList(props: IHoundsListProps) {
    // eslint-disable-next-line
    function convertJsonEvent(event: any) : api.IHoundBooking {
        if (event.startDate) {
            return api.fromApiBooking(event);
        } else {
            return event;
        }
    }

    const weekList = week.map(
        (day: any) => day.map(convertJsonEvent)
            .sort(api.compareScheduleEvents)
            .map((ev: any) => <ListItem sevent={ev} key={ev.id}/>),
    );

    return <>
        {weekList.map((el, index) => <div key={index}>{el} <Divider /> </div>)}
    </>;
}

export default HoundsList;
