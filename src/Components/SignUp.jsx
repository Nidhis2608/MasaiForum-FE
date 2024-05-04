import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/actions/authActions';
import axios from 'axios';
import { Box, Button, Flex, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://masaiforum-be.onrender.com/api/register', { username, email, password });
        localStorage.setItem('token', response.data.token);  // Save token to localStorage
        dispatch(setUser(response.data.user));  // Assuming the user information is also sent back
        toast({
            title: "Registration Successful",
            description: "You have successfully registered .",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        navigate('/signin');
    } catch (error) {
        console.error(error);
        toast({
            title: "Registration Failed",
            description: "Unable to register. Please check your inputs and try again.",
            status: "error",
            duration: 9000,
            isClosable: true,
        });
    }
};


  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" padding="20px">
      <Flex direction={["column", "row"]} align="center" justify="center" width="full" gap="20px">
      <Box flex={1} w="50vw" h="100vh" position="relative">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRaqInFMp8et_W4Xtf5ccbWxL1eQo6Zkx3NA&s" alt="Scenic background"
               style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Box p={8} width={["100%", "40%"]} borderWidth={1} borderRadius={8} boxShadow="lg">
          <VStack spacing={6} as="form" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <h1 style={{textAlign:"center", fontFamily:"'Segoe UI', sans-serif", fontSize:"40px", fontWeight:"bold"}}>Masai Forum</h1>
              <h2 style={{textAlign:"center", fontSize:"24px", fontWeight:"normal"}}>Nice to see you</h2>
              <FormLabel>Username</FormLabel>
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username"/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/>
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">Sign Up</Button>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignUp;
