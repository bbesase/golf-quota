import { useState } from "react";
import { auth, provider } from "../../index";
import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";

export default function SignIn() {
  const [value, setValue] = useState('');

  const handleClick = () => {

    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
    });
  }

  useEffect(() => {
    setValue(localStorage.getItem('email'))
  }, [])

  return (
    <div>
      { value ? 
        // <Home /> :
        <p>MADE IT</p> :
        <button onClick={handleClick}>Signin With Google</button>
      }
      
    </div>
  )
}