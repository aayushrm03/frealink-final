import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/Firebase';
import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import JobCard from '../Jobs/JobCard';
import JobApplicationForm from '../Jobs/JobApplicationForm';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [applyingJobId, setApplyingJobId] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobCollection = collection(db, 'jobs');
      const jobSnapshot = await getDocs(jobCollection);
      const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobList);
    };

    fetchJobs();
  }, []);

  const applyForJob = (jobId) => {
    setApplyingJobId(jobId);
  };

  const confirmApplication = async (jobId, applicationDetails) => {
    try {
      await addDoc(collection(db, 'job_applications'), {
        jobId,
        ...applicationDetails
      });
      console.log(`Applicant ${applicationDetails.name} applied for job ${jobId}`);
      setApplyingJobId(null);
    } catch (error) {
      console.error('Error applying for job: ', error);
    }
  };

  const showJobDetails = async (jobId) => {
    const docRef = doc(db, 'jobs', jobId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setSelectedJob({ id: jobId, ...docSnap.data() });
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col min-h-screen">
    <div className=" pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-6xl font-bold text-center mb-6"><span className='text-indigo-900'>Current</span> Jobs</h1>
      {selectedJob ? (
        <div className="p-6 border border-gray-300 rounded-lg mb-6 shadow-lg bg-white">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800 text-center">{selectedJob.title}</h2>
          
          <p className="text-gray-700 mb-4 text-center text-xl font-medium">{selectedJob.description}</p>
          <div className="mb-4">
            
            <p className="text-gray-700 text-xl"><strong>Job Type:</strong> {selectedJob.jobType}</p>
            <p className="text-gray-700 text-xl"><strong>Location:</strong> {selectedJob.location}</p>
            <p className="text-gray-700 text-xl"><strong>Salary:</strong> {selectedJob.salary}</p>
            <p className="text-gray-700 text-xl"><strong>Requirements:</strong> {selectedJob.requirements}</p>
          </div>
          
          <button 
            onClick={() => setSelectedJob(null)}
            className="px-4 py-2 text-white bg-gradient-to-r from-rose-800 to-fuchsia-800 hover:scale-105 font-medium rounded-full"
          >
            Back to Jobs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job} 
              applyForJob={applyForJob} 
              showJobDetails={showJobDetails} 
            />
          ))}
        </div>
      )}
      {applyingJobId && <JobApplicationForm jobId={applyingJobId} confirmApplication={confirmApplication} />}
    </div>
    </div>
  );
};

export default JobList;
