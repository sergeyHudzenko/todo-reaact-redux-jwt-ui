import { useState } from "react";
import { Link } from "react-router-dom";

export default function SingModule() {
  const [login, setLogin] = useState(false);
  
  return (
    <section className="toggle">
      {!login ? (
        <section className="toggle-sign">
          <Link to="/sign-in">Sign in</Link>
          <Link to="/sign-up">Sign up</Link>
        </section>
      ) : (
        <section className="toggle-logout">
         <Link to="/logout">Logout</Link>
        </section>
      )}
    </section>
  );
}
