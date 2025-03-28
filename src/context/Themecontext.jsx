import { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import getTheme from "../styles/theme";

const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);