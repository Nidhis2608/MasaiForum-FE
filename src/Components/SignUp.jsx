import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/actions/authActions';
import axios from 'axios';
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
      const { data } = await axios.post('http://localhost:3000/api/register', { username, email, password });
      dispatch(setUser(data));
      toast({
        title: "Registration Successful",
        description: "You have successfully registered.",
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
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box p={8} maxWidth="600px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <FormControl isRequired>
          <h1 style={{textAlign:"center", fontFamily:"larger", fontSize:"60px"}}>MASAI FORUM</h1>
            <h1 style={{fontSize:"35px",fontFamily:"larger"}}>Nice to see you</h1>
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
  );
}

export default SignUp;