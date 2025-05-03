/* TODO - add your code to create a functional React component that renders a login form */

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [error, setError] = useState();
    
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", {
                method: "POST",
                headers: { "Content-Type:" "application/json" },
                body: JSON.strongify({email, password})
            });
            const data = await res.json();

            if(res.ok) {
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                setError(data.message || "Login failed");
            }
            catch (err) {
                console.error(err);
                setError("Something went wrong");
            }
        };
        return (
            <div>
                <h2>Login</h2>
                {error && <p style={{color: "red" }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </div>
        )
    }
}

export default Login;