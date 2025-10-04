// src/pages/citizen/Profile.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    nationalId: "",
    dob: "",
    contact: "",
  });
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/profile", profile);
      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      setMessage("Error updating profile.");
    }
  };

  return (
    <div className="py-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                National ID
              </label>
              <input
                type="text"
                name="nationalId"
                value={profile.nationalId}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-600"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Contact Info
              </label>
              <input
                type="text"
                name="contact"
                value={profile.contact}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-600"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold mr-4"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 font-semibold"
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <p className="mb-4">
              <strong>Full Name:</strong> {profile.name}
            </p>
            <p className="mb-4">
              <strong>National ID:</strong> {profile.nationalId}
            </p>
            <p className="mb-4">
              <strong>Date of Birth:</strong> {profile.dob}
            </p>
            <p className="mb-4">
              <strong>Contact Info:</strong> {profile.contact}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold"
            >
              Edit Profile
            </button>
          </>
        )}
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;
