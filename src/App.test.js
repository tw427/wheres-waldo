import React from "react";
import "@testing-library/jest-dom";
import { act } from "react-test-renderer";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App / Main components", () => {
  it("Render image container and image", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const imageContainer = screen.getByRole("main", {
      name: "image-container",
    });
    const pokemonImage = screen.getByRole("img", { name: "pokemon-waldo" });

    expect(imageContainer).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
  });

  it("Render Navbar with timer and character sprite images", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const navbar = screen.getByRole("nav");
    const mewSprite = screen.getByRole("img", { name: "mew-sprite" });
    const ponytaSprite = screen.getByRole("img", { name: "ponyta-sprite" });
    const eeveeeSprite = screen.getByRole("img", { name: "eevee-sprite" });
    const abraSprite = screen.getByRole("img", { name: "abra-sprite" });
    const scoreTimer = screen.getByTestId("highscore-timer");

    expect(navbar).toBeInTheDocument();
    expect(navbar).toContainElement(mewSprite);
    expect(navbar).toContainElement(ponytaSprite);
    expect(navbar).toContainElement(eeveeeSprite);
    expect(navbar).toContainElement(abraSprite);
    expect(navbar).toContainElement(scoreTimer);
  });

  it("Render how-to-play button and display how-to-play modal upon click", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const howToPlayBtn = screen.getByRole("button", { name: "how-to-play" });
    const howToPlayModal = screen.getByTestId("how-to-modal");

    expect(howToPlayBtn).toBeInTheDocument();
    expect(howToPlayModal).toHaveClass("hide-modal");

    act(async () => {
      await user.click(howToPlayModal);
    });

    await waitFor(() => {
      expect(howToPlayModal).toHaveClass("show-modal");
    });
  });
});