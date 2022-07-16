import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Meda from "components/EventCard/Media";

describe("<EventCard/Media />", () => {
  it("should render a non playable item", () => {
    render(
      <Meda
        priority
        name="ZZ Top"
        sizes="100vw"
        spotifyTracks={[]}
        appleMusicTracks={[]}
        images={{
          landscape: "https://big-beard.jpg",
        }}
      />,
      { wrapper: ChakraProvider }
    );

    const img = screen.getByRole("img", {
      name: "ZZ Top",
    });

    expect(img).toHaveAttribute("alt", "ZZ Top");
    expect(img).toHaveAttribute("sizes", "100vw");
    expect(img).toHaveAttribute("data-nimg", "responsive");

    expect(screen.queryByTestId("play")).not.toBeInTheDocument();
  });

  it("should render a playable item", () => {
    render(
      <Meda
        priority
        name="ZZ Top"
        sizes="100vw"
        spotifyTracks={[
          {
            title: "Gimme all your lovin'",
          },
        ]}
        appleMusicTracks={[]}
        images={{
          landscape: "https://big-beard.jpg",
        }}
      />,
      { wrapper: ChakraProvider }
    );

    expect(screen.queryByTestId("play")).toBeInTheDocument();
  });
});
