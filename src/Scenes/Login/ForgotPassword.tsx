import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", justifyContent: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
      {message && (
        <Typography variant="body1" color={message.includes('error') ? 'error' : 'success'}>
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default ForgotPassword;
