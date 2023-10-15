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
          <input type="text" value={email} placeholder="E-mail" id="email" name="email" autoComplete="email"
            className="input input-bordered input-sm w-full max-w-xs rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password" value={password} placeholder="Mot de passe" id="password" name="password" autoComplete="current-password"
            className="input input-bordered input-sm w-full max-w-xs mt-2 rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => logIn(email, password)} className="btn btn-neutral-focus btn-sm 2xl:ms-2 sm:max-2xl:mt-2 rounded-xl normal-case">
            Connexion
          </button>
      </div>
    )
  
}