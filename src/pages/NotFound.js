
import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";

const legsGif = process.env.PUBLIC_URL + "/images/legs-wobbling.gif";

export default function NotFound() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: theme.palette.background.default,
      color: theme.palette.text.primary,
      textAlign: "center",
      px: 2,
    }}>
      <Typography variant="h1" fontWeight={800} mb={2} color="primary">
        404
      </Typography>
      <img
        src={legsGif}
        alt="Legs wobbling animation"
        style={{ width: 220, maxWidth: "80%", marginBottom: 24 }}
      />
      <Typography variant="h4" mb={2}>
        Page Not Found
      </Typography>
      <Typography variant="body1" mb={4} color="text.secondary">
        This page is off the court. Ready to book a real one?
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>Go to Homepage</Button>
      <Box sx={{ flexGrow: 1 }} />
      <Footer />
    </Box>
  );
}