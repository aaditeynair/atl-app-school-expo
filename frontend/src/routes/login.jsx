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
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

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
        console.log(e);
      });
  };
  return (
    <>
      <div className="m-12 mt-24 text-center">
        <h1 className="font-bold text-5xl">Login</h1>
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
          <Button type="submit" variant="outlined">
            Create Account
          </Button>
        </form>
        {showError && (
          <Alert
            className="w-1/3 mx-auto mt-8"
            severity="error"
            variant="filled"
          >
            Email address already in use
          </Alert>
        )}
      </div>
    </>
  );
}

export default Login;
