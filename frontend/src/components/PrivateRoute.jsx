import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { authenticateUser } from "../services/auth";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      authenticateUser(dispatch).then((isAuthenticated) => {
        if (isAuthenticated === false) {
          setIsAuthenticated(false);
        }
      });
    };

    checkAuth();
  });

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
