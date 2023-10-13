import React, { ReactElement } from 'react';
import { Comment } from "../API";
import { Grid, Paper, Typography } from '@mui/material';
import dateToElapsedTime from '../util/DateUtil';

interface Props {
  comment: Comment
}

export default function CommentView({ comment }: Props): ReactElement {
  console.log("comment: ", comment);
  return (

    <Paper style={{ width: "100%", minHeight: 128, padding: 5, marginTop: 10 }} elevation={1}>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography variant="h6"><b>{comment.owner}</b> - {dateToElapsedTime(comment.createdAt)}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">{comment.content}</Typography>
        </Grid>
      </Grid>
    </Paper>


  )
}