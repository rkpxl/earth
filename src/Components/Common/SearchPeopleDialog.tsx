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
    <Avatar sx={{ mr: 2 }}>{name[0]}</Avatar>
    <div>
      <Typography variant="subtitle1">{name}</Typography>
      <Typography variant="body2" color="textSecondary">
        {email}
      </Typography>
    </div>
  </ListItem>
)

export default function SearchPeopleDialog({ open, onClose, addPerson }: IProps) {
  const [searchText, setSearchText] = useState<string>('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['people', searchText],
    queryFn: async () => {
      if (searchText === '') {
        const response = await axiosInstance.get(`/user/users-of`)
        return response.data
      } else {
        const response = await axiosInstance.get(`/user/search?name=${searchText}`)
        return response.data
      }
    },
  })

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Search</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', height: '500px' }}>
        <SearchPage setText={setSearchText} />
        <List sx={{ overflowY: 'auto', flexGrow: 1 }}>
          {data?.map((user: any) => (
            <PersonCard
              key={user._id}
              name={user.name}
              email={user.email}
              onClick={() => addPerson(user)}
            />
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}
