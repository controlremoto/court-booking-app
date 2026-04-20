import React from "react";
import { Box } from "@mui/material";

export default function FullWidthBanner({ image, alt }) {
  return (
    <Box sx={{
      width: "100%",
      height: { xs: 220, sm: 320, md: 420 },
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      mb: 4,
    }}>
      <img
        src={image}
        alt={alt || "Team Banner"}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>
  );
}
