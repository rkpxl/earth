import { Grid, Paper } from '@mui/material'
import React from 'react'
import Comment from '@mui/icons-material/Comment';
import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn';

interface IProps {
  comment?: string;
  justification?: string;
}

export default function CommentJustification({ comment, justification } : IProps) {
  return (
      <Grid item xs={1} sx={{ 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {true && (
          <Paper elevation={4} sx={{ width: '25px', height: '22px', marginBottom: '6px', display: "flex", justifyContent: "center", alignItems: "center", boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)', cursor: "pointer"}}>
            <Comment color="primary" sx={{ fontSize: "14px"}} />
          </Paper>
        )}
        {true && (
          <Paper elevation={4} sx={{ width: '25px', height: '22px', marginBottom: '5px', display: "flex", justifyContent: "center", alignItems: "center", boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)', cursor: "pointer"}}>
            <AssignmentTurnedIn color="primary" sx={{ fontSize: "14px"}} />
          </Paper>
        )}
      </Grid>
  )
}
