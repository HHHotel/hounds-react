import React from "react";
import DogForm from "../DogForm";
import { render, fireEvent, cleanup } from "@testing-library/react";
// eslint-disable-next-line no-unused-vars
import * as api from "@happyhoundhotel/hounds-ts";

test("Loads and displays form", () => {
    const click = jest.fn();

    const { queryByText, queryByLabelText } = render(
        <DogForm onSubmit={click} />
    );

    const submitButton = queryByText(/submit/i);
    expect(submitButton).toBeInTheDocument();
    const nameInput = queryByLabelText(/dog name/i);
    expect(nameInput).toBeInTheDocument();
    const clientInput = queryByLabelText(/client name/i);
    expect(clientInput).toBeInTheDocument();

    submitButton && fireEvent.click(submitButton);
    expect(click).toBeCalled();
});

test("Creates proper dog object", () => {
    const click = (dog: api.IHoundDog) => {
        expect(dog).toStrictEqual({
            id: "",
            name: "Moose R",
            clientName: "Haley Rochford",
            activeClient: true,
            bookings: [],
        });
    };

    const { queryByText, queryByLabelText } = render(
        <DogForm onSubmit={click} />
    );
    const nameInput = queryByLabelText(/dog name/i);
    const clientInput = queryByLabelText(/client name/i);
    const submitButton = queryByText(/submit/i);

    nameInput && fireEvent.change(nameInput, { target: { value: "Moose R" } });
    clientInput &&
        fireEvent.change(clientInput, { target: { value: "Haley Rochford" } });
    submitButton && fireEvent.click(submitButton);
});

afterEach(cleanup);
