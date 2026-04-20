import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ width: "100%", bgcolor: "grey.100", py: 3, mt: 6, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} Sports Booking Center. All rights reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <Link href="/about" color="inherit" underline="hover">About</Link> |{' '}
        <Link href="/contact" color="inherit" underline="hover">Contact</Link> |{' '}
        <Link href="/privacy" color="inherit" underline="hover">Privacy Policy</Link>
      </Typography>
    </Box>
  );
}
