import React, { useState } from "react";
import StarsBackground from "../components/StarsBackground";

const Home: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePreRegister = async () => {
    // Clear input fields immediately
    setFormData({ name: "", email: "" });
  
    try {
      const response = await fetch("http://localhost:5000/saveUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Pre-registration successful!"); // Optional confirmation
      } else {
        console.warn("Failed to register. Server might be down.");
      }
    } catch (err) {
      console.warn("Skipping server error. Form cleared successfully.");
    }
  };
  

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative bg-black">
      <StarsBackground />

      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-6xl md:text-7xl font-bold text-white animate-glow font-heading">
          Launching Soon
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Get ready for the next generation of digital experiences. 
          Join us on this exciting journey into the future.
        </p>
      </div>

      {/* Pre-Register Form */}
      <form
        onSubmit={handlePreRegister}
        className="bg-[#1E1E2E] p-8 rounded-xl shadow-2xl border border-[#6E3AFF] w-96 space-y-5 flex flex-col items-center text-white mt-10"
      >
        <h2 className="text-2xl font-semibold">Pre-Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[#2A2A3C] text-white border border-[#6E3AFF] focus:ring-2 focus:ring-[#6E3AFF] outline-none"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[#2A2A3C] text-white border border-[#6E3AFF] focus:ring-2 focus:ring-[#6E3AFF] outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#6E3AFF] text-white py-3 rounded-lg font-bold hover:bg-[#845EFF] transition-all duration-300"
        >
          Submit
        </button>
      </form>

      {/* Decorative Planets */}
      <div
        className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[#6E3AFF]/20 blur-3xl animate-float"
      ></div>
      <div
        className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-[#6E3AFF]/20 blur-3xl animate-float-delayed"
      ></div>
    </main>
  );
};

export default Home;
