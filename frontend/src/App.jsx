import { Route, Routes } from "react-router-dom";
import Index from "./routes/index";
import Signup from "./routes/signup";
import Login from "./routes/login";
import PrivateRoute from "./components/PrivateRoute";
import { CssBaseline } from "@mui/material";
import "./styles/main.css";

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
        </Routes>
      </div>
    </>
  );
};

export default App;
