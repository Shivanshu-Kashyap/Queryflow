import { CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import { AppContextProvider } from "./context/AppContext";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/Themecontext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContextProvider>
          <CssBaseline />
          <Home />
        </AppContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;