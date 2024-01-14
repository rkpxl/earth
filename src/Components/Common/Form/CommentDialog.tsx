import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Avatar,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Router from 'next/router';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../Utils/axiosUtil';
import { IComment } from '../../../Utils/types/type';
import Loading from '../Loading';
import id from 'date-fns/esm/locale/id/index.js';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../../Store/reducers/snackbar';
import { getStandatedDateWithTime } from '../../../Utils/dateTime';
import { getCookie } from '../../../Utils/cookieUtils';

interface Comment {
  user: string;
  time: string;
  text: string;
}

interface CommentDialogProps {
  open: boolean;
  onClose: () => void;
  question_id: string;
  complianceId: number;
}

const CommentDialog: React.FC<CommentDialogProps> = ({ open, onClose, question_id, complianceId }) => {
  const { id : protocol_id } = Router.query as { id : string}
  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState('');
  const [currComments, setCurrComments] = useState<Array<any>>([])

  console.log('complianceId', complianceId)

  const handleSendComment = async () => {
    // Handle sending the new comment (you can implement this as needed)
    if(newComment.length > 0) {
      try {
          const response = await axiosInstance.post('/comment', {
            comment: newComment,
            protocol_id: protocol_id,
            question_id: question_id,
            complianceId: complianceId,
          })
          if(response.status < 300 ) {
            setCurrComments((prev) => [...prev, {
              writerName: getCookie('name'),
              comment: newComment,
              createdAt: new Date()

            }]);
            setNewComment('')
            dispatch(showMessage({message: 'Comment Added Successfully', severity: "success"}))
          } else {
            dispatch(showMessage({message: 'Comment Not Added, Try Again', severity: "warning"}))
          }
      } catch (err) {
        dispatch(showMessage({message: 'Comment Not Added, Try Again', severity: "error"}))
      }
    }
    
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [`comment-${protocol_id}-${question_id}`],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get('/comment', {
          params: {
            question_id,
            protocol_id
          }
        })
        return response.data
      } catch (err) {
        console.error(err)
      }
    }
  })

  if(isLoading) {
    return (<Loading />)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Previous Comments</DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <Grid container>
          {[...data, ...currComments]?.map((comment : IComment, index : number) => (
            <Grid key={comment._id} container maxHeight="sm" sx={{display: 'flex', flexDirection: "column", mt: 2}}>
              <Grid item sx={{display: 'flex'}}>
                <Avatar sx={{ width: 24, height: 24 }}>{comment?.writerName[0]}</Avatar>
                <Typography sx={{ml:2}}>{comment.writerName}</Typography>
              </Grid>
              <Grid item sx={{ marginLeft: '20px', width: "auto" }}>
                <Paper elevation={16} sx={{ p: 2}}>
                  <Typography>{comment?.comment}</Typography>
                  <Grid sx={{ display: 'flex', justifyContent: 'end'}}>{getStandatedDateWithTime(comment?.createdAt)}</Grid>
                </Paper>
              </Grid>
            </Grid>
          ))}

          <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={12} sm={10}>
              <TextField
                label="Add Comment"
                fullWidth
                multiline
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2} container justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={handleSendComment} sx={{ width: '100%' }}>
                <SendIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
