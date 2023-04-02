import { useState } from "react";
import { auth, provider } from "../../index";
import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [value, setValue] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      if (data.user.email) {
        setValue(true)
        localStorage.setItem("authenticated", true)
        navigate("/home");

      }
    });
  }

  useEffect(() => {
    setValue(localStorage.getItem('authenticated'))
    if (localStorage.getItem('authenticated')) { navigate("/home") }
  }, [])

  return (
    <div>
      { value ? 
        // <Home /> :
        <p>MADE IT</p> :
        <div>
          <div>Lets get you signed in</div>
          <button onClick={handleClick}>Signin With Google</button>
        </div>
      }
      
    </div>
  )
}