import { Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import Comment from '@mui/icons-material/Comment';
import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn';
import dynamic from 'next/dynamic';
const CommentDialog = dynamic(() => import('./CommentDialog'));


interface IProps {
  comment?: string;
  justification?: string;
  question_id: string,
  complianceId: number
}

export default function CommentJustification({ comment, justification, question_id, complianceId } : IProps) {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false)

  const handleCommentToggle = () => {
    setIsCommentDialogOpen((prev) => !prev)
  }

  return (
      <Grid item xs={1} sx={{ 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {true && (
          <Paper elevation={4} sx={{ width: '25px', height: '22px', marginBottom: '6px', display: "flex", justifyContent: "center", alignItems: "center", boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)', cursor: "pointer"}}>
            <Comment color="primary" sx={{ fontSize: "14px"}} onClick={handleCommentToggle} />
          </Paper>
        )}
        {true && (
          <Paper elevation={4} sx={{ width: '25px', height: '22px', marginBottom: '5px', display: "flex", justifyContent: "center", alignItems: "center", boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)', cursor: "pointer"}}>
            <AssignmentTurnedIn color="primary" sx={{ fontSize: "14px"}} />
          </Paper>
        )}
        {isCommentDialogOpen ? <CommentDialog open={isCommentDialogOpen} onClose={handleCommentToggle} question_id={question_id} complianceId={complianceId} /> : null}
      </Grid>
  )
}
