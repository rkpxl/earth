import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Divider, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const Popup = ({ open, onClose, onSave } : any) => {
  const [items, setItems] = useState<string[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddItem = () => {
    if (newItemText.trim() !== '') {
      setItems([...items, newItemText]);
      setNewItemText('');
      handleCloseModal();
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleDragStart = (e: any, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: any, index: number) => {
    e.preventDefault();
    const draggedIndex = Number(e.dataTransfer.getData('text/plain'));
    if (index !== draggedIndex) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggedIndex, 1);
      updatedItems.splice(index, 0, draggedItem);
      setItems(updatedItems);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} >
      <DialogContent sx={{ padding: 2 }} >
        <DialogTitle sx={{padding: "0px"}}>New Group Details</DialogTitle>
        <TextField
          label="Enter Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newItemText}
          required={true}
          onChange={(e) => setNewItemText(e.target.value)}
          sx={{ minWidth: "450px" }}
        />
         <TextField
          label="Primary Email"
          variant="outlined"
          fullWidth
          required={false}
          margin="normal"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          sx={{ minWidth: "450px" }}
        />

        {/* Buttons */}
        <Grid sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
          <Button onClick={onSave} color="primary" sx={{ marginTop: 1 }}>
            Save
          </Button>
          <Button onClick={onClose} color="primary" sx={{ marginTop: 1 }}>
            Close
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;