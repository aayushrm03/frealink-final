import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Badge from '@mui/material/Badge';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import user1 from "../../assets/user.png";
const Profilefreelancer = () => {
const [user] = useAuthState(auth);
const navigate = useNavigate();
const [profileImage, setProfileImage] = useState("");
const [profileDetails, setProfileDetails] = useState({
    name: "",
    email: "",
    address: "",
    postalCode: "",
    sex: "none",
    profileImage: user1,
    skills: [],
    experience: [],
    projects: [],
  });
  const [skillInput, setSkillInput] = useState("");
  const [experienceInput, setExperienceInput] = useState({ jobTitle: "", company: "", duration: "" });
  const [projectInput, setProjectInput] = useState({ projectName: "", description: "", technology: "", link: "" });
  useEffect(() => {
    if (user) {
      console.log(user); // This will log the entire user object to inspect the fields
      setProfileDetails((prevDetails) => ({
        ...prevDetails,
        name: user.displayName || "",
        email: user.email || "",
      }));
      setProfileImage(user.photoURL || "user1");
    }
  }, [user]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSexChange = (e) => {
    setProfileDetails((prevDetails) => ({ ...prevDetails, sex: e.target.value }));
  };

  const handleSkillAdd = () => {
    if (skillInput.trim()) {
      setProfileDetails((prevDetails) => ({
        ...prevDetails,
        skills: [...prevDetails.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };
  const handleExperienceAdd = () => {
    if (experienceInput.jobTitle && experienceInput.company && experienceInput.duration) {
      setProfileDetails((prevDetails) => ({
        ...prevDetails,
        experience: [...prevDetails.experience, experienceInput],
      }));
      setExperienceInput({ jobTitle: "", company: "", duration: "" });
    }
  };

  const handleProjectAdd = () => {
    if (projectInput.projectName && projectInput.description && projectInput.technology && projectInput.link) {
      setProfileDetails((prevDetails) => ({
        ...prevDetails,
        projects: [...prevDetails.projects, projectInput],
      }));
      setProjectInput({ projectName: "", description: "", technology: "", link: "" });
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setProfileImage(downloadURL);
    }
  };

  const handleImageClick = () => {
    document.getElementById("profile-image-upload").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    try {
      console.log("Saving profile:", profileDetails);
      const docRef = doc(db, "freelancerUsers", user.uid);
      const docSnap = await getDoc(docRef);

      const updatedDetails = { ...profileDetails, photoURL: profileImage };

      if (!docSnap.exists()) {
        await setDoc(docRef, updatedDetails);
        console.log("Profile created successfully");
      } else {
        await setDoc(docRef, updatedDetails, { merge: true });
        console.log("Profile updated successfully");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving profile:", error);
      // You can display an error message to the user here
    }
  };

  return (
    <div className="profile-page pt-32 pb-12 sm:px-6 lg:px-8">
      <div className="flex">
        <div className="w-1/4 bg-white rounded-lg shadow-lg p-6 max-h-full mr-5 text-center">
          <Badge
            badgeContent={<i className="fa-solid fa-pen cursor-pointer" onClick={handleImageClick}></i>}
            color="primary"
          >
            <img src={profileImage} alt="Profile" className="max-h-36 max-w-36 rounded-full" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="profile-image-upload"
            />
          </Badge>
          <h2 className="text-indigo-950 font-semibold text-3xl mt-2">{profileDetails.name}</h2>
          <p className="text-slate-500">{profileDetails.email}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 w-3/4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Enter Profile Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Username :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={profileDetails.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Your Username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email :
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={profileDetails.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Your email address"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address :
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={profileDetails.address}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Your Address"
              />
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                Postal Code :
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                required
                value={profileDetails.postalCode}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Your Postal Code"
              />
            </div>

            <div className="flex justify-between">
              <div className="grow">
                <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sex : </label>
                <Select
                  id="sex"
                  name="sex"
                  required
                  value={profileDetails.sex}
                  onChange={handleSexChange}
                  className="mt-1 block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
                >
                  <MenuItem value="none">Choose</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </div>
                </div>

              <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills:</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter a skill"
                />
                <button type="button" onClick={handleSkillAdd} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {profileDetails.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>

            {/* Work Experience Section */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Work Experience:</label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={experienceInput.jobTitle}
                  onChange={(e) => setExperienceInput({ ...experienceInput, jobTitle: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Job Title"
                />
                <input
                  type="text"
                  value={experienceInput.company}
                  onChange={(e) => setExperienceInput({ ...experienceInput, company: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Company Name"
                />
                <input
                  type="text"
                  value={experienceInput.duration}
                  onChange={(e) => setExperienceInput({ ...experienceInput, duration: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Duration (e.g. 2 years)"
                />
                <button type="button" onClick={handleExperienceAdd} className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2">
                  Add Experience
                </button>
              </div>
              <div className="mt-2">
                {profileDetails.experience.map((exp, index) => (
                  <div key={index} className="mb-2">
                    <strong>{exp.jobTitle}</strong> at <em>{exp.company}</em> for {exp.duration}
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div>
              <label htmlFor="projects" className="block text-sm font-medium text-gray-700">Past Projects:</label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={projectInput.projectName}
                  onChange={(e) => setProjectInput({ ...projectInput, projectName: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Project Name"
                />
                <input
                  type="text"
                  value={projectInput.description}
                  onChange={(e) => setProjectInput({ ...projectInput, description: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Project Description"
                />
                <input
                  type="text"
                  value={projectInput.technology}
                  onChange={(e) => setProjectInput({ ...projectInput, technology: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Technologies Used"
                />
                <input
                  type="url"
                  value={projectInput.link}
                  onChange={(e) => setProjectInput({ ...projectInput, link: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Link to Project"
                />
                <button type="button" onClick={handleProjectAdd} className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2">
                  Add Project
                </button>
              </div>
              <div className="mt-2">
                {profileDetails.projects.map((project, index) => (
                  <div key={index} className="mb-2">
                    <strong>{project.projectName}</strong>: {project.description} <br />
                    <em>Technologies Used: {project.technology}</em> <br />
                    <a href={project.link} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                      {project.link}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="text-white bg-gradient-to-r  from-sky-300 to-blue-600  hover:scale-105 font-medium rounded-full text-sm px-5 py-2.5 mt-6"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profilefreelancer;