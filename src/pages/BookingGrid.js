import React, { useEffect, useState, useContext, useRef } from "react";
import AccessModal from "../components/auth/AccessModal";
import { UserContext } from "../hooks/userContext";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import availabilityData from "../data/availability.json";
import Footer from "../components/common/Footer";

const availableSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

// Configurable minimum booking lead time (minutes)
const MIN_BOOKING_LEAD_MINUTES = 30;

// Helper: get current time in CLT (Chile Standard Time, UTC-4)
function getCurrentTimeInChile() {
    const chileTime = new Date().toLocaleString("en-US", {
        timeZone: "America/Santiago",
        timeZoneName: "short"
    });
    // Chile Standard Time is UTC-4
    return new Date(chileTime)
}

function getNext7Days() {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        days.push({
            date: d.toISOString().slice(0, 10),
            dayName: d.toLocaleDateString(undefined, { weekday: "short" }),
            dayOfMonth: d.getDate(),
        });
    }
    return days;
}

export default function BookingGrid() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const courtType = params.get("courtType") || "tennis";
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState("");
    const { user } = useContext(UserContext);
    const [accessOpen, setAccessOpen] = useState(false);
    // Store booking intent to auto-continue after login
    const bookingIntent = useRef(false);
    const days = getNext7Days();

    useEffect(() => {
        setSelectedSlot("");
    }, [selectedDay, courtType]);

    const handleBook = () => {
        if (!user || !user.username) {
            // Not logged in, show modal and set intent
            bookingIntent.current = true;
            setAccessOpen(true);
            return;
        }
        // Proceed with booking
        setTimeout(() => {
            navigate("/booking/summary", {
                state: {
                    courtType,
                    date: days[selectedDay].date,
                    slot: selectedSlot,
                    username: user.username,
                    name: user.name,
                },
            });
        }, 800);
    };

    // Effect: If modal closes and user is now logged in, auto-continue booking if intent was set
    useEffect(() => {
        if (accessOpen === false && bookingIntent.current && user && user.username) {
            bookingIntent.current = false;
            handleBook();
        }
        // eslint-disable-next-line
    }, [accessOpen, user]);


    const bookedSlots = availabilityData[courtType]?.[days[selectedDay].date] || [];

    // Determine which slots are blocked for today
    const isToday = selectedDay === 0;
    let blockedSlots = [];
    if (isToday) {
        const nowCLT = getCurrentTimeInChile();
        // Add lead time
        const minAllowed = new Date(nowCLT.getTime() + MIN_BOOKING_LEAD_MINUTES * 60000);
        blockedSlots = availableSlots.filter(slot => {
            // slot is "HH:MM"
            const [h, m] = slot.split(":").map(Number);
            const slotDate = new Date(nowCLT);
            slotDate.setHours(h, m, 0, 0);
            return slotDate < minAllowed;
        });
    }

    return (
        <>
            <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <Box sx={{ maxWidth: 700, mx: "auto", mt: 6, p: 3, flex: 1, alignItems: "center", justifyContent: "center", display: "flex" }}>
                    <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
                        <Typography variant="h5" fontWeight={700} mb={2}>
                            Book a {courtType} court
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                mb: 2,
                                justifyContent: { xs: "flex-start", sm: "center" },
                                maxWidth: "100%",
                            }}
                        >
                            {days.map((day, idx) => (
                                <Button
                                    key={day.date}
                                    variant={selectedDay === idx ? "contained" : "outlined"}
                                    onClick={() => setSelectedDay(idx)}
                                    sx={{
                                        minWidth: 60,
                                        px: 1,
                                        py: 1,
                                        fontSize: { xs: "0.85rem", sm: "1rem" },
                                        mb: { xs: 1, sm: 0 },
                                    }}
                                >
                                    <div>
                                        <div>{day.dayName}</div>
                                        <div>{day.dayOfMonth}</div>
                                    </div>
                                </Button>
                            ))}
                        </Box>
                        <Typography variant="subtitle1" mb={1}>
                            Select a time slot:
                        </Typography>
                        <Grid container spacing={1}>
                            {availableSlots.map((slot) => {
                                const isBooked = bookedSlots.includes(slot);
                                const isBlocked = isToday && blockedSlots.includes(slot);
                                const isSelected = selectedSlot === slot;
                                return (
                                    <Grid item xs={6} sm={4} md={2} key={slot}>
                                        <Button
                                            variant={isSelected ? "contained" : "outlined"}
                                            color={isBooked || isBlocked ? "inherit" : "primary"}
                                            disabled={isBooked || isBlocked}
                                            fullWidth
                                            sx={{
                                                bgcolor: (isBooked || isBlocked) ? "grey.300" : isSelected ? "primary.main" : undefined,
                                                color: (isBooked || isBlocked) ? "grey.600" : undefined,
                                                minWidth: 0,
                                                minHeight: 48,
                                                fontSize: { xs: "0.9rem", sm: "1rem" },
                                                p: { xs: 0.5, sm: 1 },
                                            }}
                                            onClick={() => {
                                                if (isSelected) {
                                                    setSelectedSlot("");
                                                } else {
                                                    setSelectedSlot(slot);
                                                }
                                            }}
                                        >
                                            {slot}
                                        </Button>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{ mt: 3 }}
                            disabled={!selectedSlot}
                            onClick={handleBook}
                        >
                            Confirm Booking
                        </Button>
                    </Paper>
                </Box>
                <Footer />
            </Box>
            <AccessModal open={accessOpen} onClose={() => setAccessOpen(false)} />
        </>
    );
}
