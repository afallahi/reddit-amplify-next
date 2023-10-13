import React, { ReactElement } from "react";
import { withSSRContext } from 'aws-amplify';
import { GetStaticPaths, GetStaticProps } from 'next';
import { listPosts, getPost } from '../../graphql/queries';
import { GetPostQuery, ListPostsQuery, Post } from '../../API';
import { Container } from "@mui/material";
import PostView from "../../components/PostView";
import Comment from "../../components/CommentView";

interface Props {
    post: Post;
}

export default function postDetails({ post }: Props): ReactElement {
    return (
        <Container maxWidth="md">
            <PostView post={post} />
            {post.comments.items.map((comment) => (
                <Comment comment={comment} key={comment.id} />
            ))}
        </Container>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const SSR = withSSRContext();

    const postsQuery = (await SSR.API.graphql({
        query: getPost,
        authMode: "API_KEY",
        variables: {
            id: params.id,
        },
    })) as { data: GetPostQuery };

    return {
        props: {
            post: postsQuery.data.getPost as Post,
        },

        revalidate: 1
    };
};


export const getStaticPaths: GetStaticPaths = async () => {

    const SSR = withSSRContext();

    const response = (await SSR.API.graphql({ query: listPosts, authMode: "API_KEY" })) as {
        data: ListPostsQuery;
        errors: any[];
    };

    const paths = response.data.listPosts.items.map((post) => ({
        params: { id: post.id },
    }));

    return { paths, fallback: 'blocking' };
};