import "devextreme/dist/css/dx.light.css";
import { useEffect, useState, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LandingHeader from "./components/landing/LandingHeader";
import BookingGrid from "./pages/BookingGrid";
import BookingSummary from "./pages/BookingSummary";
import Profile from "./pages/Homepage/Profile/profile";
import { UserContext } from "./hooks";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";


function App() {
  // Persist user object in localStorage as JSON
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (user && user.username) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Optionally, keep username/userId for legacy compatibility
  const [username, setUsername] = useState(user?.username || "");
  const [userId, setUserId] = useState(user?.id || "");

  // Theme state (light/dark)
  const [mode, setMode] = useState(() => {
    const stored = localStorage.getItem("themeMode");
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContext.Provider
        value={{
          username,
          setUsername,
          userId,
          setUserId,
          user,
          setUser,
          mode,
          setMode,
        }}
      >
        <LandingHeader />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/booking" element={<BookingGrid />} />
          <Route path="/booking/summary" element={<BookingSummary />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
