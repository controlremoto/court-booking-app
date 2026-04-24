import React from "react";
import { Box, Typography, Link, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: isDark ? theme.palette.grey[900] : "grey.100",
        color: isDark ? theme.palette.text.primary : "inherit",
        py: 3,
        mt: 6,
        textAlign: "center",
        borderTop: `1px solid ${isDark ? theme.palette.grey[800] : theme.palette.grey[200]}`,
      }}
    >
      <Typography variant="body2" color={isDark ? "#fff" : "text.secondary"}>
        &copy; {new Date().getFullYear()} Sports Booking Center. All rights reserved.
      </Typography>
      <Typography variant="body2" color={isDark ? "#fff" : "text.secondary"}>
        <Link href="/about" color={isDark ? "#fff" : "inherit"} underline="hover">About</Link> |{' '}
        <Link href="/contact" color={isDark ? "#fff" : "inherit"} underline="hover">Contact</Link> |{' '}
        <Link href="/privacy" color={isDark ? "#fff" : "inherit"} underline="hover">Privacy Policy</Link>
      </Typography>
    </Box>
  );
}
