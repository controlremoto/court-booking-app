import React, { useState, useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem, Divider, ListItemText, IconButton, Tooltip } from "@mui/material";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import UserIcon from '@mui/icons-material/Person';
import AccessModal from "../auth/AccessModal";
import { UserContext } from "../../hooks/userContext";
import { useNavigate } from "react-router-dom";

export default function LandingHeader() {
  const [accessOpen, setAccessOpen] = useState(false);
  const { user, setUser, mode, setMode } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const loggedIn = user && user.username;

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={2}
        sx={{
          top: 0,
          zIndex: 1100,
          bgcolor: 'background.paper',
          boxShadow: 2
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            fontWeight={700}
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Sports Booking
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
              <IconButton
                color="primary"
                onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                aria-label="toggle dark mode"
                size="large"
              >
                {mode === "dark" ? <Brightness7Icon /> : <Brightness2Icon />}
              </IconButton>
            </Tooltip>
            {loggedIn ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="subtitle1" color="primary">
                  Welcome, {user.name || user.username}
                </Typography>
                <Avatar
                  sx={{ width: 36, height: 36, cursor: "pointer" }}
                  onClick={handleAvatarClick}
                >
                  {user.name ? user.name[0] : user.username[0]}
                </Avatar>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle2" fontWeight={700}>{user.name || user.username}</Typography>
                    <Typography variant="body2" color="text.secondary">{user.username}</Typography>
                  </Box>
                  <Divider />
                  <MenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>
                    <ListItemText>Go to my profile</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => { setUser({}); handleMenuClose(); navigate("/"); }}>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box>
                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<UserIcon color="primary" />}
                  onClick={() => setAccessOpen(true)}
                >
                  Access
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <AccessModal open={accessOpen} onClose={() => setAccessOpen(false)} />
    </>
  );
}
