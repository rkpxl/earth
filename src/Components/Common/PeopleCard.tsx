// components/PeopleCard.tsx
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

interface PeopleCardProps {
  name: string
  id: string
  avatarUrl?: string
  selectToggle: () => void
  showSelect: boolean
}

const PeopleCard: React.FC<PeopleCardProps> = ({
  name,
  id,
  avatarUrl,
  selectToggle,
  showSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState('default')
  const [isChecked, setIsChecked] = useState(false)

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOption(event.target.value as string)
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <Card sx={{ borderRadius: 8, padding: 2, display: 'flex', alignItems: 'center' }}>
      <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      <CardHeader
        avatar={<Avatar src={avatarUrl} sx={{ width: 56, height: 56, borderRadius: '50%' }} />}
        title={name}
        subheader={`ID: ${id}`}
        action={
          <>
            <IconButton onClick={selectToggle}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={selectToggle}>
              <RemoveIcon />
            </IconButton>
          </>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {/* Add more basic info here */}
          Additional Info: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>

        {showSelect && (
          <FormControl fullWidth>
            <InputLabel>Select Option</InputLabel>
            <Select value={selectedOption} onChange={selectToggle}>
              <MenuItem value="default" disabled>
                Select an option
              </MenuItem>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
        )}
      </CardContent>
    </Card>
  )
}

export default PeopleCard
