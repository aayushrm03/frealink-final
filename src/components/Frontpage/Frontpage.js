import React from "react";
import HeroSection from "./HeroSection";
import AboutUsSection from "./AboutUs";
import CarouselSection from "./Carousel";
import FadeInSection from '../FadeInSection'; 

function FrontPage() {
  return (
    <div>
      <FadeInSection>
        <HeroSection />
      </FadeInSection>
      <FadeInSection>
        <CarouselSection />
      </FadeInSection>
      <FadeInSection>
        <AboutUsSection />
      </FadeInSection>
    </div>
  );
}

export default FrontPage;
