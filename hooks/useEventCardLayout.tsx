import { useTheme } from "@chakra-ui/react";

/**
 * Serving properly sized images for the device / screen size is super important
 * for performance. The "sizes" attribute of the event card img is directly related to the grid
 * the cards sit within. This hook abstracts the layout logic away from any particular component.
 * Use values from the theme so that breakpoints etc. can be configured at theme level
 * without breaking responsive images.
 */
export const useEventCardLayout = () => {
  const theme = useTheme();
  const { sm, lg } = theme.breakpoints;
  const maxW = theme.sizes.container.lg;

  // TODO: images sizes could be more accurite because the layout contains spacing
  const sizes = [
    `(min-width: ${maxW}) calc(${maxW} / 3)`,
    `(min-width: ${lg}) calc(100vw / 3)`,
    `(min-width: ${sm}) calc(100vw / 2)`,
    "100vw",
  ].join(",");

  return {
    container: {
      maxW,
    },
    grid: {
      columns: {
        lg: 3,
        sm: 2,
        base: 1,
      },
    },
    image: {
      sizes,
    },
  };
};
