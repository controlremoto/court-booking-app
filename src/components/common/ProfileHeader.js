import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";
import { UserContext } from "../../hooks/userContext";

export default function ProfileHeader() {
  const { user } = useContext(UserContext);
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          Sports Booking
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="subtitle1" color="primary">
            Welcome, {user?.name || user?.username || "User"}
          </Typography>
          <Avatar sx={{ width: 36, height: 36 }}>
            {user?.name ? user.name[0] : (user?.username ? user.username[0] : "U")}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
