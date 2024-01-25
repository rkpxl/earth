import React, { useRef, useState } from 'react'
import { useProtocolContext } from '../../../Scenes/Protocol/Protocol'
import { ICompliance, IDocument, IProtocol } from '../../../Utils/types/type'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../../../Utils/axiosUtil'
import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material'
import Loading from '../Loading'
import DeleteIcon from '@mui/icons-material/Delete'
import DocumentAttachDialog from './DocumentAttachDialog'

interface IProps {
  compliance: ICompliance
  tabNumber?: number
  protocol: IProtocol
}

export default function FormAttachment({ compliance, protocol }: IProps) {
  const fileInputRef = useRef<any>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [documents, setDocuments] = useState([])
  const isDisabled = false
  const { data, isLoading, isError } = useQuery({
    queryKey: [`compliance-document-${protocol?._id}`],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get('/document', {
          params: {
            protocol_id: protocol?._id,
          },
        })
        return response.data
      } catch (err) {
        console.error(err)
      }
    },
  })

  const handlInputChange = (event: any, index: number, type: string) => {
    const updatedDocuments = [...documents]
    // updatedDocuments[index][type] = event.target.value;
    setDocuments(updatedDocuments)
  }

  const handleAddButtonClick = () => {
    // fileInputRef?.current?.click();
    setIsOpen((prev) => !prev)
  }

  const handleDeleteDocument = (index: any) => {
    const updatedDocuments = [...documents]
    updatedDocuments.splice(index, 1)
    setDocuments(updatedDocuments)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div style={{ padding: '0px' }}>
      {data.map((document: IDocument, index: any) => (
        <Grid container key={index} spacing={2} style={{ marginBottom: '16px' }}>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Document Name"
              value={document.title}
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
              value={document.description}
              onChange={(e) => handlInputChange(e, index, 'info')}
              fullWidth
              variant="outlined"
              style={{ marginRight: '16px' }}
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={6} sm={1}>
            <a
              href={document.docLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ height: '100%', textAlign: 'center', display: 'flex', alignItems: 'center' }}
            >
              View
            </a>
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
      <DocumentAttachDialog
        open={isOpen}
        onClose={() => setIsOpen((prev) => !prev)}
        onAddDocument={() => {}}
        protocolId={protocol._id}
        complianceId={compliance.id || 1}
      />
    </div>
  )
}
