// src/components/Navbar.js

import React from 'react';
import { Box, Flex, Link, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="blue.500" color="white" p={4}>
      <Flex maxW="container.xl" mx="auto" alignItems="center">
        <Link as={RouterLink} to="/" fontSize="2xl" fontWeight="bold">
          MyStackOverflow
        </Link>

        <Spacer />

        <Link as={RouterLink} to="/" mr={4}>
          Forum
        </Link> <Spacer />
        <Link as={RouterLink} to="/login">
          Login
        </Link> <Spacer />
        <Link as={RouterLink} to="/signup">
         Signup
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;
