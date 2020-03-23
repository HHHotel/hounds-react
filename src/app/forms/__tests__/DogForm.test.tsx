import React from "react";
import DogForm from "../DogForm";
import renderer from "react-test-renderer";

test("form opens", () => {
    const component = renderer.create(
        <DogForm onSubmit={() => console.log} />
    );

    console.log(component.toJSON());

    expect(1 + 1).toBe(2);
});
