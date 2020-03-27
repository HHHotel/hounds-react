import React from "react";
import { TextField, StandardProps } from "@material-ui/core";
import { DatePicker, DateTimePicker, TimePicker } from "@material-ui/pickers";
type InputData = string | Date | number;
export interface FormInputProps extends StandardProps<"root", "root"> {
    value: InputData;
    onValChange: (val: InputData) => void;
}
export const TextInput = (props: FormInputProps) => {
    return (
        <TextField
            className={props.className}
            style={props.style}
            inputRef={props.ref}
            value={props.value}
            onChange={(ev) => props.onValChange(ev.target.value)}
        ></TextField>
    );
};

export const NumberInput = (props: FormInputProps) => {
    return (
        <TextField
            type="number"
            className={props.className}
            style={props.style}
            inputRef={props.ref}
            value={props.value}
            onChange={(ev) => props.onValChange(ev.target.value)}
        ></TextField>
    );
};

export const DateInput = (props: FormInputProps) => {
    return (
        <DatePicker
            className={props.className}
            style={props.style}
            inputRef={props.ref}
            value={props.value}
            onChange={(date) => {
                if (date) props.onValChange(date);
            }}
        ></DatePicker>
    );
};

export const DateTimeInput = (props: FormInputProps) => {
    return (
        <DateTimePicker
            className={props.className}
            style={props.style}
            inputRef={props.ref}
            value={props.value}
            onChange={(date) => {
                if (date) props.onValChange(date);
            }}
        ></DateTimePicker>
    );
};

export const TimeInput = (props: FormInputProps) => {
    return (
        <TimePicker
            className={props.className}
            style={props.style}
            inputRef={props.ref}
            value={props.value}
            onChange={(date) => {
                if (date) props.onValChange(date);
            }}
        ></TimePicker>
    );
};
