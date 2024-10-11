import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="flex items-center mb-6 md:mb-0">
          <img src= {logo} alt="Frealink Logo" className="h-25 w-44 mr-3" />
        
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <div>About Us
            <ul>
              <li>
                <a href="#" className="text-slate-400 font-medium hover:text-white">Freelance</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 font-medium hover:text-white">Jobs</a>
              </li>
            </ul>
          </div>
          <div>Follow Us
            <ul>
              <li>
                <a href="#" className="text-slate-400 font-medium hover:text-white">LinkedIn</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 font-medium hover:text-white">Github</a>
              </li>
            </ul>
          </div>
          <div>Legal
            <ul>
              <li>
                <a href="#" className="text-slate-400 font-medium hover:text-white">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 font-medium hover:text-white">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center py-4 border-t border-gray-700 mt-6">
        <p className="text-sm">© 2024 Frealink™.</p>
      </div>
    </footer>
  );
};

export default Footer;

