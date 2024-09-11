import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../components/Firebase/Firebase"; 
import { logOut } from "../components/Auth/Auth"; 
import { doc, getDoc } from "firebase/firestore";
import logo from "../assets/logo.png";

const NAVBAR_CLASSES = {
  container: "w-full px-4 sm:px-6 lg:px-8",
  flex: "flex justify-between items-center h-16",
  logo: "h-20 w-auto",
  link: "border-transparent text-zinc-500 dark:text-zinc-300 hover:border-zinc-300 hover:text-zinc-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium",
  button: "bg-rose-600 text-white hover:bg-rose-500 px-3 py-2 rounded-md text-sm font-medium",
  dropdown: "absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg py-1 z-20",
  dropdownLink: "block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900",
  loginButton: "bg-white text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm ml-4 font-bold",
};

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userType, setUserType] = useState(null);
  let timeoutId = null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserType = async () => {
      if (user) {
        const freelancerDocRef = doc(db, "freelancerUsers", user.uid);
        const companyDocRef = doc(db, "CompanyUsers", user.uid);
        const freelancerDoc = await getDoc(freelancerDocRef);
        const companyDoc = await getDoc(companyDocRef);

        if (freelancerDoc.exists()) {
          setUserType("freelancerUsers");
        } else if (companyDoc.exists()) {
          setUserType("company");
        }
      }
    };

    fetchUserType();
  }, [user]);

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowDropdown(false);
    }, 500);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setUserType(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const Logo = () => (
    <div className="flex items-center">
      <div className="w-52 h-auto -ml-9">
        <img src={logo} alt="Frealink logo" className={NAVBAR_CLASSES.logo} />
      </div>
    </div>
  );
  const NavLinks = () => (
    <div className="hidden sm:flex sm:space-x-8">
      <Link to="/" className={NAVBAR_CLASSES.link}>
        Home
      </Link>
      <Link to="/jobs" className={NAVBAR_CLASSES.link}>
        Jobs
      </Link>
      <Link to="/payment" className={NAVBAR_CLASSES.link}>
        Escrow
      </Link>
      <Link to="/our-team" className={NAVBAR_CLASSES.link}>
        Our Team
      </Link>
    </div>
  );

  const Dropdown = () => (
    <div
      className={NAVBAR_CLASSES.dropdown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="/signup-freelancerUsers" className={NAVBAR_CLASSES.dropdownLink}>
        Sign Up as Freelancer
      </Link>
      <Link to="/signup-company" className={NAVBAR_CLASSES.dropdownLink}>
        Sign Up as Employer
      </Link>
    </div>
  );

  const ProfileLink = () => {
    if (userType === "freelancerUsers") {
      return (
        <Link to="/profiledetails-freelancerUsers" className={NAVBAR_CLASSES.loginButton}>
          My Profile
        </Link>
      );
    } else if (userType === "company") {
      return (
        <Link to="/profiledetails-company" className={NAVBAR_CLASSES.loginButton}>
          My Profile
        </Link>
      );
    }
    return null;
  };

  const AddjobButton = () => {
    if (user && userType === "company") {
      return (
        <Link to="/add-job" className={`${NAVBAR_CLASSES.button} mx-2 my-2 px-4 ml-5 py-2`}>
          Add job
        </Link>
      );
    }
    return null;
  };

  return (
    <nav className="bg-transparent dark:bg-zinc-900/75 backdrop-blur border-b z-50 border-zinc-200 dark:border-zinc-700 w-full fixed">
      <div className={NAVBAR_CLASSES.container}>
        <div className={NAVBAR_CLASSES.flex}>
          <Logo />
          <NavLinks />
          <div className="flex items-center">
            {user && <ProfileLink />}
            <AddjobButton />
            {!user && (
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className={NAVBAR_CLASSES.button}>Sign Up</button>
                {showDropdown && <Dropdown />}
              </div>
            )}
            {user ? (
              <button onClick={handleLogout} className={NAVBAR_CLASSES.loginButton}>
                Logout
              </button>
            ) : (
              <Link to="/login" className={NAVBAR_CLASSES.loginButton}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;