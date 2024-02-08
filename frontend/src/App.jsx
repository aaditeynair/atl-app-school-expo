import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import PrivateRoute from "./components/PrivateRoute";

import Index from "./routes/index";
import Signup from "./routes/signup";
import Login from "./routes/login";
import NewSession from "./routes/new-session";
import "./main.css";

const App = () => {
  return (
    <>
      <CssBaseline />
      <div className="m-16">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Index />
              </PrivateRoute>
            }
          />
          <Route path="login/" element={<Login />} />
          <Route path="signup/" element={<Signup />} />
          <Route
            path="/new-session"
            element={
              <PrivateRoute>
                <NewSession />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
