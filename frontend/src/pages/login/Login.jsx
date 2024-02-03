import { useState } from "react";
import {
  CssBaseline,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../../styles/main.css";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");

    axios
      .post("http://localhost:3000/api/users/", null, {
        params: {
          username: name,
          email,
          password,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <CssBaseline />
      <div className="m-12 text-center">
        <h1 className="font-bold text-5xl">Sign Up</h1>
        <form className="w-1/3 mx-auto mt-8 space-y-4" onSubmit={handleSubmit}>
          <TextField
            autoComplete="given-name"
            required
            fullWidth
            name="name"
            label="Your Name"
            autoFocus
          />
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
      </div>
    </>
  );
}

export default Login;
