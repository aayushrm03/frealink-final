import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase/Firebase'; 

const JobApplicationForm = () => {
  const { jobId } = useParams();
  const [freelancer] = useAuthState(auth);
  const navigate = useNavigate();
  const [applicationDetails, setApplicationDetails] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicationDetails({ ...applicationDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (freelancer) {
      try {
        await addDoc(collection(db, 'job_applications'), {
          jobId,
          freelancerId: freelancer.uid,
          ...applicationDetails,
          timestamp: new Date(),
        });
        setApplicationDetails({
          name: '',
          email: '',
          phone: '',
          resume: '',
          coverLetter: '',
        });
        navigate('/jobs');
      } catch (error) {
        console.error('Error submitting application: ', error);
      }
    } else {
      console.error('No freelancer is logged in');
    }
  };

  return (
    <div className="flex justify-center items-center h-80vh px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="pb-6 px-4 pt-28 mb-22 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-4 w-96 text-center text-gray-800">Apply for Job</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={applicationDetails.name}
            onChange={handleChange}
            placeholder="Your Full Name"
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={applicationDetails.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={applicationDetails.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="resume" className="block text-gray-700 mb-2">Portfolio (Link)</label>
          <input
            type="url"
            id="resume"
            name="resume"
            value={applicationDetails.resume}
            onChange={handleChange}
            placeholder="Your portfolio link"
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="coverLetter" className="block text-gray-700 mb-2">Cover Letter</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={applicationDetails.coverLetter}
            onChange={handleChange}
            placeholder="Write a cover letter"
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-rose-700 text-white rounded shadow hover:bg-rose-600 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;