import { useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
}

function Signup() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => {
    if (!username || !password || !fullname) {
      alert("All fields are mandatory");
      return;
    }
    axios
      .get("http://localhost:8000/signup", {
        params: {
          fullname,
          username,
          password,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <div className="LoginContainer">
        <div style={{ marginBottom: "20px" }}>
          <div>Fullname:</div>
          <input
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            type="text"
            placeholder="Fullname"
            style={{ marginTop: "10px", height: "30px", width: "200px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div>Username:</div>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Username"
            style={{ marginTop: "10px", height: "30px", width: "200px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div>Password:</div>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            value={password}
            placeholder="Password"
            style={{ marginTop: "10px", height: "30px", width: "200px" }}
          />
        </div>
        <div>
          <input
            onClick={() => {
              signup();
            }}
            type="button"
            value="Signup"
            style={{ height: "40px", width: "210px" }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Link to="/login">Already a User? Login here</Link>
        </div>
      </div>
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (!username || !password) {
      alert("All fields are mandatory");
      return;
    }
    axios
      .get("http://localhost:8000/login", {
        params: {
          username,
          password,
        },
      })
      .then(function (response) {
        console.log(response);
        let fullname;
        if (response && response.data && response.data.result) {
          fullname = response.data.result.fullname;
          alert("Welcome : " + fullname);
        } else {
          throw new Error("User not found");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert(error.message);
      });
  };
  return (
    <div className="App">
      <div className="LoginContainer">
        <div style={{ marginBottom: "20px" }}>
          <div>Username:</div>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Username"
            style={{ marginTop: "10px", height: "30px", width: "200px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div>Password:</div>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            value={password}
            placeholder="Password"
            style={{ marginTop: "10px", height: "30px", width: "200px" }}
          />
        </div>
        <div>
          <input
            onClick={() => {
              login();
            }}
            type="button"
            value="Login"
            style={{ height: "40px", width: "210px" }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Link to="/">New User? Signup here</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
