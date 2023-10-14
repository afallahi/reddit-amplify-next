import React, { useEffect, useState } from 'react'
import { Post } from '../API'
import { ButtonBase, Grid, IconButton, Paper, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Image from "next/image";
import { useRouter } from 'next/router';
import dateToElapsedTime from '../util/DateUtil';
import { Storage } from 'aws-amplify';

type Props = {
    post: Post
}

export default function PostView({ post }: Props) {
    const router = useRouter();
    const [postImage, setPostImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function getImageFromS3() {
            try {
                const img = await Storage.get(post.image);
                console.log("Found Image:", img);
                setPostImage(img);
            } catch (error) {
                console.log("No image.");
            }
        }

        getImageFromS3();

    }, [])

    return (
        <Paper elevation={4}>
            <Grid
                container
                direction="row"
                spacing={2}
                alignItems='flex-start'
                justifyContent="flex-start"
                style={{ padding: 10, marginTop: 12 }}
                wrap='nowrap'
            >
                {/* votes */}
                <Grid
                    item
                    style={{ maxWidth: 200 }}
                >
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <IconButton color="inherit">
                                <ArrowUpwardIcon style={{ maxWidth: 20 }} />
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <Grid container alignItems='center' direction='column'>
                                <Grid item>
                                    <Typography variant="body1">
                                        {(post.upvotes - post.downvotes).toString()}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">votes</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <IconButton color="inherit">
                                <ArrowDownwardIcon style={{ maxWidth: 20 }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

                {/* main body */}
                <Grid item>
                    <ButtonBase onClick={() => router.push(`/post/${post.id}`)}>
                        <Grid container alignItems="flex-start" direction="column">
                            <Grid item>
                                <Typography variant="body1">Posted by <b>{post.owner}</b> {" "} {dateToElapsedTime(post.createdAt)}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h2">{post.title}</Typography>
                            </Grid>
                            <Grid item style={{ maxHeight: 50, overflowX: 'hidden', overflowY: 'hidden' }}>
                                <Typography variant="body1" textAlign="left">{post.contents}</Typography>
                            </Grid>

                            {/* add Image */}

                            {postImage && post.image && (
                                <Grid item marginTop={1}>
                                    <Image
                                        src={postImage}
                                        alt=''
                                        height="540"
                                        width="980"
                                        layout='intrinsic'
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </ButtonBase>
                </Grid>
            </Grid>
        </Paper>
    )
}