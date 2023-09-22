// src/components/answer/Answer.js

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  Input,
  Textarea,
  Heading,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const Answer = () => {
  const { questionId } = useParams();
  const [questionData, setQuestionData] = useState(null);
  const [answerText, setAnswerText] = useState('');

  useEffect(() => {
    // Fetch question data based on questionId from your JSON Server or API here
    // Update the 'questionData' state with the fetched data
  }, [questionId]);

  const handleAnswerTextChange = (e) => {
    setAnswerText(e.target.value);
  };

  const handlePostAnswer = (e) => {
    e.preventDefault();
    // Implement logic to post the answer to the server using 'answerText'
    // You can also update the 'questionData' state to reflect the new answer
  };

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <Heading as="h1" fontSize="2xl" mb={4}>
        Answer Question
      </Heading>
      {questionData && (
        <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
          <Text fontSize="lg" fontWeight="bold">
            {questionData.questionTitle}
          </Text>
          <Text>Username: {questionData.username}</Text>
          <Text>Language: {questionData.language}</Text>
          <Text>Upvotes: {questionData.upvotes}</Text>
          <Text>Answers: {questionData.answers}</Text>
          <Text>Posted Date: {questionData.postedDate}</Text>
          {/* Add any other question details here */}
        </Box>
      )}
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold">
          Your Answer
        </Text>
        <form onSubmit={handlePostAnswer}>
          <FormControl>
            <FormLabel>Answer Text</FormLabel>
            <Textarea
              value={answerText}
              onChange={handleAnswerTextChange}
              placeholder="Write your answer here"
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" mt={4}>
            Post Answer
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Answer;
