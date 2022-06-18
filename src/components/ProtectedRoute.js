import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// import { setAuthData } from "../features/AuthSlice";
// import { useDispatch } from "react-redux";

function ProtectedRoute(props) {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   userStorage && dispatch(setAuthData({ authData: userStorage }));
  // }, []);

  const { idToken, email, expiryDate } = useSelector(
    (state) => state?.auth?.value?.authData
  );
  const isAuthenticated = idToken?.length > 0 && email?.length > 0;
  const today = new Date().toISOString();
  const isSessionExpired = today > expiryDate;

  if (isSessionExpired) {
    localStorage.removeItem("user");
    return <Navigate to="/login" />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
