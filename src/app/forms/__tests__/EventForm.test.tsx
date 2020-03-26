import React from "react";
import EventForm from "../EventForm";
import { render, fireEvent, cleanup } from "@testing-library/react";
// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const submitMock = jest.fn();
const element = ( // TODO Wrap becomes a shared util
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={createMuiTheme()}>
            <EventForm onSubmit={submitMock} />
        </ThemeProvider>
    </MuiPickersUtilsProvider>
);
const { getByTestId, debug } = render(element);

describe("Text Input", () => {
    const textInput = getByTestId("event-text") as HTMLInputElement;
    it("Has an event text input", () => {
        expect(textInput).toBeInTheDocument();
    });

    it("Can be changed", () => {
        fireEvent.change(textInput, {
            target: { value: "testing" },
        });
        expect(textInput.value).toBe("testing");
    });
});

describe("Type Input", () => {
    const typeInput = getByTestId("event-type") as HTMLSelectElement;
    it("Has an event type input", () => {
        expect(typeInput).toBeTruthy();
    });

    it("Can be changed", () => {
        fireEvent.change(typeInput, { target: { value: "grooming" } });
        expect(typeInput.value).toBe("grooming");
    });
});

describe("Date Inputs", () => {
    const startInput = getByTestId("start-date") as HTMLDivElement;
    const endInput = getByTestId("end-date") as HTMLDivElement;

    it("Has a end input", () => {
        expect(endInput).toBeTruthy();
    });

    it("End can be changed", () => {
        const evt = new CustomEvent("hnds-change", {
            detail: { target: { value: new Date("10-10-1919 8:00") } },
        });
        endInput.dispatchEvent(evt);
        // expect(endInput.value).toBe("March 8th");
    });

    it("Has a start input", () => {
        expect(startInput).toBeTruthy();
    });

    // it("Start can be changed", () => {
    //     act(() => {
    //         const evt = new CustomEvent("hnds-change", {
    //             detail: { target: { value: new Date("10-10-1919 16:00") } },
    //         });
    //         startInput.dispatchEvent(evt);
    //     });
    //     debug();
    //     // expect(startInput.value).toBe("March 8th");
    // });
});

describe("Submit Button", () => {
    const submitButton = getByTestId(
        "event-submit-button"
    ) as HTMLButtonElement;
    it("Has a submit button", () => {
        expect(submitButton).toBeTruthy();
    });

    // it("Submits on button click", () => {
    //     fireEvent.click(submitButton);
    //     expect(submitMock).toBeCalled();
    // });

    // it("Submits correct values", () => {
    //     fireEvent.click(submitButton);
    //     expect(submitMock).toBeCalledWith({
    //         text: "testing",
    //         type: "general",
    //         startDate: undefined,
    //         endDate: undefined,
    //     });
    // });
});

// expect(click).toBeCalledWith({
//     type: "grooming",
//     text: "testing",
//     startDate: new Date("10-10-1919"),
//     endDate: new Date("10-10-1919 8:00"),
//     id: ""
// });

// afterAll(cleanup);
