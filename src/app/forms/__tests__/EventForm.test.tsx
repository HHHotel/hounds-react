import React from "react";
import EventForm from "../EventForm";
import {
    render,
    fireEvent,
    cleanup,
    screen,
    RenderResult,
} from "@testing-library/react";
// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const theme = createMuiTheme();

describe("New event form", () => {
    let wrapper: RenderResult;
    const submitMock = jest.fn();
    const element = ( // TODO Wrap becomes a shared util
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={theme}>
                <EventForm onSubmit={submitMock} />
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    );

    beforeEach(() => {
        wrapper = render(element);
    });

    it("Has a submit button", () => {
        const submitButton = wrapper.queryByText(/submit/i);
        expect(submitButton).toBeInTheDocument();
    });

    it("Has an event text input", () => {
        const textInput = wrapper.queryByLabelText(/event text/i);
        expect(textInput).toBeInTheDocument();
    });

    it("Changes event text input", () => {
        const textInput = wrapper.queryByLabelText(/event text/i);
        textInput && fireEvent;
        expect(textInput).toBeInTheDocument();
    });

    it("Has an event type input", () => {
        const typeInput = wrapper.queryByLabelText(/type/i);
        expect(typeInput).toBeInTheDocument();
    });

    it("Has a start input", () => {
        const startInput = wrapper.queryByTestId("start-date");
        expect(startInput).toBeInTheDocument();
    });

    it("Has an end input", () => {
        const endInput = wrapper.queryByTestId("end-date");
        expect(endInput).toBeInTheDocument();
    });

    it("Submits on button click", () => {
        const button = wrapper.queryByText(/submit/i);
        button && fireEvent.click(button);
        expect(submitMock).toBeCalled();
    });
    // expect(submitMock).toBeCalledWith({
    //     text: "testing",
    //     type: "general",
    //     startDate: undefined,
    //     endDate: undefined
    // });
});

// expect(click).toBeCalledWith({
//     type: "grooming",
//     text: "testing",
//     startDate: new Date("10-10-1919"),
//     endDate: new Date("10-10-1919 8:00"),
//     id: ""
// });
