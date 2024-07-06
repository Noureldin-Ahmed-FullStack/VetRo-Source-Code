import React, { useContext, useEffect, useState } from 'react'
import { arrayUnion, collection, doc, getDocs, orderBy, query, runTransaction } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MyContext } from './ContextProvider';
import * as fa from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import axios from 'axios';
import MakeAPost from './MakeAPost';
/** */




export default function UrgentPost() {

  const [UrgentPosts, setUrgentPosts] = useState([])
  const { userObj, setUserObj } = useContext(MyContext);
  const { UserDBData, setUserDBData } = useContext(MyContext);
  const UrgentPostsRef = collection(db, "UrgentPosts")
  const [posts, setPosts] = useState([])

  const getTimeSince = (time) => {
    // Create a new Date object with the desired date and time
    var customDate = new Date(time);

    // Get the current date
    var currentDate = new Date();

    // Get the time in milliseconds since January 1, 1970 for both dates
    var customTime = customDate.getTime();
    var currentTime = currentDate.getTime();

    // Calculate the time difference in milliseconds
    var timeDifference = currentTime - customTime;

    const seconds = Math.floor((timeDifference) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    }
    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";


  }


  let navigate = useNavigate()

  const goToProfile = (Docid) => {
    if (Docid == userObj.uid) {
      navigate('/SignIn');      
    }else{
      navigate('/profile', { state: { id: Docid } });
    }
  }
  useEffect(() => {
    const fetchCollection = async () => {


      const fetchedItems = await axios.get('https://vetro-server.onrender.com/urgentPost').catch(err => {
        console.log(err);
      })
      for (let i = fetchedItems.data.length - 1; i >= 0; i--) {
        if (fetchedItems.data[i].createdBy === null) {
          fetchedItems.data.splice(i, 1); // Remove item at index i
        }
      }
      console.log(fetchedItems);
      sessionStorage.setItem('urgentPostsData', JSON.stringify(fetchedItems.data));
      setPosts(fetchedItems.data);
      console.log(fetchedItems.data);
    }
    const storedUserPostsData = sessionStorage.getItem('urgentPostsData');
    if (storedUserPostsData) {
      console.log("no Fetch");
      // If user data is already stored, set it in the state
      setPosts(JSON.parse(storedUserPostsData));
    } else {
      console.log("Fetch");

      fetchCollection();
    }
  }, [])

  const chatFunc = (userData) => {
    console.log(userData);

    if (!userObj) {
      toast.error(`You need to Login First!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }
    let RID
    if (userData?.isDoctor) {
      RID = userObj?.uid + " " + userData?.uid;
    } else {
      RID = userData?.uid + " " + userObj?.uid;
    }
    console.log(RID);
    goToRoom(RID, userData);
  };
  const goToRoom = async (RID, userData) => {

    const userChatsRef = collection(db, "UserChats");
    // updateDoc(userChatDoc, {
    //   ChatRooms: arrayUnion({
    //     ChatRoomID: RID,
    //     OtherPersonName: userData?.name,
    //     otherPersonPic: userData?.userPFP
    //   })
    // })
    try {
      await runTransaction(db, async (transaction) => {
        const userChatDoc = await doc(userChatsRef, userObj.uid);
        const OtherUserChatDoc = await doc(userChatsRef, userData?._id);
        const userChatDocSnap = await transaction.get(userChatDoc);
        const OtherUserChatDocSnap = await transaction.get(OtherUserChatDoc);

        if (userChatDocSnap.exists()) {
          transaction.update(userChatDoc, {
            ChatRooms: arrayUnion({
              ChatRoomID: RID,
              OtherPersonName: userData?.name,
              otherPersonPic: userData?.userPFP
            })
          });
        } else {
          transaction.set(userChatDoc, {
            ChatRooms: [{
              ChatRoomID: RID,
              OtherPersonName: userData?.name,
              otherPersonPic: userData?.userPFP
            }]
          });
        }

        if (OtherUserChatDocSnap.exists()) {
          transaction.update(OtherUserChatDoc, {
            ChatRooms: arrayUnion({
              ChatRoomID: RID,
              OtherPersonName: UserDBData.name,
              otherPersonPic: UserDBData.userPFP
            })
          });
        } else {
          transaction.set(OtherUserChatDoc, {
            ChatRooms: [{
              ChatRoomID: RID,
              OtherPersonName: UserDBData.name,
              otherPersonPic: UserDBData.userPFP
            }]
          });
        }
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    navigate("/room", { state: { RID: RID, reciverPFP: userData?.userPFP, reciverName: userData?.name } });
  };
  return (
    <>
      <MakeAPost />
      <div className='text-black justify-content-center align-items-center MainSection text-center container px-5 mt-5'>

        <div className='container'>
          <h2 className='postss'><b> Urgent Posts</b> </h2>


          {posts.map((post) => (
            <div key={post._id} className="card1 bg-light my-4 text-start gedf-card py-2 px-3">
              <div className="card-header cardbag">
                <div className="d-flex justify-content-between align-items-center">
                  <div onClick={() => goToProfile(post.createdBy._id)} className="d-flex pointer justify-content-between align-items-center">
                    <div className="me-2">
                      <img className="rounded-circle postPfp" width={45} src={post.createdBy.userPFP} />
                    </div>
                    <div className="ms-2">
                      <div className="h5 m-0 namecolor">{post.createdBy.name}</div>
                    </div>
                  </div>
                  <div>
                    <div className='starRatepp7 justify-content-between align-items-center'>
                      <div className='' onClick={() => chatFunc(post.createdBy)}>
                        <FontAwesomeIcon className='mess' icon={fa.faCommentDots} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <h3>{post.title}</h3>
                <hr className='m-0' />
                <p className="card-text h5">
                  {post.content}
                </p>
                <div className="text-muted  mb-4 mt-4" style={{ fontSize: '12px' }}>
                  <i className="fa fa-clock-o pe-1" />{getTimeSince(post.createdAt.toString())}
                </div>


              </div>

            </div>

          ))}




        </div>


      </div>


    </>
  )
}
