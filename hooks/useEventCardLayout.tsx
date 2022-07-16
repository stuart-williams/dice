import { useTheme } from "@chakra-ui/react";

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
        base: 1,
        sm: 2,
        lg: 3,
      },
    },
    image: {
      sizes,
    },
  };
};
