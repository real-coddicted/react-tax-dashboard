import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PrivateRoute = (props) => {
  const { children } = props;
  const location = useLocation();

  const isAuthenticated = () => {
    const isAuth = localStorage.getItem("authenticated");
    console.log("isAuthentciated:" + isAuth);
  };

  return (
    <>
      {isAuthenticated() ? (
        <>{children}</>
      ) : (
        <Navigate
          replace={true}
          to="/login"
          state={{ from: `${location.pathname}${location.search}` }}
        />
      )}
    </>
  );
};

export default PrivateRoute;
