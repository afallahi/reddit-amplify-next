import React from 'react'
import { Post } from '../API'
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

type Props = {
    post: Post
}

export default function PostView({ post }: Props) {
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
                        <Grid item>votes</Grid>
                        <Grid item>
                            <IconButton color="inherit">
                                <ArrowDownwardIcon style={{ maxWidth: 20 }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container alignItems="flex-start" direction="column">
                        <Grid item>
                            <Typography variant="body1">Posted by <b>{post.owner}</b> at <b>{post.createdAt}</b></Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h2">{post.title}</Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Paper>
    )
}