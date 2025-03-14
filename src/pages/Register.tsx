import React, { useState } from 'react';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // const handleSubmit = async (e: React.FormEvent) => { // Type the 'e' parameter
  //   e.preventDefault();

  //   try {
  //     const response = await fetch('/.netlify/functions/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     if (response.ok) {
  //       setSuccess(true);
  //       setError('');
  //     } else {
  //       const errorData = await response.json();
  //       setError(errorData.error || 'Registration failed');
  //       setSuccess(false);
  //     }
  //   } catch (err) {
  //     console.error('Registration error:', err);
  //     setError('An unexpected error occurred.');
  //     setSuccess(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message
  
    try {
      const response = await fetch('/functions/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        setSuccess(true);
        setError("");
  
        // ✅ Store registration details in Excel
        await fetch('/functions/saveUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            type: 'register',
          }),
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Registration failed");
        setSuccess(false);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An unexpected error occurred.");
      setSuccess(false);
    }
  };
  

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Registration successful!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;




