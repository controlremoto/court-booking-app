import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import UserIcon from '@mui/icons-material/Person';
import AccessModal from "../auth/AccessModal";

export default function LandingHeader() {
  const [accessOpen, setAccessOpen] = useState(false);
  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={700} color="primary">
            Sports Booking
          </Typography>
          <Box>
            <Button
              color="primary"
              variant="outlined"
              // use <KeyIcon color="primary" /> instead of startIcon
              startIcon={<UserIcon color="primary" />}

              onClick={() => setAccessOpen(true)}
            >
              Access
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <AccessModal open={accessOpen} onClose={() => setAccessOpen(false)} />
    </>
  );
}
