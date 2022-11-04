import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hasJWT from "../../utils/checkJwt";
import Token from "../../utils/token";

export default function SingModule() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    hasJWT() ? setLogin(true) : setLogin(false)
  }, [login])

  const onLogout = (event) => {
    event.preventDefault()
    Token.removeToken()
    Token.removeUser()
    window.location.href = '/sign-in'
  }
  
  return (
    <section className="toggle">
      {!login ? (
        <section className="toggle-sign">
          <Link to="/sign-in">Sign in</Link>
          <Link to="/sign-up">Sign up</Link>
        </section>
      ) : ( 
        <section className="toggle-sign">
         <Link to="#" onClick={onLogout} >Logout</Link>
        </section>
      )}
    </section>
  );
}
