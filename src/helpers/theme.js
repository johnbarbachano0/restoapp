import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#005555",
      ...(mode === "dark" && {
        main: "#A1E3D8",
      }),
    },
    nuetral: {
      main: "#EEEEEE",
      ...(mode === "dark" && {
        main: "#8D8DAA",
      }),
    },
    ...(mode === "dark" && {
      background: {
        default: "#1f1f38",
        paper: "#1f1f38",
      },
    }),
    text: {
      ...(mode === "light"
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: "#fff",
            secondary: grey[500],
          }),
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    merri: {
      fontFamily: "Merriweather",
    },
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingTop: "4px",
          "&:last-child": { paddingBottom: "8px" },
        },
      },
    },
  },
});

export default function Theme(props) {
  const { dark } = useSelector((state) => state.appearance);
  const darkModeTheme = createTheme(getDesignTokens(dark ? "dark" : "light"));

  return <ThemeProvider theme={darkModeTheme}>{props.children}</ThemeProvider>;
}
