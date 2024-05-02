import React, { useState } from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  Heading,
  Flex,
  Button
} from '@chakra-ui/react';
import axios from 'axios';

function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (!liked) {
      try {
        await axios.post(`http://localhost:3000/api/posts/${post._id}/like`);
        setLikes(likes => likes + 1);
        setLiked(true);
      } catch (error) {
        console.error('Error liking the post:', error);
      }
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <Flex justifyContent="space-between">
        <Badge borderRadius="full" px="2" colorScheme="teal">
          {post.category}
        </Badge>
        <Box fontSize="sm">{post.comments.length} comments</Box>
      </Flex>
      <Heading fontSize="xl" mt={2}>{post.title}</Heading>
      {post.media.length > 0 && (
        <Image src={post.media[0]} alt={`Image for ${post.title}`} />
      )}
      <Text mt={4}>{post.content}</Text>
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
