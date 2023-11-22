
import React, { useContext } from 'react'
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'
import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { app , auth } from '../Firebase/firebase';
import { MyContext } from './ContextProvider';
import Avatar from './Avatar';

const Profile = ({ token }) => {
    const [user, setUser] = useState({});
    const [isUserUpdated, setisUserUpdated] = useState(false);
  
    useEffect(() => {
      const getProfileData = async () => {
        try {
          const { data } = await axios.get(`http://localhost:1337/api/users/me`, {
            headers: {
              Authorization: `bearer ${token}`,
            },
          });
          setUser(data);
          setisUserUpdated(false);
        } catch (error) {
          console.log({ error });
        }
      };
      getProfileData();
    }, [token, isUserUpdated]);
  


    return (
        <div className="profile">
        <div className="avatar">
          <div className="avatar-wrapper">
            {user.avatarUrl ? (
              <img
                src={`http://localhost:1337${user.avatarUrl}`}
                alt={`${user.username} avatar`}
              />
            ) : (
              <IoPersonCircleOutline />
            )}
            <Avatar
              token={token}
              userId={user.id}
              username={user.username}
              avatarUrl={user.avatarUrl}
              setisUserUpdated={setisUserUpdated}
            />
          </div>
        </div>
        <div className="body">
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>About: {user.about}</p>
          <p>Times: {user.myAvaliableTime}</p>
          <p>
            Account created at: {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <button style='font-size:24px'> <i class='far fa-edit'></i></button>
        </div>

      </div>

    )
}

