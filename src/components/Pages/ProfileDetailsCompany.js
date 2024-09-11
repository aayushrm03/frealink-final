import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom"; 
import { auth, db } from "../Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import user1 from "../../assets/user.png";

const ProfileDetailsCompany = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate(); 
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    postelcode: "",
    profileImage: user1,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const docRef = doc(db, "CompanyUsers", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const profileData = docSnap.data();
          setProfile({
            ...profileData,
            profileImage: profileData.profileImage || user.photoURL || user1,
          });
        } else {
          setProfile((prevProfile) => ({
            ...prevProfile,
            name: user.displayName,
            email: user.email,
          }));
        }
      }
    };

    fetchProfile();
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl font-semibold">Please log in to view your profile details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-details pt-20 h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">
        <span className="text-indigo-950">Welcome! </span>to your profile
      </h2>
      <div className="flex">
        <div className="bg-white shadow-lg rounded-full mx-5 p-6 text-center w-1/4">
          <img
            src={profile.profileImage}
            alt="Profile"
            className="max-h-36 max-w-36 mx-auto mb-2 rounded-full object-cover"
          />
          <h2 className="text-rose-800 font-semibold text-3xl mt-2">{profile.name}</h2>
          <p className="text-slate-500">{profile.email}</p>
        </div>

        <div className="grow p-6 bg-white shadow-lg rounded-lg mr-5">
          <div className="text-lg">
            <p className="mb-4">
              <strong className="font-semibold">Company Name: </strong>
              {profile.name}
            </p>
            <p className="mb-4">
              <strong className="font-semibold">Email: </strong>
              {profile.email}
            </p>
            <p className="mb-4">
              <strong className="font-semibold">Address: </strong>
              {profile.address}
            </p>
            <p className="mb-4">
              <strong className="font-semibold">Postal Code: </strong>
              {profile.postelcode}
            </p>
            
          </div>
          <div className="text-center flex justify-center space-x-4">
            <button
              onClick={() => navigate("/profile-Company")}
              className="text-white bg-gradient-to-r from-sky-300 to-blue-600  hover:scale-105 font-medium rounded-full text-sm px-5 py-2.5 mt-6"
            >
              Edit Profile
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsCompany;