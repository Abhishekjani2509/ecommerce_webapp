import React, { useEffect } from "react";
import MetaData from "../layout/MetaData.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              {/* Add conditional check for user.avatar */}
              {user?.avatar?.url ? (
                <img src={user.avatar.url} alt={user.name} />
              ) : (
                <p>No avatar available</p>
              )}
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
