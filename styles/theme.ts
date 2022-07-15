import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    // more on brand
    blue: {
      50: "#e0edff",
      100: "#b1c8ff",
      200: "#7fa4ff",
      300: "#4d80ff",
      400: "#1e5bfe",
      500: "#0742e5",
      600: "#0033b3",
      700: "#002581",
      800: "#001650",
      900: "#000720",
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 0,
      },
    },
  },
});

export default theme;
