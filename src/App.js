import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FrontPage from './components/Frontpage/Frontpage';
import { AuthProvider } from './components/Auth/Auth';
import SignUpCompany from './components/Pages/SignUpCompany';
import SignUpFreelancer from './components/Pages/SignUpFreelancer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileDetailsCompany from './components/Pages/ProfileDetailsCompany';
import ProfileCompany from './components/Pages/ProfileCompany';
import ProfileFreelancer from './components/Pages/ProfileFreelancer';
import ProfileDetailsFreelancer from './components/Pages/ProfileDetailsFreelancer';
import Login from './components/Pages/Login';
import JobForm from './components/Jobs/JobForm';
import JobList from './components/Jobs/JobLists';
import JobsApplied from './components/Jobs/JobsApplied';
import JobApplicationForm from './components/Jobs/JobApplicationForm';
import Payment from './components/Payment/Payment';
import PayNow from './components/Payment/PayNow';
// import './App.css'; // Ensure this includes your theme styles
//import darkModeIcon from './assets/ICON.jpeg'; // Adjust path if needed
import OurTeam from './components/Team/Our Team';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/signup-freelancerUsers" element={<SignUpFreelancer />} />
            <Route path="/signup-company" element={<SignUpCompany />} />
            <Route path="/profiledetails-company" element={<ProfileDetailsCompany />} />
            <Route path="/profile-company" element={<ProfileCompany />} />
            <Route path="/profiledetails-freelancerUsers" element={<ProfileDetailsFreelancer />} />
            <Route path="/profile-freelancerusers" element={<ProfileFreelancer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-job" element={<JobForm />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/jobs-applied/:freelancerUsersId" element={<JobsApplied />} />
            <Route path="/apply-job/:jobId" element={<JobApplicationForm />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/paynow" element={<PayNow />} />
            <Route path="/our-team" element={<OurTeam />} />
          </Routes>
        
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
