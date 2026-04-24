import "devextreme/dist/css/dx.light.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LandingHeader from "./components/landing/LandingHeader";
import BookingGrid from "./pages/BookingGrid";
import BookingSummary from "./pages/BookingSummary";
import Profile from "./pages/Homepage/Profile/profile";
import NotFound from "./pages/NotFound";
import { UserContext } from "./hooks";

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

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        userId,
        setUserId,
        user,
        setUser,
      }}
    >
      <LandingHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/booking" element={<BookingGrid />} />
        <Route path="/booking/summary" element={<BookingSummary />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
