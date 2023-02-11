import { useState } from "react";
import { auth, provider } from "../../index";
import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";

export default function SignIn() {
  const [value, setValue] = useState(false);

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      if (data.user.email) {
        setValue(true)
        localStorage.setItem("authenticated", data.user.email)
      }
    });
  }

  useEffect(() => {
    setValue(localStorage.getItem('authenticated'))
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