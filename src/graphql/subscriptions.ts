/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreatePost = /* GraphQL */ `subscription OnCreatePost(
  $filter: ModelSubscriptionPostFilterInput
  $owner: String
) {
  onCreatePost(filter: $filter, owner: $owner) {
    id
    title
    comments {
      items {
        id
        postID
        content
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePostSubscriptionVariables,
  APITypes.OnCreatePostSubscription
>;
export const onUpdatePost = /* GraphQL */ `subscription OnUpdatePost(
  $filter: ModelSubscriptionPostFilterInput
  $owner: String
) {
  onUpdatePost(filter: $filter, owner: $owner) {
    id
    title
    comments {
      items {
        id
        postID
        content
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePostSubscriptionVariables,
  APITypes.OnUpdatePostSubscription
>;
export const onDeletePost = /* GraphQL */ `subscription OnDeletePost(
  $filter: ModelSubscriptionPostFilterInput
  $owner: String
) {
  onDeletePost(filter: $filter, owner: $owner) {
    id
    title
    comments {
      items {
        id
        postID
        content
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePostSubscriptionVariables,
  APITypes.OnDeletePostSubscription
>;
export const onCreateComment = /* GraphQL */ `subscription OnCreateComment(
  $filter: ModelSubscriptionCommentFilterInput
  $owner: String
) {
  onCreateComment(filter: $filter, owner: $owner) {
    id
    postID
    post {
      id
      title
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    content
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCommentSubscriptionVariables,
  APITypes.OnCreateCommentSubscription
>;
export const onUpdateComment = /* GraphQL */ `subscription OnUpdateComment(
  $filter: ModelSubscriptionCommentFilterInput
  $owner: String
) {
  onUpdateComment(filter: $filter, owner: $owner) {
    id
    postID
    post {
      id
      title
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    content
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCommentSubscriptionVariables,
  APITypes.OnUpdateCommentSubscription
>;
export const onDeleteComment = /* GraphQL */ `subscription OnDeleteComment(
  $filter: ModelSubscriptionCommentFilterInput
  $owner: String
) {
  onDeleteComment(filter: $filter, owner: $owner) {
    id
    postID
    post {
      id
      title
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    content
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCommentSubscriptionVariables,
  APITypes.OnDeleteCommentSubscription
>;
