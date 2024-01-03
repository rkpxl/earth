import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../Utils/axiosUtil'
import { AppDispatch, IQuestion } from '../../../Utils/types/type'
import Grid from '@mui/material/Grid';
import CreateComplianceDialog from './CreateComplianceDialog';
import Header from '../../../Components/Admin Dashboard/Common/Header';
import AdminCard from '../../../Components/Admin Dashboard/Common/AdminCard';
import { CircularProgress } from '@mui/material';
import { showMessage } from '../../../Store/reducers/snackbar';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { openConfirmation } from '../../../Store/reducers/confirm';
import ConfirmationPopup from '../../../Components/Common/ConfirmationDialog';
import CreateUpdateQuestionDialog from './CreateUpdateQuestionDialog';

interface IProps {
  id: string | string[] | undefined,
  position: string | number,
  title?: string,
  tabNumber: number,
  values: string[],
}


export default function ManageComplianceMember(props: IProps) {
  const { id, title, position, tabNumber } = props
  const [data, setData] = useState<Array<IQuestion>|null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<IQuestion|null|boolean>();
  const dispatch : AppDispatch = useDispatch();
  const router = useRouter()

  useEffect(() => {
    (async () => {
      setLoading(true)
      const response = await axiosInstance.get(`/questions/compliance/${id}?tabNumber=${tabNumber}`)
      setData(response.data)
      setLoading(false)
    })()
  },[])


  const handleOpenConfirmation = (args: any) => {
    dispatch(
      openConfirmation({
        args,
      })
    );
  };

  const handleConfirmation = async (id : string) => {
    try {
      const response = await axiosInstance.delete(`/compliance/${id}`);
      if(response.status === 200) {
        dispatch(showMessage({ message: 'Compliance is deleted', severity: 'success' }));
      } else {
        dispatch(showMessage({ message: 'Somehitng went wrong, please try again', severity: 'error' }));
      }
    } catch (err) {
      console.error(err)
      dispatch(showMessage({ message: 'Internal server error, contact to admin', severity: 'error' }));
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(null);
  };

	const redirectToGroup = (id: string) => {
    router.push(`/admin-dashboard/compliance/${id}`)
  }

  if(loading) {
    return (
    <>
      <CircularProgress />
    </>);
  }

  return (
    <Grid>
      <Header onClickHandle={handleClickOpen} title={title + " Details"} buttonText="Create New Question"/>
      <CreateUpdateQuestionDialog 
        open={Boolean(open)} 
        data={typeof open === 'boolean' ? undefined : open} 
        onClose={handleClose}
        complianceId={id}
        tabNumber={tabNumber}
      />
      {data?.map((question : IQuestion) => (
        <div key={question.id}>
          <AdminCard card={question} onDelete={() => handleOpenConfirmation(question.id)} onManageClick={() => setOpen(question)}/>
        </div>
      ))}
      <ConfirmationPopup handleConfirm={handleConfirmation} />
    </Grid>
  )
}
