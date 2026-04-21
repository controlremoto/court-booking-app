import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../hooks/userContext";
import { usersAll } from "../../mocks/users";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Button,
  TextField,
  Divider,
  InputAdornment
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from "@mui/icons-material/Close";
import KeyIcon from "@mui/icons-material/VpnKey";
import GoogleIcon from '@mui/icons-material/Google';
import { FaMicrosoft } from 'react-icons/fa';

function TabPanel({ children, value, index }) {
  return value === index && <Box sx={{ pt: 2 }}>{children}</Box>;
}
export default function AccessModal({ open, onClose }) {
  const { setUser } = useContext(UserContext);
  
    // Login state
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState(0);
  // Always reset to login when modal opens
  useEffect(() => {
    if (open) setTab(0);
  }, [open]);

  // Password state for signup
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRetype, setSignupRetype] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupRetype, setShowSignupRetype] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Password rules
  const rules = [
    { label: "At least 8 characters", test: (v) => v.length >= 8 },
    { label: "Uppercase letter", test: (v) => /[A-Z]/.test(v) },
    { label: "Lowercase letter", test: (v) => /[a-z]/.test(v) },
    { label: "Number", test: (v) => /[0-9]/.test(v) },
    { label: "Special character", test: (v) => /[^A-Za-z0-9]/.test(v) },
  ];
  const passed = rules.filter(r => r.test(signupPassword)).length;
  const strength = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];

  function generatePassword() {
    // Secure random password
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+-=~";
    let pwd = "";
    let valid = false;
    do {
      let candidate = "";
      for (let i = 0; i < 12; i += 1) {
        const index = Math.floor(Math.random() * chars.length);
        candidate += chars.charAt(index);
      }

      pwd = candidate;
      valid = true;
      for (const rule of rules) {
        if (!rule.test(pwd)) {
          valid = false;
          break;
        }
      }
    } while (!valid);
    setSignupPassword(pwd);
    setSignupRetype(pwd); // Copy to retype field
    setShowRules(true);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{
        backdropFilter: "blur(6px)",
        '& .MuiDialog-paper': {
          borderRadius: 4,
          boxShadow: 8,
          p: 2,
          bgcolor: 'background.paper',
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: 8,
          p: 2,
          bgcolor: 'background.paper',
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <KeyIcon color="primary" />
          <Typography variant="h6" fontWeight={700} color="primary">
            Access
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="fullWidth"
        sx={{ mb: 2 }}
      >
        <Tab label="Login" />
        <Tab label="Signup" />
      </Tabs>
      <DialogContent sx={{ pt: 0 }}>
        <TabPanel value={tab} index={0}>
          <form
            onSubmit={e => {
              e.preventDefault();
              setLoginError("");
              const user = usersAll.find(
                u => u.username === loginEmail && u.password === loginPassword
              );
              if (user) {
                setUser(user);
                onClose && onClose();
                // Stay on current page after login
              } else {
                setLoginError("Incorrect email or password.");
              }
            }}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              required
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type={showLoginPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              required
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowLoginPassword((show) => !show)}
                      edge="end"
                      size="small"
                    >
                      {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {loginError && (
              <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
                {loginError}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Log In
            </Button>
          </form>
          <Divider sx={{ my: 2 }}>or</Divider>
          <Button variant="outlined" color="secondary" fullWidth sx={{ mb: 1 }} startIcon={<GoogleIcon />}>
            LOGIN WITH GOOGLE
          </Button>
          <Button variant="outlined" color="secondary" fullWidth startIcon={<FaMicrosoft />}>
            LOGIN WITH MICROSOFT
          </Button>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <form autoComplete="off">
            <TextField label="Email" type="email" fullWidth margin="normal" required />
            <TextField
              label="Password"
              type={showSignupPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              required
              value={signupPassword}
              onChange={e => { setSignupPassword(e.target.value); setShowRules(true); }}
              onFocus={() => setShowRules(true)}
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowSignupPassword((show) => !show)}
                      edge="end"
                      size="small"
                    >
                      {showSignupPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    <Button size="small" onClick={generatePassword} sx={{ ml: 1 }}>
                      Auto-generate
                    </Button>
                  </>
                )
              }}
            />
            <TextField
              label="Retype Password"
              type={showSignupRetype ? "text" : "password"}
              fullWidth
              margin="normal"
              required
              value={signupRetype}
              onChange={e => setSignupRetype(e.target.value)}
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowSignupRetype((show) => !show)}
                    edge="end"
                    size="small"
                  >
                    {showSignupRetype ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
            />
            {showRules && (
              <Box sx={{ mt: 1, mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Password must contain:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {rules.map((r, i) => (
                    <li key={i} style={{ color: r.test(signupPassword) ? "green" : "red", fontSize: "0.85em" }}>{r.label}</li>
                  ))}
                </ul>
                <Typography variant="caption" color={passed === rules.length ? "success.main" : "warning.main"}>
                  Strength: {strength[passed-1] || "Very Weak"}
                </Typography>
                {signupRetype && signupRetype !== signupPassword && (
                  <Typography variant="caption" color="error" display="block">Passwords do not match</Typography>
                )}
              </Box>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Sign Up
            </Button>
          </form>
          <Divider sx={{ my: 2 }}>or</Divider>
          <Button variant="outlined" color="secondary" fullWidth sx={{ mb: 1 }} startIcon={<GoogleIcon />}>
            SIGN UP WITH GOOGLE
          </Button>
          <Button variant="outlined" color="secondary" fullWidth startIcon={<FaMicrosoft />}>
            SIGN UP WITH MICROSOFT
          </Button>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
}
