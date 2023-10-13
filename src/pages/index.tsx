import { Container, Typography } from '@mui/material'
import { useUser } from '../context/AuthContext'
import { listPosts } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { ListPostsQuery, Post } from '../API';
import PostView from '../components/PostView';


export default function Home() {

  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async (): Promise<Post[]> => {
      const posts = (await API.graphql({ query: listPosts })) as {
        data: ListPostsQuery;
        error: any[];
      };

      if (posts.data) {
        setPosts(posts.data.listPosts.items as Post[]);
        return posts.data.listPosts.items as Post[];
      }

      throw new Error("Error in getting posts");
    };


    // lets decide later if we show the posts only if the user is logged in
    // if (user) {
    getPosts();
    // } else {
    //   setPosts([]);
    // }

  }, []);

  return (
    <Container maxWidth="md">
      {posts.map((post) => (
        <PostView post={post} key={post.id} />
      ))}

      {/* {user && posts.map((post) => (
        <PostView post={post} key={post.id} />
      ))}

      {!user &&
        <Typography variant="h2">Please login</Typography>
      } */}
    </Container>
  );
}

