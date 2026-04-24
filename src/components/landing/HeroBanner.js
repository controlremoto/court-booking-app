import React from "react";
import { Box, Typography, Button, Grid, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const courtTypes = [
  {
    name: "Tennis Court",
    value: "tennis",
    image: "/images/tennis.jpg",
    description: "Book our professional tennis court for singles or doubles.",
  },
  {
    name: "Padel Court",
    value: "padel",
    image: "/images/padel.jpg",
    description: "Enjoy a match on one of our two padel courts.",
  },
  {
    name: "Soccer 7 Court",
    value: "soccer7",
    image: "/images/soccer.jpg",
    description: "Gather your friends for a game of Soccer 7!",
  },
  {
    name: "Beach Volley Court",
    value: "beachvolley",
    image: "/images/beachvolley.jpg",
    description: "Play beach volleyball on our sand court.",
  },
];

export default function HeroBanner() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{
      width: "100%",
      minHeight: 400,
      background: theme.palette.background.default,
      py: 6,
    }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight={700}>
        Welcome to the Sports Booking Center
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" mb={4}>
        Book your favorite court in seconds
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {courtTypes.map((court) => (
          <Grid item xs={12} sm={6} md={3} key={court.name}>
            <Box sx={{
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
              height: "100%",
              transition: 'box-shadow 0.3s',
              boxShadow: theme =>
                theme.palette.mode === 'dark'
                  ? '0 4px 24px 0 rgba(255,255,255,0.08), 0 1.5px 6px 0 rgba(0,0,0,0.25)'
                  : '0 4px 24px 0 rgba(0,0,0,0.08), 0 1.5px 6px 0 rgba(0,0,0,0.15)',
            }}>
              <img
                src={court.image}
                alt={court.name}
                style={{ width: "100%", height: 180, objectFit: "cover" }}
              />
              <Typography variant="h6" mt={2} fontWeight={600}>
                {court.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" mb={2}>
                {court.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/booking?courtType=${court.value}`)}
                sx={{ mt: "auto" }}
              >
                Book Now
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
