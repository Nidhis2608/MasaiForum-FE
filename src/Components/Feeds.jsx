import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import PostCard from './PostCard';

function Feeds() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get('http://localhost:3000/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        fetchPosts();
    }, []);

    return (
        <Container maxW="container.xl">
            <Box my={8}>
                <SimpleGrid columns={3} spacing={10}>
                    {posts.map(post => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </SimpleGrid>
            </Box>
        </Container>
    );
}

export default Feeds;
