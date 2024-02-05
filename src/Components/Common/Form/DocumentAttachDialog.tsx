import React, { useRef, useState } from 'react'
import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import axiosInstance from '../../../Utils/axiosUtil'
import { useDispatch } from 'react-redux'
import { showMessage } from '../../../Store/reducers/snackbar'
import { RefetchQueryFilters, useQueryClient } from '@tanstack/react-query'
import { endLoading, startLoading } from '../../../Store/reducers/loading'

interface AddDocumentDialogProps {
  open: boolean
  onClose: () => void
  onAddDocument: (data: DocumentData) => void
  protocolId: string
  complianceId: number
}

interface DocumentData {
  documentFile: File | null
  versionFile: File | null
  title: string
  description: string
  protocolId: string
}

const DocumentAttachDialog: React.FC<AddDocumentDialogProps> = ({
  open,
  onClose,
  onAddDocument,
  protocolId,
  complianceId,
}) => {
  const [documentFile, setDocumentFile] = useState<any | null>(null)
  const [versionFile, setVersionFile] = useState<any | null>(null)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const documentInputRef = useRef<HTMLInputElement>(null)
  const versionInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const handleAddDocument = () => {
    // Add your logic to handle the document addition
    // You can pass the entered data to the parent component
    onAddDocument({
      documentFile,
      versionFile,
      title,
      description,
      protocolId: '',
    })

    // Close the dialog after adding the document
    onClose()
  }

  const handleDocumentButtonClick = () => {
    documentInputRef.current?.click()
  }

  const handleVersionButtonClick = () => {
    versionInputRef.current?.click()
  }

  const uploadDoc = async (doc: any) => {
    if (!(doc.file instanceof Blob)) {
      console.error(`Invalid file format for document ${doc.name}.`)
      return null // Return null or handle the error appropriately.
    }

    const formData = new FormData()
    formData.append('file', doc.file, doc.name)

    try {
      const response = await axiosInstance.post('/document/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data
    } catch (error) {
      console.error(`Error uploading document ${doc.name}:`, error)
      throw error // Rethrow the error to handle it outside the function if needed.
    }
  }

  const handleAdd = async () => {
    if (!documentFile) {
      dispatch(showMessage({ message: 'Please attach file' }))
      return
    }
    dispatch(startLoading())
    onClose()
    try {
      const docUri = await uploadDoc(documentFile)
      const doc = await axiosInstance.post('/document', {
        title: title,
        description: description,
        docLink: docUri,
        protocol_id: protocolId,
        complianceId: complianceId,
      })
      if (doc.status < 300) {
        dispatch(showMessage({ message: 'Document Added', severity: 'success' }))
        queryClient.refetchQueries([`compliance-document-${protocolId}`] as RefetchQueryFilters)
      }
    } catch (err) {
      console.error(err)
      dispatch(showMessage({ message: 'Document Not Added', severity: 'error' }))
    } finally {
      dispatch(endLoading())
      setDocumentFile(null)
      setVersionFile(null)
      setTitle('')
      setDescription('')
    }
  }
  const handleFileInputChange = (event: any, isVersion: boolean) => {
    const file = event.target.files[0]
    if (file) {
      if (isVersion) {
        setVersionFile({ name: file.name, file: file, uri: '' })
      } else {
        setDocumentFile({ name: file.name, file: file, uri: '' })
      }
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Document</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" onClick={handleDocumentButtonClick}>
              Attach Document
            </Button>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref={documentInputRef}
              style={{ display: 'none' }}
              onChange={(e) => handleFileInputChange(e, false)}
            />
            {documentFile && <div>{documentFile.name}</div>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" onClick={handleVersionButtonClick}>
              Attach Marked up Version
            </Button>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref={versionInputRef}
              style={{ display: 'none' }}
              onChange={(e) => setVersionFile(e.target.files?.[0] || null)}
            />
            {versionFile && <div>{versionFile.name}</div>}
          </Grid>
        </Grid>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={description}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setDescription(e.target.value)
          }
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Document
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default DocumentAttachDialog
