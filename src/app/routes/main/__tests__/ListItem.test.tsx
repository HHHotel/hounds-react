import React from "react";
import ListItem from "../item/ListItem";
import { render, fireEvent, cleanup } from "@testing-library/react";
// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";

test("", () => {
    /* 1594825200000|1594861225356|general|Test|169730113711560137 */
    const element = (
        <ListItem
            sevent={{
                startDate: new Date(1594825200000),
                endDate: new Date(1594861225356),
                type: "general",
                text: "test",
                id: "169730113711560137",
                dogId: "",
            }}
        />
    );

    const ren = render(element);
    // ren.debug();
});

afterEach(cleanup);
