import React from "react";
import { signInWithGoogle, logOut } from "../Auth/Auth"; 
import { db } from "../Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        const freelancerDocRef = doc(db, "freelancerUsers", user.uid);
        const CompanyDocRef = doc(db, "CompanyUsers", user.uid);

        const freelancerDoc = await getDoc(freelancerDocRef);
        const CompanyDoc = await getDoc(CompanyDocRef);

        if (freelancerDoc.exists()) {
          toast.success("Login successful!");
          navigate("/");
        } else if (CompanyDoc.exists()) {
          toast.success("Login successful!");
          navigate("/");
        } else {
          toast.error("You need to sign up first.");
          await logOut(); 
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page pt-44 flex items-center justify-center py-40">
      <div className="bg-gray-50 p-10 rounded-xl shadow-2xl text-center w-11/12 max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Login to your Profile</h2>
        <button
          onClick={handleLogin}
          className="bg-rose-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-rose-700 transition duration-200 transform hover:scale-105"
        >
          Login with Google
        </button>
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup-Freelancer" className="text-rose-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;