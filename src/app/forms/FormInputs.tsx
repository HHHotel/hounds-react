import React from "react";
import {
    TextField,
    BaseTextFieldProps,
    SelectProps,
    FormControl,
    InputLabel,
    Select,
} from "@material-ui/core";
import {
    DateTimePicker,
    DateTimePickerProps,
    TimePicker,
    TimePickerProps,
} from "@material-ui/pickers";
import { SettingsContext } from "../contexts";
import classes from "*.module.css";

interface BoundInput<T> {
    bind: [T, React.Dispatch<React.SetStateAction<T>>];
}
type TextInputProps = Partial<BaseTextFieldProps> & BoundInput<string>;
export const TextInput = ({
    required,
    name,
    label,
    bind,
    ...rest
}: TextInputProps) => (
    <TextField
        {...rest}
        fullWidth
        variant="outlined"
        margin="normal"
        required={required}
        label={label}
        name={name}
        value={bind[0]}
        onChange={(ev) => bind[1](ev.target.value)}
    />
);
type DateInputProps = Partial<DateTimePickerProps> & BoundInput<Date | null>;
export const DateTimeInput = ({
    required,
    name,
    label,
    bind,
    ...rest
}: DateInputProps) => {
    const { settings } = React.useContext(SettingsContext);
    return (
        <DateTimePicker
            {...rest}
            required={required}
            inputVariant="outlined"
            name={name}
            aria-label={label?.toString()}
            minutesStep={settings.eventTimeStep}
            variant="inline"
            label="Start"
            onChange={(uval) => (uval ? bind[1](uval) : undefined)}
            value={bind[0]}
        />
    );
};

type TimeInputProps = Partial<TimePickerProps> & BoundInput<Date | null>;
export const TimeInput = ({
    required,
    label,
    name,
    bind,
    children,
    ...rest
}: TimeInputProps) => {
    React.useState();
    const { settings } = React.useContext(SettingsContext);
    return (
        <TimePicker
            {...rest}
            minutesStep={settings.eventTimeStep}
            inputVariant="outlined"
            name={name}
            aria-label={label?.toString()}
            required
            variant="inline"
            label={label}
            onChange={(uval) => (uval ? bind[1](uval) : undefined)}
            value={bind[0]}
        />
    );
};

type SelectInputProps = Partial<SelectProps> & BoundInput<string>;
export const SelectInput = ({
    required,
    label,
    name,
    bind,
    children,
    ...rest
}: SelectInputProps) => (
    <FormControl>
        <InputLabel>{label}</InputLabel>
        <Select
            {...rest}
            required={required}
            native
            variant="outlined"
            aria-label={label?.toString()}
            name={name}
            value={bind[0]}
            onChange={(ev) => bind[1](ev.target.value as string)}
        >
            {children}
        </Select>
    </FormControl>
);
