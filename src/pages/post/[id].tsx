import React, { ReactElement } from "react";
import { withSSRContext } from 'aws-amplify';
import { GetStaticPaths, GetStaticProps } from 'next';
import { listPosts, getPost } from '../../graphql/queries';
import { GetPostQuery, ListPostsQuery, Post } from '../../API';


interface Props {
    post: Post;
}

export default function postDetails({ post }: Props): ReactElement {
    console.log("Post is: ", post);
    return (
        <div>hello</div>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const SSR = withSSRContext();

    console.log("before PostQuery:");

    const postsQuery = (await SSR.API.graphql({
        query: getPost,
        authMode: "API_KEY",
        variables: {
            id: params.id,
        },
    })) as { data: GetPostQuery };

    console.log("before return 1");

    return {
        props: {
            post: postsQuery.data.getPost as Post,
        },

        revalidate: 1
    };
};


export const getStaticPaths: GetStaticPaths = async () => {

    const SSR = withSSRContext();

    console.log("before response");

    const response = (await SSR.API.graphql({ query: listPosts, authMode: "API_KEY" })) as {
        data: ListPostsQuery;
        errors: any[];
    };

    console.log("response: ", response);

    console.log("before paths");

    const paths = response.data.listPosts.items.map((post) => ({
        params: { id: post.id },
    }));

    console.log("before return 2");

    return { paths, fallback: 'blocking' };
};