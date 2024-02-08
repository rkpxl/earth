import React, { useState, useRef } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { CircularProgress, Link } from '@mui/material'

interface DocumentComponentProps {
  documents: Array<any>
  setDocuments: Function
  isDisabled: boolean
}

const DocumentComponent = (props: DocumentComponentProps) => {
  const { documents, setDocuments, isDisabled = true } = props
  const fileInputRef = useRef<any>(null)

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      setDocuments([...documents, { name: file.name, file: file, uri: '' }])
    }
  }

  const handlInputChange = (event: any, index: number, type: string) => {
    const updatedDocuments = [...documents]
    updatedDocuments[index][type] = event.target.value
    setDocuments(updatedDocuments)
  }

  const handleAddButtonClick = () => {
    fileInputRef?.current?.click()
  }

  const handleDeleteDocument = (index: any) => {
    const updatedDocuments = [...documents]
    updatedDocuments.splice(index, 1)
    setDocuments(updatedDocuments)
  }

  if (!documents) {
    return (
      <>
        <CircularProgress />
      </>
    )
  }

  return (
    <div style={{ padding: '16px' }}>
      {documents.map((document: any, index: any) => (
        <Grid container key={index} spacing={2} style={{ marginBottom: '16px' }}>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Document Name"
              value={document.name}
              onChange={(e) => handlInputChange(e, index, 'name')}
              fullWidth
              variant="outlined"
              style={{ marginRight: '16px' }}
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Additional info"
              value={document.info}
              onChange={(e) => handlInputChange(e, index, 'info')}
              fullWidth
              variant="outlined"
              style={{ marginRight: '16px' }}
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={6} sm={1}>
            <Link
              href={document.uri}
              target="_blank"
              rel="noopener noreferrer"
              style={{ height: '100%', textAlign: 'center', display: 'flex', alignItems: 'center' }}
            >
              View
            </Link>
          </Grid>
          <Grid item xs={6} sm={1}>
            <IconButton
              color="primary"
              onClick={() => handleDeleteDocument(index)}
              style={{ height: '100%', textAlign: 'center', display: 'flex', alignItems: 'center' }}
              disabled={isDisabled}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddButtonClick}
        disabled={isDisabled}
      >
        Add Document
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
    </div>
  )
}

export default DocumentComponent
