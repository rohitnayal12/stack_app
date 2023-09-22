// src/components/auth/Login.js

import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { login } from '../redux/AuthReducer/action';
import  { useDispatch,useSelector } from "react-redux"
const Login = () => {

  const dispatch =useDispatch()
  const Auth=useSelector((store)=>{
return store.auth.isAuth
  })
  const store=useSelector((store)=>{
    return store.auth
      })
      console.log(store.user)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData))
  };

  return (
    <Box maxW="400px" mx="auto" p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        {Auth?"LOGIN SUCCESSFUL":"LOGIN PAGE"}
      </Text>
      <form onSubmit={handleSubmit}>
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
          Login
        </Button>
      </form>
      <Text mt={4} fontSize="sm">
        Don't have an account?{' '}
        <RouterLink to="/signup" color="blue.500">
          Sign up here
        </RouterLink>
      </Text>
    </Box>
  );
};

export default Login;
