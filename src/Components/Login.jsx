import { useEffect, useState } from "react"
import { auth,logIn } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"

export default function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user] = useAuthState(auth)
    
    const navigate = useNavigate()

    useEffect(() => {
      if (user) navigate("/admin")
    }, [navigate, user])

    return (
      <div>
          <input type="text" value={email} placeholder="adresse mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password" value={password} placeholder="mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => logIn(email, password)}>
            Connexion
          </button>
      </div>
    )
  
}