// export default ProfileUpdate;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import spinner from "../assets/spinner2.gif";
import { Button, Container } from "react-bootstrap";
import Background from "../components/Home/Background";
import api from "../components/Task/Services";

const ProfileUpdate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState({
    // name: '',
    bio: "",
    mobile: "",
    email: "",
    accountNo: "",
    ifscCode: "",
    GPay: "",
    // aadhar: '',
    accountHolderName: "",
  });
  const [isDetailsUpdatedOnServer, setIsDetailsUpdatedOnServer] =
    useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [maxUpdateLimit] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  // for navigate user
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
const apiUrl = process.env.REACT_APP_API_URL;
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await api.get('users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data); // check the response data
      setProfileData(response.data);
      setUpdateCount(response.data.updateCount);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  fetchData();
}, [ token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if(profileData.name === "" || profileData.email === "" || profileData.phone === ""){
      alert("Please enter all the details");
      setIsSubmitting(false);
      return;
    }
    if (isDetailsUpdatedOnServer) {
      alert("You have reached your update limit. Cannot update again.");
      setIsSubmitting(false);
      return;
    }

    if (updateCount >= maxUpdateLimit) {
      alert("You have reached your update limit. Cannot update again.");
      setIsSubmitting(false);
      return;
    }
    try {
      // Make API call to update profile using profileData state
      const response = await api.post(
        'users/profileUpdate',
        profileData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setErrorMessage("");
      console.log(response.data.message);
      setIsSubmitting(false);
      alert(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "Error updating profile");
      } else {
        setErrorMessage("Error updating profile");
      }
      setIsSubmitting(false);
    }
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  if (!isAuthenticated) {
    return <p>Please log in to update your profile</p>;
  }

  if (isLoading) {
    return (
      <h6
        className="text-center"
        style={{
          marginTop: "-70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <img
          src={spinner}
          alt="spinner"
          height="100px"
          width="100px"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </h6>
    );
  }
  let remainingUpdate;
  if (updateCount > maxUpdateLimit) {
    remainingUpdate = 0;
} else {
    remainingUpdate = maxUpdateLimit - updateCount;
}
  return (
    <div  >
      <Background/>
      <h6 className="text-start text-info fw-bold p-3">
        {" "}
        Hello, {profileData.name}
      </h6>
      <h6 className="text-center text-amber-200 mt-1 underline"> Update Your Profile</h6>
      <div className="updateRemainig">
        <h6 className="text-end text-danger m-2 p-1 " style={{ zIndex: "1" }}>
          *You have {remainingUpdate} Attempts Remaining to update your Profile
        </h6>
      </div>
      <Container>
        <div className="form_container form_containers">
          <div className="form_data profile_update">
            <form onSubmit={handleSubmit}>
              <div className="form_input">
                <label htmlFor="bio">Biography:</label>
                <input
                  type="text"
                  id="bio"
                  name="bio"
                  value={profileData.bio || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form_input">
                <label htmlFor="mobile">Mobile:</label>
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  value={profileData.mobile || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form_input">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={profileData.email || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form_input">
                <label htmlFor="accountHolderName">Account Holder Name:</label>
                <input
                  type="text"
                  id="accountHolderName"
                  name="accountHolderName"
                  value={profileData.accountHolderName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form_input">
                <label htmlFor="accountNo">Account No:</label>
                <input
                  type="text"
                  id="accountNo"
                  name="accountNo"
                  value={profileData.accountNo || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form_input">
                <label htmlFor="ifscCode">IFSC Code:</label>
                <input
                  type="text"
                  id="ifscCode"
                  name="ifscCode"
                  value={profileData.ifscCode || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form_input">
                <label htmlFor="GPay">Google Pay:</label>
                <input
                  type="text"
                  id="GPay"
                  name="GPay"
                  value={profileData.GPay || ""}
                  onChange={handleInputChange}
                />
              </div>
              {/* Add other input fields as needed */}

              {errorMessage && <p className="text-danger p-1">{errorMessage}</p>}

              <Button
                type="submit"
                className="updateButton p-1 m-1 w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </Button>

              <Button
                className="updateButton p-1 m-1 w-100"
                onClick={handleProfile}
              >
                Profile
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfileUpdate;
