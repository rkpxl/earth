import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { Divider, Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

const Popup = ({ open, onClose, onSave }: any) => {
  const [items, setItems] = useState<string[]>([])
  const [newItemText, setNewItemText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleAddItem = () => {
    if (newItemText.trim() !== '') {
      setItems([...items, newItemText])
      setNewItemText('')
      handleCloseModal()
    }
  }

  const handleDeleteItem = (index: number) => {
    const updatedItems = [...items]
    updatedItems.splice(index, 1)
    setItems(updatedItems)
  }

  const handleDragStart = (e: any, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString())
  }

  const handleDragOver = (e: any, index: number) => {
    e.preventDefault()
    const draggedIndex = Number(e.dataTransfer.getData('text/plain'))
    if (index !== draggedIndex) {
      const updatedItems = [...items]
      const [draggedItem] = updatedItems.splice(draggedIndex, 1)
      updatedItems.splice(index, 0, draggedItem)
      setItems(updatedItems)
    }
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogTitle sx={{ padding: '0px' }}>Workflow</DialogTitle>
        <TextField
          label="Enter Item"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          sx={{ minWidth: '450px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddItem}
          style={{ marginTop: '8px', marginBottom: '8px' }}
        >
          Add
        </Button>
        {items?.length > 0 ? (
          <>
            <Divider sx={{ marginTop: '8px', marginBottom: '16px' }} />
            <DialogTitle sx={{ padding: '0px', marginTop: '8px', marginBottom: '16px' }}>
              Edit Workflow
            </DialogTitle>
            {/* Popup content */}
            <div style={{ marginBottom: '16px' }}>
              {items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    marginBottom: '8px',
                    backgroundColor: '#F9FAFC',
                    cursor: 'grab',
                    minWidth: '450px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  draggable
                >
                  <span>{item}</span>
                  <Grid sx={{ display: 'flex' }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteItem(index)}
                      style={{
                        height: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      // eslint disable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      style={{
                        height: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <DragIndicatorIcon />
                    </IconButton>
                  </Grid>
                </div>
              ))}
            </div>
            <Button onClick={onSave} color="primary" sx={{ marginTop: 2 }}>
              Add
            </Button>
            <Button onClick={onClose} color="primary" sx={{ marginTop: 2 }}>
              Cancel
            </Button>{' '}
          </>
        ) : null}

        {/* Close button */}
      </DialogContent>
    </Dialog>
  )
}

export default Popup

// {isModalOpen && (
//   <div
//     style={{
//       position: 'fixed',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       backgroundColor: '#F9FAFC',
//       padding: '16px',
//       borderRadius: '8px',
//       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//       zIndex: 999,
//     }}
//   >
//     <TextField
//       label="Enter Item"
//       variant="outlined"
//       fullWidth
//       margin="normal"
//       value={newItemText}
//       onChange={(e) => setNewItemText(e.target.value)}
//     />
//     <Button variant="contained" color="primary" onClick={handleAddItem}>
//       Add
//     </Button>
//     <Button variant="outlined" color="primary" style={{ marginLeft: '8px' }} onClick={handleCloseModal}>
//       Cancel
//     </Button>
//   </div>
// )}
