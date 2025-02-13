import { useState } from "react";
import {
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
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import axios from "axios";
import SnackbarMessage from "../components/SnackbarMessage";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleShowSnackbar = (message, severity) => {
    setSnackbarInfo({
      open: true,
      message,
      severity,
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarInfo((info) => {
      return { ...info, open: false };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    axios
      .post("http://localhost:3000/api/users/", null, {
        params: {
          username: name,
          email,
          password,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          const { user, token } = res.data;

          localStorage.setItem("token", token);
          dispatch(setUser(user));
          navigate("/");
        }
      })
      .catch((e) => {
        if (e.response.data.error === "Email already in use") {
          handleShowSnackbar("Email account already in use", "error");
        }
      });
  };
  return (
    <div className="mt-24 text-center">
      <h1 className="font-bold text-5xl">Sign Up</h1>
      <SnackbarMessage
        open={snackbarInfo.open}
        message={snackbarInfo.message}
        severity={snackbarInfo.severity}
        handleClose={handleSnackbarClose}
      />
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
        <Link to="/login" className="text-right text-blue-600 block pb-4">
          Already have an account? Login
        </Link>
        <Button type="submit" variant="contained">
          Create Account
        </Button>
      </form>
    </div>
  );
}

export default Signup;
