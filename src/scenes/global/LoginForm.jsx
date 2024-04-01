import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const users = [{ username: "abc", password: "abc" }];
  const handleSubmit = (e) => {
    e.preventDefault();
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
      console.log("login form authenticated");
      setauthenticated(true);
      localStorage.setItem("authenticated", true);
      navigate("/dashboard");
    }
  };

  function handleCallbackResponse(response) {
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
      {/* <p>Welcome Back</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type="password"
          name="Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form> */}
      <div id="signInDiv"></div>
    </div>
  );
};

export default Login;
