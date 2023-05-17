import { useState } from "react";
import { auth, provider } from "../../index";
import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

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
    <Box height='100%' width='100%' display='flex' justifyContent='center' alignItems='center'>
      <Button size='lg' leftIcon={<FcGoogle />} variant='solid' onClick={handleClick}>Signin With Google</Button>
    </Box>
  )
}
