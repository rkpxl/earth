import React, { useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Grid, IconButton, FormControl, InputLabel, Select, Typography } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { FieldConfig, moreInfoFormConfigs } from '../../../Utils/types/type';
import axiosInstance from '../../../Utils/axiosUtil';
import { useRouter } from 'next/router';
import { uploadDoc } from '../../../Utils/util';
import { useDispatch } from 'react-redux';
import { endLoading, startLoading } from '../../../Store/reducers/loading';
import UnifiedDataDisplay from './UnifiedDataDisplay';

const MoreInfo: React.FC = ({moreInfo} : any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>('');
  const [formData, setFormData] = useState<any>({});
  const [apiData, setApiData] = useState(moreInfo.data)
  const [documentFile, setDocumentFile] = useState<any | null>(null)
  const dispatch = useDispatch()
  const documentInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const initForm = () => {
    setOpen(false)
    setFormData({})
    setDocumentFile(null)
  }

  const handleDocumentButtonClick = () => {
    documentInputRef.current?.click()
  }

  const handleFormTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormType(event.target.value as string);
    setFormData({}); // Reset form data on form type change
  };

  const handleFileInputChange = (event: any, isVersion: boolean) => {
    const file = event.target.files[0]
    if (file) {
      setDocumentFile({ name: file.name, file: file, uri: '' })
    }
  }


  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const handleSave = async () => {
    const { id } = router.query
    let docUri = null
    setOpen(false)
    dispatch(startLoading())
    if(documentFile) docUri =  await uploadDoc(documentFile)
    try {
      const response = await axiosInstance.post('/moreinfo', {
        data: formData,
        protocol_id: id,
        type: formType,
        attachment: docUri || 'test',
        tabId: 1,
      })
      setApiData((prev : any) => [response.data, ...prev])
    } catch (err) {
      console.error(err)
    }
    dispatch(endLoading())
    initForm()
  }

  const renderField = (fieldConfig: FieldConfig) => {
    switch (fieldConfig.type) {
      case 'text':
      case 'number':
        return (
          <TextField
              key={fieldConfig.id}
              fullWidth
              label={fieldConfig.label}
              type={fieldConfig.type}
              variant="outlined"
              value={formData[fieldConfig.id] || ''}
              onChange={handleChange}
              name={fieldConfig.id}
              multiline={fieldConfig.type === 'text' && fieldConfig.hasOwnProperty('multiline')}
              rows={fieldConfig.type === 'text' ? fieldConfig.rows || 1 : undefined}
            />
        );
      case 'date':
        return (
          <TextField
              key={fieldConfig.id}
              fullWidth
              type={fieldConfig.type}
              variant="outlined"
              value={formData[fieldConfig.id] || ''}
              onChange={handleChange}
              name={fieldConfig.id}
            />
        );
      case 'select':
        return (
          <FormControl fullWidth key={fieldConfig.id}>
            <InputLabel>{fieldConfig.label}</InputLabel>
            <Select
              label={fieldConfig.label}
              value={formData[fieldConfig.id] || ''}
              onChange={handleChange}
              name={fieldConfig.id}
            >
              {fieldConfig.options?.map(option => (
                <MenuItem  key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'attachment':
        return (
          <div key={fieldConfig.id}>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref={documentInputRef}
              style={{ display: 'none' }}
              onChange={(e) => handleFileInputChange(e, false)}
            />
            {documentFile && <div>{documentFile.name}</div>}
            <label htmlFor={`file-upload-${fieldConfig.id}`}>
              <IconButton component="span" onClick={handleDocumentButtonClick}>
                <FileUploadIcon />
              </IconButton>
              <Typography variant="body2">Upload</Typography>
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  const renderFields = () => {
    const fieldsConfig = moreInfoFormConfigs[formType];
    if (!fieldsConfig) return null;

    return fieldsConfig.map(fieldConfig => (
      <Grid item xs={fieldConfig.xs} md={fieldConfig.md || 12} key={fieldConfig.id}>
        {renderField(fieldConfig)}
      </Grid>
    ));
  };

  return (
    <Grid container>
      <Grid xs={12} justifyContent="center" alignItems="center" sx={{ display: 'flex', mt: 4 }}>
        <Button variant="contained" onClick={handleOpen} sx={{ minWidth: '312px' }}>
          Add More Info
        </Button>
      </Grid>
      <UnifiedDataDisplay formData={apiData || []} />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add More Info</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                label="Info Type"
                value={formType}
                onChange={handleFormTypeChange}
                fullWidth
                sx={{mt: 1}}
              >
                {Object.keys(moreInfoFormConfigs).map(key => (
                  <MenuItem key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize the first letter */}
                  </MenuItem>
                ))}
                {/* Add more MenuItem for other infoTypes */}
              </TextField>
            </Grid>
          </Grid>
          <form noValidate autoComplete="off">
          <Grid container spacing={2} sx={{mt: 1}}>
            {renderFields()}
          </Grid>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default MoreInfo;
