import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const navigate = useNavigate()

  const {saveToken, getUserProfile, loading, setLoading} = useContext(AuthContext)

  const [email, setEmail] = useState("john@mail.com")
  const [password, setPassword] = useState("changeme")

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("me diste submit");
    try {
      setLoading(true);
      const res = await fetch("https://api.escuelajs.co/api/v1/auth/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify ({
        email,
        password,

      }),
    });
    const { access_token } = await res.json();
    console.log(access_token)
    saveToken(access_token);
    await getUserProfile(access_token);
    navigate("/profile")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
    
  };
  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingrese su Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />
        <input
          type="password"
          placeholder=" Ingrese su Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
         
        />
        <button type="submit" className="btn btn-secondary" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
