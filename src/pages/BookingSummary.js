import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import AccessModal from "../components/auth/AccessModal";
import { UserContext } from "../hooks/userContext";

export default function BookingSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [accessOpen, setAccessOpen] = useState(false);
  const { state } = location;

  useEffect(() => {
    if (!user || !user.username) {
      setAccessOpen(true);
    }
  }, [user]);

  if (!state) {
    return <Typography>Invalid booking. Please start again.</Typography>;
  }
  if (!user || !user.username) {
    return <>
      <AccessModal open={accessOpen} onClose={() => setAccessOpen(false)} />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6" color="error" sx={{ mt: 8 }}>
          Please log in to view your booking summary.
        </Typography>
      </Box>
    </>;
  }
  const { courtType, date, slot, name } = state;
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ maxWidth: 500, mx: "auto", mt: 8 ,  flex:1, alignItems: "center", justifyContent: "center", display: "flex" }}>
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h4" fontWeight={700} color="success.main" gutterBottom>
            👏 Booking Confirmed!
          </Typography>
          <Typography variant="h6" mb={2}>
            Thank you <b>{name}</b>!
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
      <Footer />
    </Box>
  );
}
