// import React, { useState } from 'react';
// import {
//   Box, Image, Badge, Text, Stack, Heading, Flex, Button, Input, useToast
// } from '@chakra-ui/react';
// import axios from 'axios';

// function PostCard({ post }) {
//   const [likes, setLikes] = useState(post.likes.length);
//   const [liked, setLiked] = useState(false);
//   const [commentText, setCommentText] = useState('');
//   const [comments, setComments] = useState(post.comments);
//   const toast = useToast();

//   const handleLike = async () => {
//     if (!liked) {
//       try {
//         const response = await axios.post(`http://localhost:3000/api/posts/${post._id}/like`);
//         setLikes(likes + 1);
//         setLiked(true);
//       } catch (error) {
//         console.error('Error liking the post:', error);
//       }
//     }
//   };

//   const handleComment = async () => {
//     try {
//       const response = await axios.post(`http://localhost:3000/api/posts/${post._id}/comment`, { comment: commentText }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setComments([...comments, { comment: commentText }]);
//       setCommentText('');
//       toast({
//         title: "Comment added",
//         description: "Your comment has been added successfully.",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//     } catch (error) {
//       console.error('Error adding comment:', error);
//       toast({
//         title: "Failed to add comment",
//         description: "Could not post your comment due to an error.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
//       <Flex justifyContent="space-between">
//         <Badge borderRadius="full" px="2" colorScheme="teal">
//           {post.category}
//         </Badge>
//         <Box fontSize="sm">{comments.length} comments</Box>
//       </Flex>
//       <Heading fontSize="xl" mt={2}>{post.title}</Heading>
//       {post.media.length > 0 && (
//         <Image src={post.media[0]} alt={`Image for ${post.title}`} />
//       )}
//       <Text mt={4}>{post.content}</Text>
//       <Stack spacing={4} mt={4}>
//         <Input
//           placeholder="Add a comment..."
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//         />
//         <Button onClick={handleComment} colorScheme="blue" size="sm">
//           Post Comment
//         </Button>
//         {comments.map((comment, index) => (
//           <Text key={index}>{comment.comment}</Text>
//         ))}
//       </Stack>
//       <Stack direction="row" mt={4} align="center">
//         <Button onClick={handleLike} colorScheme={liked ? "purple" : "gray"} size="sm">
//           {liked ? "Liked" : "Like"} ({likes})
//         </Button>
//         <Text>{new Date(post.created_at).toLocaleDateString()}</Text>
//       </Stack>
//     </Box>
//   );
// }

// export default PostCard;


import React, { useState } from 'react';
import {
  Box, Image, Badge, Text, Stack, Heading, Flex, Button, Input, useToast
} from '@chakra-ui/react';
import axios from 'axios';

function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments);
  const toast = useToast();
  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Authentication Error",
        description: "Please log in to like posts.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
    try {
      const response = await axios.post(`http://localhost:3000/api/posts/${post._id}/like`, {}, config);
      if (response.data.liked) {
        setLikes(likes => likes + 1);
        setLiked(true);
      } else {
        setLikes(likes => likes > 0 ? likes - 1 : 0);  // Ensure likes don't go negative
        setLiked(false);
      }
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error liking the post:', error);
      toast({
        title: "Failed to like the post",
        description: error.response?.data?.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  // Define handleComment function
  const handleComment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/api/posts/${post._id}/comment`, 
        { comment: commentText }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, { comment: commentText }]);
      setCommentText('');
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Failed to add comment",
        description: "Could not post your comment due to an error.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <Flex justifyContent="space-between">
        <Badge borderRadius="full" px="2" colorScheme="teal">
          {post.category}
        </Badge>
        <Box fontSize="sm">{comments.length} comments</Box>
      </Flex>
      <Heading fontSize="xl" mt={2}>{post.title}</Heading>
      {post.media.length > 0 && (
        <Image src={post.media[0]} alt={`Image for ${post.title}`} />
      )}
      <Text mt={4}>{post.content}</Text>
      <Stack spacing={4} mt={4}>
        <Input
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button onClick={handleComment} colorScheme="blue" size="sm">
          Post Comment
        </Button>
        {comments.map((comment, index) => (
          <Text key={index}>{comment.comment}</Text>
        ))}
      </Stack>
      <Stack direction="row" mt={4} align="center">
        <Button onClick={handleLike} colorScheme={liked ? "purple" : "gray"} size="sm">
          {liked ? "Liked" : "Like"} ({likes})
        </Button>
        <Text>{new Date(post.created_at).toLocaleDateString()}</Text>
      </Stack>
    </Box>
  );
}

export default PostCard;
