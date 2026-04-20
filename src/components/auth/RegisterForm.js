import React from "react";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";

export default function RegisterForm({ onRegister, onSSO }) {
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
      <Typography variant="h5" align="center" mb={2} fontWeight={700}>
        Register
      </Typography>
      <form onSubmit={e => { e.preventDefault(); onRegister && onRegister(); }}>
        <TextField label="Name" fullWidth margin="normal" required />
        <TextField label="Email" type="email" fullWidth margin="normal" required />
        <TextField label="Password" type="password" fullWidth margin="normal" required />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
      <Divider sx={{ my: 2 }}>or</Divider>
      <Button variant="outlined" color="secondary" fullWidth sx={{ mb: 1 }} onClick={() => onSSO && onSSO("google")}>Sign up with Google</Button>
      <Button variant="outlined" color="secondary" fullWidth sx={{ mb: 1 }} onClick={() => onSSO && onSSO("microsoft")}>Sign up with Microsoft</Button>
      <Button variant="outlined" color="secondary" fullWidth onClick={() => onSSO && onSSO("otp")}>Sign up with OTP</Button>
    </Box>
  );
}
