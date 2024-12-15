import React from "react";
import { UserContextProvider } from "./context/UserContext";
import Main from "./Main";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* <CssBaseline /> */}
      <UserContextProvider>
        <Main />
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;
