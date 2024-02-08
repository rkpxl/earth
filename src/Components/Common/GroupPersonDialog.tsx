import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import axiosInstance from '../../Utils/axiosUtil'
import SearchPage from './Search'

interface IProps {
  open: boolean
  selectedApprover: any
  onClose: () => void
  addPerson: Function
}

interface PersonCardProps {
  name: string
  email: string
  onClick: () => void
}

const PersonCard: React.FC<PersonCardProps> = ({ name, email, onClick }) => (
  <ListItem
    button
    onClick={onClick}
    sx={{
      p: 2,
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-4px)',
        transition: 'transform 0.3s',
        borderRadius: '16px',
      },
    }}
  >
    <Avatar sx={{ mr: 2 }}>{name?.[0] || ''}</Avatar>
    <div>
      <Typography variant="subtitle1">{name || ''}</Typography>
      <Typography variant="body2" color="textSecondary">
        {email || ''}
      </Typography>
    </div>
  </ListItem>
)

export default function GroupPersonDialog({ open, onClose, selectedApprover, addPerson }: IProps) {
  const [searchText, setSearchText] = useState<string>('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['group', selectedApprover.group_id, searchText],
    queryFn: async () => {
      if (searchText === '') {
        const response = await axiosInstance.get(
          `/member/group/0/?_id=${selectedApprover.group_id}`,
        )
        return response.data
      } else {
        const response = await axiosInstance.get(
          `/member/group/0/?_id${selectedApprover.group_id}&name=${searchText}`,
        )
        return response.data
      }
    },
  })

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Search</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', maxHeight: '500px' }}>
        <SearchPage setText={setSearchText} />
        <List sx={{ overflowY: 'auto', flexGrow: 1 }}>
          {data?.map((user: any) => (
            <PersonCard
              key={user.user_id._id}
              name={user.user_id.name}
              email={user.user_id.email}
              onClick={() => addPerson(selectedApprover, user)}
            />
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}
