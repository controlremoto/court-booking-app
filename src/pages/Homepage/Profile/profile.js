import React, { useContext } from "react";
import { UserContext } from "../../../hooks/userContext";
import { Box, Typography, Avatar, Paper, Button, Divider, Chip } from "@mui/material";
import Footer from "../../../components/common/Footer";

// Mock booking history and profile details for demo
const mockProfile = {
  name: "Alice",
  email: "alice@email.com",
  phone: "+1-555-123-4567",
  country: "USA",
  region: "California",
  communa: "San Francisco",
  address: "123 Tennis Lane",
  team: "Aces",
  results: [
    { match: "Alice vs Bob", result: "Win", score: "6-3, 6-4" },
    { match: "Alice vs Carol", result: "Loss", score: "4-6, 5-7" }
  ],
  bookings: [
    { court: "Court 1", date: "2026-04-10", time: "10:00", opponent: "Bob" },
    { court: "Court 2", date: "2026-04-12", time: "11:00", opponent: "Carol" }
  ]
};

export default function Profile() {
  const { user } = useContext(UserContext);
  if (!user || !user.username) {
    return <Typography variant="h6">You must be logged in to view your profile.</Typography>;
  }

  // Use mockProfile for demo, but merge with user context if available
  const profile = { ...mockProfile, ...user };

  return (
    <Box sx={{ bgcolor: "#f7f8fa", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Main content grows and centers vertically */}
      <Box sx={{ flex:1,  width: "100%", px: { xs: 2, sm: 3 }, py: 3, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Outer flex row on desktop, column on mobile — always centered */}
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "center",
          gap: 3,
          maxWidth: 1100,
          mx: "auto",
          width: "100%",
        }}>
          {/* Profile Card */}
          <Box sx={{ width: "100%", maxWidth: 340 }}>
            <Paper elevation={3} sx={{ borderRadius: 4, p: 3, textAlign: "center" }}>
              <Avatar sx={{ width: 90, height: 90, mx: "auto", mb: 2, bgcolor: "primary.main", fontSize: 40 }}>
                {profile.name ? profile.name[0] : profile.username[0]}
              </Avatar>
              <Typography variant="h6" fontWeight={700}>{profile.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{profile.role || "User"}</Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="body2"><b>Email:</b> {profile.email}</Typography>
                <Typography variant="body2"><b>Phone:</b> {profile.phone || "-"}</Typography>
                <Typography variant="body2"><b>Country:</b> {profile.country || "-"}</Typography>
                <Typography variant="body2"><b>Region:</b> {profile.region || "-"}</Typography>
                <Typography variant="body2"><b>Communa:</b> {profile.communa || "-"}</Typography>
                <Typography variant="body2"><b>Address:</b> {profile.address || "-"}</Typography>
                <Typography variant="body2"><b>Team:</b> {profile.team || "Auto-generated"}</Typography>
              </Box>
              <Button variant="contained" color="primary" sx={{ mt: 3, borderRadius: 2, px: 4, width: "100%" }}>
                Edit Profile
              </Button>
            </Paper>
          </Box>

          {/* Booking History & Results */}
          <Box sx={{ width: "100%", maxWidth: { xs: 340, md: 680 }, display: "flex", flexDirection: "column", gap: 3 }}>
            <Paper elevation={2} sx={{ borderRadius: 4, p: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Booking History</Typography>
              <Divider sx={{ mb: 2 }} />
              {profile.bookings && profile.bookings.length > 0 ? (
                profile.bookings.map((b, i) => (
                  <Box key={i} sx={{ mb: 2, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                    <Typography variant="body1" fontWeight={600} >{b.court}</Typography>
                    <Typography variant="body2" color="text.secondary">{b.date} at {b.time}</Typography>
                    <Chip label={`Opponent: ${b.opponent || "Auto-generated"}`} color="primary" />
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No bookings yet.</Typography>
              )}
            </Paper>

            <Paper elevation={2} sx={{ borderRadius: 4, p: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Results</Typography>
              <Divider sx={{ mb: 2 }} />
              {profile.results && profile.results.length > 0 ? (
                profile.results.map((r, i) => (
                  <Box key={i} sx={{ mb: 2, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                    <Typography variant="body1">{r.match}</Typography>
                    <Typography variant="body2" color="text.secondary">{r.score}</Typography>
                    <Chip label={r.result} color={r.result === "Win" ? "success" : "error"} />
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No results yet.</Typography>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
