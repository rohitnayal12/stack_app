// src/components/auth/Signup.js

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import  { useDispatch,useSelector } from "react-redux"
import { signin } from '../redux/AuthReducer/action';
const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

 const dispatch =useDispatch()
  const error=useSelector((store)=>{
return store.auth.isError
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  //  signin(dispatch(formData))
  dispatch(signin(formData))
   
  };
  //console.log(formData)
  console.log(error)

  return (
    <Box maxW="400px" mx="auto" p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Sign Up
      </Text>
      <Text color={'red'}>{error && "Check your credential" }</Text>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="100%" mt={4}>
          Sign Up
        </Button>
      </form>
      <Text mt={4} fontSize="sm">
        Already have an account?{' '}
        <RouterLink to="/login" color="blue.500">
          Login here
        </RouterLink>
      </Text>
    </Box>
  );
};

export default Signup;
