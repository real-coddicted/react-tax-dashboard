import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );

  function handleCallbackResponse(response) {
    console.log("localstorage: " + localStorage.getItem("authenticated"));
    console.log("Encoded JWT ID token:" + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    if (userObject && userObject["email_verified"]) {
      console.log("login form authenticated");
      setauthenticated(true);
      localStorage.setItem("authenticated", true);
      navigate("/dashboard");
    }
  }

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id:
        "562354301975-kuj4tpvki50h84nhe1odssqdmkt8gbe8.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  );
};

export default Login;
