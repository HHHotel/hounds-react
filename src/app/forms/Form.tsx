import React, { FormEvent } from "react";
import {
    TextInput,
    DateInput,
    DateTimeInput,
    TimeInput,
    NumberInput,
} from "./FormInputs";

type FormDataType = "string" | "number" | "Date" | "DateTime" | "Time";

const FORM_MAP = new Map<string, any>();
FORM_MAP.set("string", TextInput);
FORM_MAP.set("number", NumberInput);
FORM_MAP.set("Date", DateInput);
FORM_MAP.set("DateTime", DateTimeInput);
FORM_MAP.set("Time", TimeInput);

interface FormSchema {
    data: Map<string, FormDataType>;
}

interface FormProps {
    schema: FormSchema;
    onSubmit: (data: Map<string, any>) => void;
    initalState?: Map<string, any>;
}

function Form(props: React.PropsWithChildren<FormProps>) {
    const [state, setState] = React.useState(
        props.initalState || new Map<string, any>()
    );
    let inputs = [];
    for (let [key, value] of props.schema.data.entries()) {
        const FormInput = FORM_MAP.get(key);
        inputs.push(
            <FormInput
                name={key}
                value={value}
                onChange={(val: any) => {
                    state.set(key, val);
                    setState(state);
                }}
            />
        );
    }
    const onSubmit = (ev: FormEvent) => {
        ev.preventDefault(); // TODO Check state
        props.onSubmit(state);
    };

    return <form onSubmit={onSubmit}>{inputs}</form>;
}

export default Form;
