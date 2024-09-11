import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/Firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import JobCard from '../Jobs/JobCard'; // Ensure you have a JobCard component

const JobsApplied = () => {
  const [user] = useAuthState(auth);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (user) {
        // Fetch freelancer user data
        const freelancerDoc = doc(db, "freelancerUsers", user.uid);
        const freelancerData = await getDoc(freelancerDoc);

        if (freelancerData.exists()) {
          const freelancerInfo = freelancerData.data();

          // Check if there are any applied jobs
          if (freelancerInfo.appliedJobs && freelancerInfo.appliedJobs.length > 0) {
            // Fetch job details for the applied jobs
            const jobsCollection = collection(db, "jobs");
            const jobsQuery = query(
              jobsCollection,
              where("__name__", "in", freelancerInfo.appliedJobs)
            );

            const jobsSnapshot = await getDocs(jobsQuery);
            const jobsList = jobsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setJobs(jobsList);
          }
        }
      }
    };

    fetchJobs();
  }, [user]);

  const showJobDetails = async (jobId) => {
    const docRef = doc(db, 'jobs', jobId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setSelectedJob({ id: jobId, ...docSnap.data() });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl font-semibold">
            Please log in to view the jobs you have applied for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">
        <span className="text-rose-800">Jobs</span> Applied
      </h2>

      {selectedJob ? (
        <div className="m-4 border border-gray-300 flex flex-col items-center rounded-lg shadow-lg p-6">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800 text-center">{selectedJob.title}</h2>
          <p className="text-gray-700 mb-4 text-center text-xl font-medium">{selectedJob.description}</p>
          <p className="text-gray-700 text-xl">
            <strong>Location:</strong> {selectedJob.location}
          </p>
          <p className="text-gray-700 text-xl">
            <strong>Salary:</strong> {formatCurrency(selectedJob.salary)}
          </p>
          <p className="text-gray-700 text-xl">
            <strong>Job Type:</strong> {selectedJob.jobType}
          </p>
          <button
            className="px-4 py-2 bg-rose-800 text-white rounded-full"
            onClick={() => setSelectedJob(null)}
          >
            Back to Applied Jobs
          </button>
        </div>
      ) : (
        <>
          {jobs.length > 0 ? (
            <div className="flex flex-wrap gap-6 justify-center">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  showJobDetails={showJobDetails}
                  showApplyButton={false} // Set to false since these are jobs already applied
                  clickable={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-lg text-gray-500">
              You haven't applied for any jobs yet.
            </div>
          )}
        </>
      )}
    </div>
  );
};

const formatCurrency = (amount) => {
  if (!amount) return "Not specified";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export default JobsApplied;
