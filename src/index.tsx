import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import theme from "./styles/theme";

const LazyComponent = (props: { component: React.ElementType }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <props.component />
  </Suspense>
);

const SignIn = lazy(() => import("./pages/SignIn"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="/signin"
              element={<LazyComponent component={SignIn} />}
            />
          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
