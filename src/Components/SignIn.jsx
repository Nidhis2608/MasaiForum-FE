// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../Redux/actions/authActions';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Input,
//   VStack,
//   useToast
// } from '@chakra-ui/react';

// function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const toast = useToast();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post('https://masaiforum-be.onrender.com/api/login', { email, password });
//       dispatch(setUser(data));
//       toast({
//         title: "Login Successful",
//         description: "You have successfully logged in.",
//         status: "success",
//         duration: 9000,
//         isClosable: true,
//       });
//       navigate('/feeds');
//     } catch (error) {
//       toast({
//         title: "Login Failed",
//         description: "Check your credentials and try again.",
//         status: "error",
//         duration: 9000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Flex height="100vh" alignItems="center" justifyContent="center">
//       <Flex width="full" height="full">
//         {/* Form container */}
//         <Box flex={1} w="50vw" h="100vh" position="relative">
//           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRaqInFMp8et_W4Xtf5ccbWxL1eQo6Zkx3NA&s" alt="Scenic background"
//                style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} />
//         </Box>
//         <Box p={8} width={["100%", "40%"]} borderWidth={1} borderRadius={8} boxShadow="lg">
//           <VStack spacing={4} as="form" onSubmit={handleSubmit}>
//             <FormControl isRequired>
//               <h1 style={{ textAlign: "center", fontFamily: "'Segoe UI', sans-serif", fontSize: "40px", fontWeight: "bold" }}>MASAI FORUM</h1>
//               <h2 style={{ fontSize: "24px", fontWeight: "normal", textAlign: "center" }}>Nice to see you again</h2>
//               <FormLabel>Email</FormLabel>
//               <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
//             </FormControl>
//             <FormControl isRequired>
//               <FormLabel>Password</FormLabel>
//               <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/>
//             </FormControl>
//             <Button type="submit" colorScheme="blue" width="full">Sign In</Button>
//           </VStack>
//         </Box>
//       </Flex>
//     </Flex>
//   );
// }

// export default SignIn;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/actions/authActions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast
} from '@chakra-ui/react';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://masaiforum-be.onrender.com/api/login', { email, password });
      dispatch(setUser(data));
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate('/feeds');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Check your credentials and try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" p={4}>
      <Flex width="full" maxW="1200px" align="center" justify="space-evenly" gap="20px">
      <Box flex={1} w="50vw" h="100vh" position="relative">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRaqInFMp8et_W4Xtf5ccbWxL1eQo6Zkx3NA&s" alt="Scenic background"
               style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Box p={8} flex={1} borderWidth={1} borderRadius={8} boxShadow="lg" maxW="500px">
          <VStack spacing={4} as="form" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <h1 style={{ textAlign: "center", fontFamily: "'Segoe UI', sans-serif", fontSize: "40px", fontWeight: "bold" }}>MASAI FORUM</h1>
              <h2 style={{ fontSize: "24px", fontWeight: "normal", textAlign: "center" }}>Nice to see you again</h2>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/>
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">Sign In</Button>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;