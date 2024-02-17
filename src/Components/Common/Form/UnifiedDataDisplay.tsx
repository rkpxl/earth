import React from 'react';
import { Card, CardContent, Typography, Link, Chip, Box, Grid } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { moreInfoFormConfigs } from '../../../Utils/types/type';

// Assuming `moreInfoFormConfigs` and `FormSubmission` types are imported or defined above

interface UnifiedDataDisplayProps {
  formData: any[];
}

const UnifiedDataDisplay: React.FC<UnifiedDataDisplayProps> = ({ formData }) => {
  return (
    <Grid container spacing={2} sx={{mt:3}}>
      {formData?.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card raised sx={{ minWidth: 275, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {item?.data?.title || 'No Title'}
              </Typography>
              <Chip label={item?.type?.toUpperCase()} size="small" variant="outlined" color="primary" sx={{ mb: 2 }} />
        
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Created by {item?.createdByName} on {new Date(item.createdAt).toLocaleDateString()}
              </Typography>
        
              {/* Data Fields */}
              <Box sx={{ mb: 2 }}>
                {Object.entries(item?.data).map(([key, value] : any) => {
                  const fieldConfig = moreInfoFormConfigs[item?.type]?.find(config => config.id === key);
                  return (
                    fieldConfig && (
                      <Typography variant="body2" key={key} sx={{ mt: 1 }}>
                        <strong>{fieldConfig?.label}:</strong> {value}
                      </Typography>
                    )
                  );
                })}
              </Box>
            </CardContent>
        
            {/* Attachment */}
            {console.log('item.attachment', item.attachment)}
            {item.attachment && (
              <Box sx={{ p: 2, pt: 1, borderTop: 1, borderColor: 'divider' }}>
              <Link 
                href={`https://docs.google.com/viewer?url=${encodeURIComponent(item?.attachment)}&embedded=true`} 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'primary.main' }}>
                <AttachmentIcon sx={{ mr: 1 }} />
                View Attachment
              </Link>
            </Box>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UnifiedDataDisplay;
