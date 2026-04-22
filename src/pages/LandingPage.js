import React from "react";
import HeroBanner from "../components/landing/HeroBanner";
import FullWidthBanner from "../components/landing/FullWidthBanner";
import Footer from "../components/common/Footer";

export default function LandingPage() {
  // Handler for "Book Now" button (could route to booking or login)
  const handleBook = (courtType) => {
    // TODO: Implement navigation to booking or login
    alert(`Booking for: ${courtType}`);
  };

  return (
    <>
      <FullWidthBanner image="/images/hero/homepage_cover.jpg" alt="Mixed Team Players" />
      <HeroBanner onBook={handleBook} />
      <Footer />
    </>
  );
}
