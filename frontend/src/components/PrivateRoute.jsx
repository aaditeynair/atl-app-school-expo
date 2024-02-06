import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { authenticateUser } from "../services/auth";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState({
    isLoading: true,
    isLoggedIn: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthState({ isLoading: false, isLoggedIn: false });
    }

    const checkAuth = async () => {
      authenticateUser(dispatch, token).then((isAuthenticated) => {
        if (isAuthenticated === true) {
          setAuthState({ isLoading: false, isLoggedIn: true });
        } else {
          setAuthState({ isLoading: false, isLoggedIn: false });
        }
      });
    };

    checkAuth();
  }, [dispatch]);

  if (authState.isLoading === true) {
    return <h1>Loading...</h1>;
  } else if (authState.isLoggedIn === true) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
