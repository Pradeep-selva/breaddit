import jwtDecode from "jwt-decode";
import store from "../Redux";
import { loginUserAction, logoutUserAction } from "../Redux/Actions";

export const checkUserAuthentication = () => {
  const token: string = localStorage.AuthToken;

  if (token) {
    const decoded: any = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      store.dispatch(logoutUserAction());
      window.location.href = "/login";
    } else {
      store.dispatch(loginUserAction(token));
    }
  }
};
