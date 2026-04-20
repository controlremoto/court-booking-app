import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import availabilityData from "../data/availability.json";
import users from "../data/users.json";

const availableSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

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
    //const [booking, setBooking] = useState(null);
    const days = getNext7Days();
    const username = users[0].username; // Mock: always Alice

    useEffect(() => {
        setSelectedSlot("");
    }, [selectedDay, courtType]);

    const handleBook = () => {
       // setBooking({
       //     courtType,
       //     date: days[selectedDay].date,
       //     slot: selectedSlot,
       //     username,
       // });
        setTimeout(() => {
            navigate("/booking/summary", {
                state: {
                    courtType,
                    date: days[selectedDay].date,
                    slot: selectedSlot,
                    username,
                },
            });
        }, 800);
    };

    const bookedSlots = availabilityData[courtType]?.[days[selectedDay].date] || [];

    return (
        <Box sx={{ maxWidth: 700, mx: "auto", mt: 6, p: 3 }}>
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
                        const isSelected = selectedSlot === slot;
                        return (
                            <Grid item xs={6} sm={4} md={2} key={slot}>
                                <Button
                                    variant={isSelected ? "contained" : "outlined"}
                                    color={isBooked ? "inherit" : "primary"}
                                    disabled={isBooked}
                                    fullWidth
                                    sx={{
                                        bgcolor: isBooked ? "grey.300" : isSelected ? "primary.main" : undefined,
                                        color: isBooked ? "grey.600" : undefined,
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
    );
}
