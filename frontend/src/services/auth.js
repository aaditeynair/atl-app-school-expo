import axios from "axios";
import { setUser, clearUser } from "../redux/userSlice";

const authenticateUser = async (dispatch, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get("http://localhost:3000/api/check-auth", {
      headers,
    });
    if (response.status === 200) {
      dispatch(setUser(response.data.user));
      return true;
    } else {
      dispatch(clearUser());
      return false;
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    return false;
  }
};

export { authenticateUser };
