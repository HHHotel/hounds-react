// TODO refractor and take out some of the crud in here
import React from "react";
import {
    differenceInDays,
    differenceInMilliseconds,
} from "date-fns";

import * as api from "@happyhoundhotel/hounds-ts";
import { HoundsSearch } from "../components/HoundsSearch";
import { ApiConfigContext } from "../contexts";
import DogEventForm from "./DogEventForm";
import RepeatEventForm from "./RepeatEventForm";
// eslint-disable-next-line
import {RepeatOpts} from "./RepeatEventForm";

interface BookingFormProps {
    onSubmit?: (booking: api.IHoundBooking) => void
}

/**
 * @param {BookingFormProps} props element props
 * @return {React.ReactElement} Element to render
 * */
function BookingForm(props: BookingFormProps) {
    const [formIndex, setFormIndex] = React.useState(0);
    const [booking, setBooking] = React.useState({} as api.IHoundEvent);
    const { apiConfig } = React.useContext(ApiConfigContext);

    const onSelectDog = (dog: api.IHoundDog | api.IHoundEvent) => {
        dog = dog as api.IHoundDog;
        if (!dog.id) {
            // TODO alert error
            return;
        }

        setBooking({
            ...booking,
            id: dog.id,
        });
        setFormIndex(1);
    };

    const onSubmitBooking = (ev: api.IHoundEvent, repeat: boolean) => {
        const newBooking = {
            dogId: booking.id,
            ...booking,
            ...ev,
        };

        if (differenceInMilliseconds(ev.endDate, ev.startDate) < 0) {
            // TODO popup toast w/ error
            return;
        }
        if (ev.type === "daycare" &&
                differenceInDays(ev.endDate, ev.startDate) != 0) {
            // TODO popup toast w/ error
            return;
        }
        if (!repeat) { // one event just call the api and exit
            if (props.onSubmit) {
                props.onSubmit(newBooking);
            } else {
                api.addEvent(newBooking, apiConfig);
            }
            return;
        }

        setBooking(newBooking);
        setFormIndex(2);
    };

    const onRepeatSubmit = (opts: RepeatOpts) => {
        const evlist: api.IHoundEvent[] = [];
        let ev = {
            ...booking,
        };
        while (differenceInDays(opts.stop, ev.startDate) >= 0) {
            evlist.push(ev);
            api.addEvent(ev, apiConfig);
            ev = {
                ...ev,
                startDate: opts.incFunc(ev.startDate),
                endDate: opts.incFunc(ev.endDate),
            };
        }
        console.log(opts);
        console.log(evlist);
    };

    const subForms = [
        <HoundsSearch key="houndsSearch"
            filter={(el: any) => el.name ? true : false}
            onSelect={onSelectDog}/>,
        <DogEventForm key="dogEvent" onSubmit={onSubmitBooking}/>,
        <RepeatEventForm key="repeatForm" onSubmit={onRepeatSubmit}/>,
    ];

    return subForms[formIndex];
}

export default BookingForm;
