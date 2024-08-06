
import React, { useContext, useEffect, useState } from 'react'
import { arrayUnion, collection, doc, getDocs, orderBy, query, runTransaction, where } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MyContext } from './ContextProvider';
// import { Timestamp, addDoc, arrayUnion, collection, doc, getDocs, query, runTransaction, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import * as fa from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
/** */




export default function YourPosts() {

    const [posts, setPosts] = useState([])
    const PostsRef = collection(db, "Posts")
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const token = localStorage.getItem('token');

    const headers = {
        'token': token,
    };
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

    useEffect(() => {
        if (!UserDBData) {

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
        const fetchCollection = async () => {
            try {
                // const querywithTime = query(PostsRef,where('senderId', '==', userObj.uid), orderBy('createdAt', 'desc'))
                // const querySnapshot = await getDocs(querywithTime);
                // const fetchedItems = querySnapshot.docs.map((doc) => ({
                //     id: doc.id,
                //     ...doc.data(),
                // }));
                const fetchedItems = await axios.get(`https://vet-ro-server.vercel.app/userPost`, { headers: headers }).catch(err => {
                    console.log(err);
                })
                if (fetchedItems) {
                    sessionStorage.setItem('userYourPostsData', JSON.stringify(fetchedItems.data));
                    setPosts(fetchedItems.data);
                    console.log(fetchedItems.data);
                }

            } catch (error) {
                console.error('Error fetching collection:', error);
            }
        }
        const storedUserPostsData = sessionStorage.getItem('userYourPostsData');
        if (storedUserPostsData) {
            console.log("no Fetch");
            // If user data is already stored, set it in the state
            setPosts(JSON.parse(storedUserPostsData));
        } else {
            console.log("Fetch");

            fetchCollection();
        }
    }, [])



    return (
        <>
            <div className='text-black justify-content-center align-items-center MainSection text-center  mt-5'>

                <div className='container'>

                    <h2 className='postss'> <b> your Posts</b> </h2>
                    {posts?.map((post) => (

                        <div key={post._id} className="card1 bg-light my-4 text-start gedf-card py-2 px-3">
                            <div className="card-header cardbag">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex pointer justify-content-between align-items-center">
                                        <div className="me-2">
                                            <img className="rounded-circle postPfp" width={45} src={post.createdBy.userPFP} />
                                        </div>
                                        <div className="ms-2">
                                            <div className="h5 m-0 namecolor">{post.createdBy.name}</div>
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
                                <hr />
                                <p className='text-center m-0'>comments</p>
                                <div id='comments' className='d-flex flex-column align-items-center commentScroll'>
                                    {post.comments?.map((comment) => (
                                        <div key={comment._id} className='w-100 my-1 row'>
                                            <div className="col-2 col-md-1 gx-3 p-0">
                                                <img src={comment.createdBy?.userPFP} className='PFP' alt="" />
                                            </div>
                                            <div className="col-10 col-md-11 gx-3 d-flex align-items-center">
                                                <div className=' comment'>
                                                    <h5>{comment.content}</h5>

                                                    <div className="text-muted text-end" style={{ fontSize: '12px', opacity: '75%' }}>
                                                        <i className="fa fa-clock-o pe-1" />{getTimeSince(comment.createdAt.toString())}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                    ))}




                </div>

            </div>


        </>
    )
}
