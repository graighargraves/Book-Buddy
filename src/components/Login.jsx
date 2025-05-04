/* TODO - add your code to create a functional React component that renders a login form */

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = ({setToken, setUser}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [error, setError] = useState();
    
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email, password}),
            });
            const data = await res.json();

            if(res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user)); 
                setToken(data.token);
                setUser(data.user);
                navigate("/");
            } else {
                setError(data.message || "Login failed");
            }
            } catch (err) {
                console.error(err);
                setError("Something went wrong");
            }
        };

        return (
            <main className="auth-page">
              <div className="auth-card">
                <h2>Login</h2>
                {error && <p className="auth-error">{error}</p>}
          
                <form onSubmit={handleLogin} className="auth-form">
                  <div>
                    <label>Email:</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Password:</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit">Log In</button>
                </form>
              </div>
            </main>
          );
    }


export default Login;