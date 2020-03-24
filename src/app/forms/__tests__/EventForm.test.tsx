import React from "react";
import EventForm from "../EventForm";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
// eslint-disable-next-line no-unused-var
import * as api from "@happyhoundhotel/hounds-ts";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const theme = createMuiTheme();

test("Loads and displays form", () => {
    const click = jest.fn();
    const element = <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
            <EventForm onSubmit={click} />
        </ThemeProvider>
    </MuiPickersUtilsProvider>;

    const { queryByText, queryByLabelText, queryByTestId } = render(element);

    const submitButton = queryByText(/submit/i);
    expect(submitButton).toBeInTheDocument();
    const textInput = queryByLabelText(/event text/i);
    expect(textInput).toBeInTheDocument();
    const startInput = queryByTestId("start-date");
    expect(startInput).toBeInTheDocument();
    const endInput = queryByTestId("end-date");
    expect(endInput).toBeInTheDocument();
    const typeInput = queryByLabelText(/type/i);
    expect(typeInput).toBeInTheDocument();

    submitButton && fireEvent.click(submitButton);
    expect(click).toBeCalled();
});

/*
test("Submits correct event", () => {
    const click = jest.fn();
    const element = <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
            <EventForm onSubmit={click} />
        </ThemeProvider>
    </MuiPickersUtilsProvider>;

    const {
        debug,
        queryByText,
        queryByLabelText,
    } = render(element);
    debug();

    const submitButton = queryByText(/submit/i);
    const textInput = queryByLabelText(/event text/i);
    textInput && fireEvent.change(textInput, { target: { value: "Testing" } });
    // const startInput = queryByTestId("start-date");
    const startInput = document.querySelector("input[name='startDate']");
    // console.log(startInput);
    startInput && fireEvent.change(
        startInput,
        new Date("10-10-1919 8:00"),
    );
    // const endInput = queryByTestId("end-date");
    const endInput = document.querySelector("input[name='endDate']");
    endInput && fireEvent.change(
        endInput,
        new Date("10-10-1919 16:00"),
    );
    const typeInput = queryByLabelText(/event type/i);
    typeInput && fireEvent.click(typeInput);
    const choice = queryByText(/general/i);
    choice && fireEvent.click(choice);

    submitButton && fireEvent.click(submitButton);
    expect(click).toHaveBeenCalledWith({
        text: "Testing",
        type: "general",
        startDate: new Date("10-10-1919 8:00"),
        endDate: new Date("10-10-1919 16:00"),
        id: "",
    });
});
*/

afterEach(cleanup);
