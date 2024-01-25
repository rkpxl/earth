import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import axios from 'axios'

interface PersonnelPerson {
  userId: string | null
  name: string | null
  role: string | null
  access: string | null
}

interface SearchPeopleProps {
  allPeoples: Array<any>
  addedPeoples: Array<PersonnelPerson>
  addPerson: Function
  open: boolean
  onClose: Function
}

const SearchPeople = (props: SearchPeopleProps): JSX.Element => {
  const { allPeoples, addedPeoples, addPerson, open, onClose } = props
  const [searchText, setSearchText] = React.useState('')

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="md">
        <DialogTitle>Search People</DialogTitle>
        <DialogContent>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <List style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {allPeoples.map((person: any, index: number) => (
              <ListItemButton
                key={index}
                disabled={addedPeoples.some((ppl) => ppl.userId === person._id)}
                onClick={() => addPerson(person)}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              >
                <ListItemText primary={person.name} />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => onClose()}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SearchPeople
