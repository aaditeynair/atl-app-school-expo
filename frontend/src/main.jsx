import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/rootReducer.js";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const store = configureStore({
  reducer: rootReducer,
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#20212b",
    },
    secondary: {
      main: "#4e4e5e",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
