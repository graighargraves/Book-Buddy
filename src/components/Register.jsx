/* TODO - add your code to create a functional React component that renders a registration form */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({setToken, setUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] =  useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, firstname: firstName, lastname: lastName }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setToken(data.token);
                setUser(data.user);
                setEmail("");
                setPassword("");
                setFirstName("");
                setLastName("");
                navigate("/");
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
    };
    return (
        <main className="auth-page">
          <div className="auth-card">
            <h2>Register</h2>
            {error && <p className="auth-error">{error}</p>}
      
            <form onSubmit={handleRegister} className="auth-form">
              <div>
                <label>First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
              <label>Email: <span className="required-hint">required</span></label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
              <label>Password: <span className="required-hint">required</span></label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Register</button>
            </form>
          </div>
        </main>
      );
}

export default Register;