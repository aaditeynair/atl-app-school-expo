import axios from "axios";
import { setUser, clearUser } from "../redux/userSlice";

const authenticateUser = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios
      .get("http://localhost:3000/api/check-auth", { headers })
      .then();
    if (response.status === 200) {
      dispatch(setUser(response.data.user));
      return true;
    } else {
      dispatch(clearUser());
      return false;
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    return false; // Return false if there's an error or user is not authenticated
  }
};

export { authenticateUser };
