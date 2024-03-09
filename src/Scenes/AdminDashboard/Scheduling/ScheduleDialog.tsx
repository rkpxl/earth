import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextFieldProps,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import axiosInstance from '../../../Utils/axiosUtil';


interface MeetingData {
  title: string;
  description: string;
  type: string;
  startAt: string;
  frequency: string;
  dates: string[];
  days: string[];
  group: string;
  other: string;
  mode: string;
  venue: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const ScheduleMeetingDialog: React.FC<Props> = ({ open, onClose }) => {
  const [meetingData, setMeetingData] = useState<MeetingData>({
    title: '',
    description: '',
    startAt: '',
    type: '',
    frequency: '',
    dates: [],
    days: [],
    group: '',
    other: '',
    mode: '',
    venue: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setMeetingData((prevData) => ({
      ...prevData,
      [name as string]: value as string,
    }));
  };

  const handleTimeChange = (newValue: Date | null) => {
    setMeetingData((prevData) => ({
      ...prevData,
      startAt: newValue ? newValue.toISOString() : '',
    }));
  };

  const handleClose = () => {
    setMeetingData({
      title: '',
      description: '',
      type: '',
      startAt: '',
      frequency: '',
      dates: [],
      days: [],
      group: '',
      other: '',
      mode: '',
      venue: '',
    })
    onClose()
  }

  const handleAddDate = () => {
    setMeetingData((prevData) => ({
      ...prevData,
      dates: [...prevData.dates, ''],
    }));
  };

  const handleAddDay = () => {
    setMeetingData((prevData) => ({
      ...prevData,
      days: [...prevData.days, ''],
    }));
  };

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...meetingData.dates];
    newDates[index] = value;
    setMeetingData((prevData) => ({
      ...prevData,
      dates: newDates,
    }));
  };

  const handleDayChange = (index: number, value: string) => {
    const newDays = [...meetingData.days];
    newDays[index] = value;
    setMeetingData((prevData) => ({
      ...prevData,
      days: newDays,
    }));
  };

  const handleSave = async () => {
    // Implement save functionality
    try {
      const response = await axiosInstance.post('/scheduler', {
        ...meetingData,
      })
      if(response.status < 300) {
        
      }
    } catch (err) {

    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Schedule Meeting</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={meetingData.title}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          value={meetingData.description}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Select Start Time"
              value={meetingData.startAt}
              onChange={handleTimeChange}
              renderInput={(params : any) => <TextField {...params} error={false} />}
            />
           </LocalizationProvider>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            label="Type"
            value={meetingData.type}
            onChange={handleChange}
          >
            <MenuItem value="adhoc">Adhoc</MenuItem>
            <MenuItem value="regular">Regular</MenuItem>
          </Select>
        </FormControl>
        {meetingData.type === 'regular' && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Frequency</InputLabel>
            <Select
              name="frequency"
              label="Frequency"
              value={meetingData.frequency}
              onChange={handleChange}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
          </FormControl>
        )}
        {(meetingData.frequency === 'monthly' || meetingData.type === 'adhoc') && (
          <div>
            {meetingData.dates.map((date, index) => (
              <TextField
                key={index}
                label={`Date ${index + 1}`}
                type="date"
                fullWidth
                margin="normal"
                value={date}
                onChange={(e) => handleDateChange(index, e.target.value)}
              />
            ))}
            <Button variant="outlined" onClick={handleAddDate}>
              Add Date
            </Button>
          </div>
        )}
        {meetingData.frequency === 'weekly' && (
          <div>
            {meetingData.days.map((day, index) => (
              <FormControl key={index} fullWidth margin="normal">
                <InputLabel>Day {index + 1}</InputLabel>
                <Select
                  value={day}
                  label={`Day ${index + 1}`}
                  onChange={(e) => handleDayChange(index, e.target.value as string)}
                >
                  <MenuItem value="Monday">Monday</MenuItem>
                  <MenuItem value="Tuesday">Tuesday</MenuItem>
                  <MenuItem value="Wednesday">Wednesday</MenuItem>
                  <MenuItem value="Thursday">Thursday</MenuItem>
                  <MenuItem value="Friday">Friday</MenuItem>
                  <MenuItem value="Saturday">Saturday</MenuItem>
                  <MenuItem value="Sunday">Sunday</MenuItem>
                </Select>
              </FormControl>
            ))}
            <Button variant="outlined" onClick={handleAddDay}>
              Add Day
            </Button>
          </div>
        )}
        <FormControl fullWidth margin="normal">
          <InputLabel>Group</InputLabel>
          <Select
            name="group"
            label="Group"
            value={meetingData.group}
            onChange={handleChange}
          >
            <MenuItem value="group1">Group 1</MenuItem>
            <MenuItem value="group2">Group 2</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        {meetingData.group === 'other' && (
          <TextField
            label="Other (Specify)"
            name="other"
            fullWidth
            margin="normal"
            value={meetingData.other}
            onChange={handleChange}
          />
        )}
        <FormControl fullWidth margin="normal">
          <InputLabel>Online/Offline</InputLabel>
          <Select
            name="mode"
            label="Online/Offline"
            value={meetingData.mode}
            onChange={handleChange}
          >
            <MenuItem value="online">Online</MenuItem>
            <MenuItem value="offline">Offline</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Venue"
          name="venue"
          fullWidth
          margin="normal"
          value={meetingData.venue}
          onChange={handleChange}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeetingDialog;
