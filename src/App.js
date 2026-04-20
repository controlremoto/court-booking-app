import "devextreme/dist/css/dx.light.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BookingGrid from "./pages/BookingGrid";
import BookingSummary from "./pages/BookingSummary";
import { UserContext } from "./hooks";

function App() {
  const [username, setUsername] = useState(localStorage["username"] || "");
  useEffect(() => {
    localStorage["username"] = username;
  }, [username]);

  const [userId, setUserId] = useState(localStorage["userId"] || "");
  useEffect(() => {
    localStorage["userId"] = userId;
  }, [userId]);

  const [user, setUser] = useState(localStorage["user"] || "");
  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/booking" element={<BookingGrid />} />
        <Route path="/booking/summary" element={<BookingSummary />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
