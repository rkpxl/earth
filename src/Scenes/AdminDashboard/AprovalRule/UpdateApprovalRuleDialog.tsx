import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  styled,
  Grid,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
} from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import theme from '../../../Theme'
import Search from '../../../Components/Common/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IGroup, RootState } from '../../../Utils/types/type'
import { fetchGroups } from '../../../Store/reducers/group'
import axiosInstance from '../../../Utils/axiosUtil'
import { showMessage } from '../../../Store/reducers/snackbar'
import { RefetchQueryFilters, useQueryClient } from '@tanstack/react-query'
import { Page, onCancel } from '../../../Utils/constants'

const DragHandle = styled('div')({
  cursor: 'move',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
})

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9f9f9',
  },
  '&:hover': {
    backgroundColor: '#f0f0f0 !important',
  },
})

interface Rule {
  group_id: string
  groupName: string
  step: number
  isOptional: boolean
  isAdmin: boolean
  isBoard: boolean
  isAutoAssign: boolean
}

interface ApiResponse {
  _id: string
  name: string
  description: string
  rules: Rule[]
  isAdmin: boolean
  isBoard: boolean
  isAutoAssign: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

interface YourComponentProps {
  open: boolean
  onClose: () => void
  apiResponse: any
}

const YourComponent: React.FC<YourComponentProps> = ({ open, onClose, apiResponse }) => {
  const [updatedRules, setUpdatedRules] = useState<any[]>(apiResponse.rules)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [groupSearchText, setGroupSearchText] = useState<string>('')
  const [showSearch, setShowSearch] = useState<boolean>()
  const dispatch: AppDispatch = useDispatch()
  const groups = useSelector((state: RootState) => state.group)
  const queryClient = useQueryClient()

  !groups?.data && dispatch(fetchGroups())

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString())
    setDraggedIndex(index)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, toIndex: number) => {
    e.preventDefault()
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10)
    const draggedRule = updatedRules[fromIndex]
    const updatedRulesCopy = [...updatedRules]
    updatedRulesCopy.splice(fromIndex, 1)
    updatedRulesCopy.splice(toIndex, 0, draggedRule)
    setUpdatedRules(updatedRulesCopy.map((rule, index) => ({ ...rule, step: index + 1 })))
    setDraggedIndex(null)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== index) {
      const rect = e.currentTarget.getBoundingClientRect()
      const offsetY = e.clientY - rect.top
      const newIndex = offsetY > rect.height / 2 ? index + 1 : index
      setDraggedIndex(newIndex)
    }
  }

  const handleSwitchChange = (index: number, propertyName: string) => {
    setUpdatedRules((prevRules) => {
      const newRules = [...prevRules]
      newRules[index] = {
        ...newRules[index],
        [propertyName]: !newRules[index][propertyName],
      }
      return newRules
    })
  }

  const handleSelectChange = (index: number, propertyName: string, value: string) => {
    setUpdatedRules((prevRules) => {
      const newRules = [...prevRules]
      newRules[index] = {
        ...newRules[index],
        [propertyName]: value,
      }
      return newRules
    })
  }

  const handleAddRule = (group: IGroup) => {
    const newRule = {
      groupName: group?.name,
      group_id: group?._id,
      isOptiona: false,
      isBoard: false,
      isAdmin: false,
      isAutoAssign: true,
      step: updatedRules.length + 1,
    }
    setUpdatedRules((prev) => [...prev, newRule])
  }

  const handleRemoveRow = (index: number) => {
    setUpdatedRules((prevRules) => {
      const newRules = [...prevRules]
      newRules.splice(index, 1)
      const updatedRules = newRules.map((rule, i) => ({
        ...rule,
        step: i + 1,
      }))

      return updatedRules
    })
  }

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.put(`/approval-rules/${apiResponse?._id}`, {
        rules: updatedRules,
      })
      if (response.status <= 201) {
        dispatch(showMessage({ message: 'Approval Rule is added', severity: 'success' }))
      } else {
        dispatch(
          showMessage({ message: 'Somehitng went wrong, please try again', severity: 'error' }),
        )
      }
      queryClient.refetchQueries(['get-approval-rules'] as RefetchQueryFilters)
    } catch (err) {
      console.error(err)
    }
    onClose()
  }

  const handleShowSearch = () => {
    setShowSearch((prev) => !prev)
  }

  const finalSearchResult = (groups?.data || []).filter((g: IGroup) =>
    g?.name?.includes(groupSearchText),
  )

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={{
        maxHeight: '650px',
        height: 'auto',
      }}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.background.default,
          padding: '6px',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      }}
    >
      <DialogTitle>Manage Approval Rule</DialogTitle>
      <DialogContent>
        <Grid container justifyContent="space-between" sx={{ marginBottom: '24px' }}>
          <Grid item xs={12} sm={12} sx={{ width: '100%', position: 'relative' }}>
            <Search setText={setGroupSearchText} onClickHandle={handleShowSearch} />
            {showSearch && (
              <Paper
                sx={{
                  position: 'absolute',
                  zIndex: 1,
                  width: '100%',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  backgroundColor: 'white',
                  padding: '8px',
                  borderRadius: '12px',
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                  marginTop: '12px',
                }}
              >
                <List>
                  {finalSearchResult.map((result: IGroup) => (
                    <ListItem
                      key={result?._id}
                      button
                      onMouseDown={() => handleAddRule(result)}
                      sx={{
                        cursor: 'pointer',
                        width: '100%',
                        marginBottom: '8px',
                        padding: '8px',
                        borderRadius: '4px',
                        transition: 'background-color 0.3s, transform 0.3s',
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                          transform: 'scale(1.02)',
                        },
                      }}
                    >
                      <ListItemText primary={result.name} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Group Name</TableCell>
                <TableCell>Step</TableCell>
                <TableCell>Optional</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Board</TableCell>
                <TableCell>Auto Assign</TableCell>
                <TableCell>Retuen On Cancel</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {updatedRules.map((rule, index) => (
                <StyledTableRow
                  key={rule.group_id}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  style={{
                    border: '1px solid #ddd',
                    margin: '4px 0',
                    backgroundColor: draggedIndex === index ? theme.palette.primary.light : '',
                  }}
                >
                  <TableCell>{rule.groupName}</TableCell>
                  <TableCell>{rule.step}</TableCell>
                  <TableCell>
                    <Switch
                      checked={rule.isOptional}
                      onChange={() => handleSwitchChange(index, 'isOptional')}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={rule.isAdmin}
                      onChange={() => handleSwitchChange(index, 'isAdmin')}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={rule.isBoard}
                      onChange={() => handleSwitchChange(index, 'isBoard')}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={rule.isAutoAssign}
                      onChange={() => handleSwitchChange(index, 'isAutoAssign')}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      sx={{ height: '38px', width: '100px' }}
                      value={rule.onCancel}
                      onChange={(e) => handleSelectChange(index, 'onCancel', e.target.value)}
                    >
                      {Object.entries(onCancel).map(([key, value]: any) => (
                        <MenuItem key={key} value={key}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <DragHandle
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      sx={{
                        background: 'transparent',
                      }}
                    >
                      <DragIndicatorIcon />
                    </DragHandle>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveRow(index)}>
                      <DeleteIcon
                        sx={{
                          color: theme.palette.primary.light,
                          '&:hover': {
                            color: theme.palette.primary.main,
                          },
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleUpdate}>
          Update
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default YourComponent
