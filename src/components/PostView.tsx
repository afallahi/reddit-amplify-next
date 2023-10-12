import React from 'react'
import { Post } from '../API'
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

type Props = {
    post: Post
}

export default function PostView({ post }: Props) {

    const convertDateToElapsedTime = (date: string): string => {

        const diff = (new Date(Date.now())).getTime() - (new Date(date)).getTime();
        const hours = diff / 1000 / 60 / 60;
        if (hours < 24) {
            return (diff / 1000 / 60 / 60).toFixed(0) + "hours ago";
        } else {
            const days = hours / 24;
            return days.toFixed(0) + "days ago";
        }
    }

    return (
        <Paper elevation={4}>
            <Grid
                container
                direction="row"
                spacing={2}
                alignItems='flex-start'
                justifyContent="flex-start"
                style={{ width: "100%", padding: 10, marginTop: 12 }}
            >
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
                <Grid item style={{ maxWidth: "70%" }}>
                    <Grid container alignItems="flex-start" direction="column">
                        <Grid item>
                            <Typography variant="body1">Posted by <b>{post.owner}</b> {" "} {convertDateToElapsedTime(post.createdAt)}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h2">{post.title}</Typography>
                        </Grid>
                        <Grid item style={{ maxHeight: 50, overflowX: 'hidden', overflowY: 'clip' }}>
                            <Typography variant="body1">{post.contents}</Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Paper>
    )
}