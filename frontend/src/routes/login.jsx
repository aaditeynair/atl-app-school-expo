import { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../redux/userSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    axios
      .post("http://localhost:3000/api/login/", null, {
        params: {
          email,
          password,
        },
      })
      .then((res) => {
        const { user, token } = res.data;

        localStorage.setItem("token", token);
        dispatch(setUser(user));
        navigate("/");
      })
      .catch((e) => {
        if (e.response.data.error === "Wrong Email") {
          setError("The email you entered does not belong to any account");
        } else if (e.response.data.error === "Wrong Password") {
          setError("Email and password don't match");
        } else {
          setError("Something went wrong! Please try again later");
        }
      });
  };
  return (
    <>
      <div className="m-12 mt-24 text-center">
        <h1 className="font-bold text-5xl">Login</h1>
        {error && (
          <Alert
            className="w-1/3 mx-auto mt-8"
            severity="error"
            variant="filled"
          >
            {error}
          </Alert>
        )}
        <form className="w-1/3 mx-auto mt-8 space-y-4" onSubmit={handleSubmit}>
          <TextField
            autoComplete="email"
            required
            fullWidth
            name="email"
            label="Email Address"
          />
          <FormControl required className="w-full" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Link to="/signup" className="text-right text-blue-600 block pb-4">
            Don&apos;t have an account? Sign Up
          </Link>
          <Button type="submit" variant="outlined">
            Login
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
