// src/components/forum/Forum.js

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  Input,
  Select,
  SimpleGrid,
  Heading,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion, getQuestion, postquestion } from "../redux/forumReducer/action";

// Dummy data for testing
const dummyQuestions = [
  {
    id: 1,
    username: "JohnDoe123",
    questionTitle: "How to sort an array in JavaScript?",
    language: "JavaScript",
    upvotes: 10,
    answers: 3,
    postedDate: "2023-05-30",
  },
  // Add more dummy questions as needed
];

const Forum = () => {
  const [questions, setQuestions] = useState(dummyQuestions);
  const [filterLanguage, setFilterLanguage] = useState("");
  const [sortByUpvotes, setSortByUpvotes] = useState(false);
  const store = useSelector((store) => {
    return store;
  });
  const [formData, setFormData] = useState({
    questionTitle:"",
    language: "",
  });
  const dispatch = useDispatch();
  // console.log(store);

  useEffect(() => {
    dispatch(getQuestion());
  }, []);
  useEffect(() => {
    setQuestions(store.forum.questions);
  }, [store.forum.questions]);

  // Handler for filtering questions by language
  const handleFilterLanguageChange = (e) => {
    setFilterLanguage(e.target.value);
  };

  // Handler for toggling the sorting by upvotes
  const handleSortByUpvotesChange = () => {
    setSortByUpvotes(!sortByUpvotes);
  }
  const handleDelete=(id)=>{
    dispatch(deleteQuestion(id))
     dispatch(getQuestion());
  }

  function formatDateToMMDDYYYY(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 because months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  }

  // Example usage:
  const currentDate = new Date();
  const formattedDate = formatDateToMMDDYYYY(currentDate);
  //console.log(formattedDate); // Output will be something like "09 22, 2023"

  const postQuestion = (e) => {
    e.preventDefault();
    dispatch(
      postquestion({
        ...formData,
        username: store.auth.user.username || "",
        postedDate: formattedDate,
        upvotes: 0,
        answers: 0,
      })
    );
    dispatch(getQuestion());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // console.log(questions)
   console.log(store.forum)
  return (
    <Box maxW="800px" mx="auto" p={4}>
      <Heading as="h1" fontSize="2xl" mb={4}>
        Forum
      </Heading>
      <Box mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Ask Question
        </Text>
        <form>
          <FormControl>
            <FormLabel>Question Title</FormLabel>
            <Input
              type="text"
              name="questionTitle"
              placeholder="Enter your question title"
              value={formData.questionTitle}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>Language</FormLabel>
            <Select
            name="language"
              placeholder="Select a language"
              onChange={handleChange}
              value={formData.language}
              required
            >
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            mt={4}
            onClick={postQuestion}
          >
            Post Question
          </Button>
        </form>
      </Box>
      <Box mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Filter Questions
        </Text>
        <FormControl>
          <FormLabel>Language</FormLabel>
          <Select
            value={filterLanguage}
            onChange={handleFilterLanguageChange}
            placeholder="Filter by language"
          >
            <option value="">All</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>
        <FormControl mt={2}>
          <FormLabel>Sort by Upvotes</FormLabel>
          <Input
            type="checkbox"
            checked={sortByUpvotes}
            onChange={handleSortByUpvotesChange}
          />
        </FormControl>
      </Box>
      <SimpleGrid columns={1} spacing={4}>
        {questions?.map((question) => (
          <Box
            key={question.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            boxShadow="md"
          >
            <Text fontSize="lg" fontWeight="bold">
              {question.questionTitle}
            </Text>
            <Text>Username: {question.username}</Text>
            <Text>Language: {question.language}</Text>
            <Text>Upvotes: {question.upvotes}</Text>
            <Text>Answers: {question.answers}</Text>
            <Text>Posted Date: {question.postedDate}</Text>
            <div style={{display:"flex",justifyContent:"space-around"}}>      <Button><Link to={`/answer/${question.id}`}>View Question</Link></Button>
            <Button
            type="submit"
            colorScheme="blue"
            mt={4}
            onClick={()=>{handleDelete(question.id)}}
          >
            Delete
          </Button></div>
      
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Forum;
