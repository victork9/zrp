import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

jest.mock("./src/server/api", () => ({
    getPockemons: jest.fn().mockResolvedValue({
        data: [
            {
                ability: {
                    name: "imposter",
                    url: "https://pokeapi.co/api/v2/ability/150/",
                },
                is_hidden: true,
                slot: 3,
            },
            {
                ability: {
                    name: "limber",
                    url: "https://pokeapi.co/api/v2/ability/7/",
                },
                is_hidden: false,
                slot: 1,
            },
        ],
        status: 200,
    }),
}));

import App from "./App";

describe("Testing app", () => {
    it("Should render corretly", () => {
        const tree = render(<App />);
        expect(tree).toMatchSnapshot();
    });
    it("Should find elements", () => {
        const tree = render(<App />);
        const findTexts = tree.getByTestId("View_Container_Search");
        expect(findTexts).toBeTruthy();
    });
    it("Should change TextInput", () => {
        const tree = render(<App />);
        const findTexts = tree.getByTestId("TextInput_Search");

        fireEvent.changeText(findTexts, "ditto");
        expect(findTexts.props.value).toBe("ditto");
    });
    it("Should call api success", () => {
        const tree = render(<App />);
        const findTexts = tree.getByTestId("TextInput_Search");
        const pressable = tree.getByTestId("Pressable_Search");

        fireEvent.changeText(findTexts, "ditto");
        fireEvent.press(pressable);
        waitFor(() => {
            expect(tree.getByTestId("Flatlist_Container")).toBeTruthy();
        });
				expect(tree).toMatchSnapshot();
    });
});
