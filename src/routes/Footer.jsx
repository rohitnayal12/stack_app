// src/components/Footer.js

import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="blue.500" color="white" p={4} textAlign="center">
      <Text>&copy; {new Date().getFullYear()} MyStackOverflow. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
