import { Typography } from '@mui/material'
import { useUser } from '../context/AuthContext'
import { listPosts } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { ListPostsQuery, Post } from '../API';


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

    getPosts();

  }, []);

  console.log("User: ", user);
  console.log("Posts: ", posts);

  return (
    < Typography variant="h1" > "Hello World!"</Typography >
  )
}

