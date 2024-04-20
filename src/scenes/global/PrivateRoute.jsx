import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = (props) => {
  const { children } = props;
  const { isLoggedIn, user } = useContext(AuthContext);
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        replace={true}
        to="/login"
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
