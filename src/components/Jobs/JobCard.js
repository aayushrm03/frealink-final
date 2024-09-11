import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job, showJobDetails, showApplyButton = true, clickable = true }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFreelancerUser, setIsFreelancerUser] = useState(false);
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthenticationAndRole = async () => {
      const user = auth.currentUser;
      if (user) {
        setIsAuthenticated(true);
        try {
          const userDocRef = doc(db, 'freelancerUsers', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setIsFreelancerUser(true);
          } else {
            setIsFreelancerUser(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setIsFreelancerUser(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsFreelancerUser(false);
      }
    };
    checkAuthenticationAndRole();
  }, [auth, db]);

  const formatCurrency = (amount) => {
    if (!amount) return 'Not specified';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const handleCardClick = () => {
    if (clickable) {
      showJobDetails(job.id);
    }
  };

  const handleApplyClick = (e) => {
    e.stopPropagation();
    navigate(`/apply-job/${job.id}`);
  };

  return (
    <div
      className={`p-4 border rounded-lg mb-6 flex flex-col shadow-md bg-gradient-to-zinc-800 from-indigo-50 to bg-purple-50 hover:scale-105 hover:shadow-lg hover:shadow-zinc-400 transition-all duration-1000 ease-in-out ${
        clickable ? 'cursor-pointer' : ''
      }`}
      onClick={handleCardClick}
      style={{ width: '380px', height: '250px' }}
    >
      <div className="mt-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {job.title}
          </h3>
          <p className="text-gray-600">{job.company}</p>
          <p className="text-gray-600 mb-2">
            <span className="block">
              <strong>Location:</strong> {job.location}
            </span>
            <span className="block">
              <strong>Requirements:</strong> {job.requirements}
            </span>
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Job Type:</strong> {job.jobType}
          </p>
        </div>

        {showApplyButton && isAuthenticated && isFreelancerUser && (
          <button
            onClick={handleApplyClick}
            className="w-full mt-auto px-3 py-1 text-white bg-gradient-to-r from-sky-300 to-blue-600 font-medium rounded-full hover:scale-105 transition-all duration-500 ease-in-out"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
