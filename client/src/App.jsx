import { useState } from "react";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import axios from "axios";

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5100/register", {
        username,
        password,
      });
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error registering user");
    }
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5100/login", {
        username,
        password,
      });
      setMessage(response.data.message);
      setToken(response.data.token); // Save the token for authenticated users
    } catch (err) {
      setMessage(err.response?.data?.message || "Error logging in");
    }
  };
  const accessProtectedRoute = async () => {
    try {
      const response = await axios.get("http://localhost:5100/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToken(response.data.token);
    } catch (err) {
      setMessage(err.response?.data?.message || "Access denied");
    }
  };

  console.log(message)
  return (
    <>
      <div>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h1>Login and Authentication</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ margin: "10px" }}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: "10px" }}
          />
        </div>

        <div className="flex items-center space-x-20 w-full justify-center">
        <button onClick={handleRegister} className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2">Register</button>
        <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2">Login</button>
        </div>
        
      </div>
      {/* <Register /> */}
      {/* <Login /> */}
      <ProtectedRoute
        token={token}
        message={message}
        accessProtectedRoute={accessProtectedRoute}
      />
    </>
  );
}

export default App;
