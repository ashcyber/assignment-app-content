import jwtDecode from "jwt-decode";
import axios from "../api/index";

export function verifyToken() {
  const token = localStorage.getItem("tollPlazaToken");
  if (token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return false;
    }
    return true;
  }

  return false;
}

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
