import { Button, Container, Grid, TextField } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Dropzone from '../components/Dropzone';
import { Storage, API } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { createPost } from '../graphql/mutations';
import { CreatePostInput, CreatePostMutation } from '../API';
import { useRouter } from "next/router";

interface Props { }

interface IFormInputs {
    title: string;
    content: string;
    image?: string;
};


export default function CreatePost({ }: Props): ReactElement {

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>();
    const [file, setFile] = useState<File>();
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {

        const createNewPostInput: CreatePostInput = {
            title: data.title,
            contents: data.content,
            upvotes: 0,
            downvotes: 0
        };

        let input: CreatePostInput;

        const imagePath = uuid();

        if (file) {
            try {
                await Storage.put(imagePath, file, {
                    contentType: file.type
                });
                input = { ...createNewPostInput, image: imagePath };
            } catch (error) {
                console.log("Error in uploading file: ", error);
            }
        } else {
            input = createNewPostInput;
        }

        const createNewPost = (await API.graphql({
            query: createPost,
            variables: { input: input },
            authMode: "AMAZON_COGNITO_USER_POOLS",
        })) as { data: CreatePostMutation };

        router.push(`/post/${createNewPost.data.createPost.id}`);
    };

    return (
        <Container maxWidth="md">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            error={errors.title ? true : false}
                            helperText={errors.title ? errors.title.message : null}
                            {...register("title", {
                                required: { value: true, message: "Title is required" },
                            })}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="content"
                            label="Content"
                            type="text"
                            fullWidth
                            multiline
                            error={errors.content ? true : false}
                            helperText={errors.content ? errors.content.message : null}
                            {...register("content", {
                                required: {
                                    value: true,
                                    message: "Content is required for the post"
                                },
                                maxLength: {
                                    value: 500,
                                    message: "The content is limited to 500 characters."
                                }

                            })}
                        />
                    </Grid>

                    <Grid item>
                        <Dropzone file={file} setFile={setFile} />
                    </Grid>

                    <Grid item >
                        <Button variant="contained" type="submit" style={{ marginTop: 10 }}>Create</Button>
                    </Grid>

                </Grid>
            </form>

        </Container>
    );
}