import { useState } from "react";
import { auth, provider } from "../../index";
import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default function SignIn() {
  const [value, setValue] = useState(false);
  const [authorizedUsers, setAuthorizedUsers] = useState([])
  const navigate = useNavigate();

  const isUserAdmin = async (email) => {
    authorizedUsers.forEach((userEmail) => {
      if (userEmail === email) {
        localStorage.setItem("adminUser", true)
      }
    })
  };

  const handleClick = async () => {
    signInWithPopup(auth, provider).then((data) => {
      if (data.user.email) {
        setValue(true)
        isUserAdmin(data.user.email)
        localStorage.setItem("authenticated", true)
        console.log('authorizedUsers', authorizedUsers)
        navigate("/home");
      }
    });
  }

  useEffect(() => {
    const getAuthorizedGolfers = async () => {
      const querySnapshot = await getDocs(collection(getFirestore(), "tfd-auth"));
      await querySnapshot.forEach((doc) => {
        const users = doc.data();
        setAuthorizedUsers(users.emails);
      });
    }
    getAuthorizedGolfers();
    setValue(localStorage.getItem('authenticated'));
    if (localStorage.getItem('authenticated')) { navigate("/home") }
  }, [])

  return (
    <Box height='100%' width='100%' display='flex' justifyContent='center' alignItems='center'>
      <Button size='lg' leftIcon={<FcGoogle />} variant='solid' onClick={handleClick}>Signin With Google</Button>
    </Box>
  )
}
