import { Button, Container, Grid, TextField } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Dropzone from '../components/Dropzone';

type Props = {}

interface IFormInputs {
    title: string;
    content: string;
    image?: string;
};


export default function CreatePost({ }: Props): ReactElement {

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>();
    const [file, setFile] = useState<File>();

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        console.log(data);
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

                    <Grid item>
                        <Button variant="contained" style={{ marginTop: 10 }}>Create</Button>
                    </Grid>

                </Grid>
            </form>

        </Container>
    );
}