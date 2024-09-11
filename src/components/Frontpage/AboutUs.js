import React from "react";
import bg2 from "../../assets/bg2.png";

const Card = ({ title, content }) => (
  <div className="bg-white p-6 rounded-xl shadow-xl m-4 w-2/5 hover:scale-105 transition-all duration-1000 ease-in-out">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="mt-4 text-lg">{content}</p>
  </div>
);

function AboutUsSection() {
  return (
    <div
      style={{
        backgroundImage: `url(${bg2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
       className="text-center h-auto pt-10 flex "
>
    <div className="px-4 md:px-12">
      <h1 className="text-5xl font-extrabold p-6 text-center">
        <span className="text-indigo-950">About</span> Us :
      </h1>
      <div className="flex justify-between">
        <div className="pt-20">
        </div>

        <div className="flex flex-wrap justify-center w-3/4 mb-6">
          <Card 
            title="Our Mission"
            content="Our mission is to empower freelancers and gig workers by providing a seamless platform that bridges the gap between their skills and job opportunities. We believe in creating a supportive community where both freelancers and employers can thrive."
          />
          <Card
            title="Our Belief"
            content="At Frealink, we believe in the power of freelancing as a catalyst for personal and professional growth. We are driven by the following core principles: Empowerment, Opportunities, Trust, Innovation"
          />
          <Card
            title="Join Us"
            content="Whether you're a freelancer looking to showcase your skills or an employer seeking talented professionals, Frealink is the perfect place for you."
          />
        </div>
      </div>
    </div>
   </div>
  );
}

export default AboutUsSection;
