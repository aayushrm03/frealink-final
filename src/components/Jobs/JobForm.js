import React, { useState } from "react";
import { db, auth } from "../Firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const JobForm = () => {
  const [user] = useAuthState(auth);
  const [jobDetails, setJobDetails] = useState({
    title: "",
    companyName: "",
    salary: "",
    location: "",
    locationLink: "",
    jobType: "",
    description: "",
    requirements: "",
    // Removed applicationLink from state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (jobDetails.description.length < 20) {
      alert("Description must be at least 20 characters long.");
      return;
    }

    try {
      await addDoc(collection(db, "jobs"), {
        ...jobDetails,
        posterId: user.uid,
      });
      setJobDetails({
        title: "",
        companyName: "",
        salary: "",
        location: "",
        locationLink: "",
        jobType: "",
        description: "",
        requirements: "",
        // Reset state without applicationLink
      });
      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job: ", error);
    }
  };

  return (
    <div className="relative z-10 pt-28 pb-10 px-4 sm:px-6 md:px-8 bg-gray-200">
      <h2 className="text-4xl font-bold mb-4 text-center">
        <span className="text-rose-800">Post</span> Job
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow-md rounded-lg w-2/3 mx-auto space-y-2 mb-4"
      >
        {/* Job Title */}
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title :
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={jobDetails.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
        />
        {/* Company Name */}
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700"
        >
          Company Name :
        </label>
        <input
          id="companyName"
          type="text"
          name="companyName"
          value={jobDetails.companyName}
          onChange={handleChange}
          placeholder="Company Name"
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
        />
        {/* Salary */}
        <label
          htmlFor="salary"
          className="block text-sm font-medium text-gray-700"
        >
          Salary :
        </label>
        <input
          id="salary"
          type="text"
          name="salary"
          value={jobDetails.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
        />
        {/* Location */}
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Job Location :
        </label>
        <input
          id="location"
          type="text"
          name="location"
          value={jobDetails.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
        />
        {/* Location Link */}
        <label
          htmlFor="locationLink"
          className="block text-sm font-medium text-gray-700"
        >
          Location Link (Google Map) :
        </label>
        <input
          id="locationLink"
          type="text"
          name="locationLink"
          value={jobDetails.locationLink}
          onChange={handleChange}
          placeholder="Google Map Location Link"
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
        />
        {/* job Type */}
        <label
          htmlFor="jobType"
          className="block text-sm font-medium text-gray-700"
        >
          Job Type :
        </label>
        <input
          id="jobType"
          type="text"
          name="jobType"
          value={jobDetails.jobType}
          onChange={handleChange}
          placeholder="Full-time, Part-time, Contract, etc."
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
        />
        {/* Job Description */}
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Job Description :
        </label>
        <textarea
          id="description"
          name="description"
          value={jobDetails.description}
          onChange={handleChange}
          placeholder="Job Description (min 20 characters)"
          required
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
        />
        {/* Job Requirements */}
        <label
          htmlFor="requirements"
          className="block text-sm font-medium text-gray-700"
        >
          Job Requirements :
        </label>
        <textarea
          id="requirements"
          name="requirements"
          value={jobDetails.requirements}
          onChange={handleChange}
          placeholder="Skills and Requirements"
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
        />
        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-rose-800 to-fuchsia-800 hover:scale-105 font-medium rounded-full text-sm px-5 py-2.5"
          >
            Post Job Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
