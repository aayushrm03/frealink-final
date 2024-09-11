import React from "react";
import HeroSection from "./HeroSection";
import AboutUsSection from "./AboutUs";
import CarouselSection from "./Carousel";


function FrontPage() {
  return (
    <div>
     
        <CarouselSection />
   
      <FadeInSection>
        <AboutUsSection />
    
    </div>
  );
}

export default FrontPage;
