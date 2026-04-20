import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  if (!state) {
    return <Typography>Invalid booking. Please start again.</Typography>;
  }
  const { courtType, date, slot, username } = state;
  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 8 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700} color="success.main" gutterBottom>
          🎾 Booking Confirmed!
        </Typography>
        <Typography variant="h6" mb={2}>
          Thank you, <b>{username}</b>!
        </Typography>
        <Typography variant="body1" mb={1}>
          <b>Court:</b> {courtType.charAt(0).toUpperCase() + courtType.slice(1).replace(/\d/, " $&").replace(/([A-Z])/g, " $1")}
        </Typography>
        <Typography variant="body1" mb={1}>
          <b>Date:</b> {date}
        </Typography>
        <Typography variant="body1" mb={2}>
          <b>Time:</b> {slot}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          A confirmation email has been sent to you. Enjoy your game and good luck!
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/")}>Back to Home</Button>
      </Paper>
    </Box>
  );
}
