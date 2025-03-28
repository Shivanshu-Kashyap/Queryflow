import { createTheme } from "@mui/material/styles"
import { red } from "@mui/material/colors"

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        // Keep white for light mode, but use a darker color for dark mode
        main: mode === "light" ? "#fff" : "#1e1e1e",
        light: mode === "light" ? "#ffffff" : "#2c2c2c",
        dark: mode === "light" ? "#f7f7f7" : "#121212",
        contrastText: mode === "light" ? "#066dc9" : "#90caf9",
      },
      secondary: {
        main: mode === "light" ? "#6d7e8f" : "#a1b4c4",
        light: mode === "light" ? "#8fa0b1" : "#c3d7e6",
        dark: mode === "light" ? "#4b5c6d" : "#7d91a2",
        contrastText: mode === "light" ? "#fff" : "#000",
      },
      primaryButton: {
        main: mode === "light" ? "#066dc9" : "#2196f3",
        light: mode === "light" ? "#3389d5" : "#4dabf5",
        dark: mode === "light" ? "#0451a5" : "#1769aa",
        contrastText: "#fff",
      },
      primaryDarkIcon: {
        main: mode === "light" ? "#465f6e" : "#a1b4c4",
      },
      error: {
        main: red.A400,
      },
      background: {
        light: mode === "light" ? "#eef2f4" : "#2c2c2c",
        default: mode === "light" ? "#fff" : "#121212",
        dark: mode === "light" ? "#022242" : "#000",
        primaryButton: mode === "light" ? "#066dc9" : "#2196f3",
        paper: mode === "light" ? "#fff" : "#1e1e1e",
      },
      text: {
        primary: mode === "light" ? "#066dc9" : "#90caf9",
        secondary: mode === "light" ? "#000" : "#b0bec5",
        primaryDark: mode === "light" ? "#d1d1c9" : "#fff",
        secondaryDark: mode === "light" ? "#465f6e" : "#c3ccd4",
        disabled: mode === "light" ? "rgba(0, 0, 0, 0.38)" : "rgba(255, 255, 255, 0.5)",
      },
      action: {
        active: mode === "light" ? "#384854" : "#90caf9",
        hover: mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.08)",
        selected: mode === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.16)",
      },
      divider: mode === "light" ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)",
    },
    typography: {
      fontFamily: [
        "Montserrat",
        "Mukta",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 600,
        textTransform: "none",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === "light"
                ? "0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07), 0px 1px 10px 0px rgba(0,0,0,0.06)"
                : "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  })

export default getTheme

