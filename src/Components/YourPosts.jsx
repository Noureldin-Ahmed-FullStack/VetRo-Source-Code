
import React, { useContext, useEffect, useState } from 'react'
import { arrayUnion, collection, doc, getDocs, orderBy, query, runTransaction, where } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MyContext } from './ContextProvider';
// import { Timestamp, addDoc, arrayUnion, collection, doc, getDocs, query, runTransaction, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import * as fa from '@fortawesome/free-solid-svg-icons'
/** */




export default function YourPosts() {

    const [posts, setPosts] = useState([])
    const PostsRef = collection(db, "Posts")
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
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
        const fetchCollection = async () => {
            try {
                const querywithTime = query(PostsRef,where('senderId', '==', userObj.uid), orderBy('createdAt', 'desc'))
                const querySnapshot = await getDocs(querywithTime);
                const fetchedItems = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                sessionStorage.setItem('userPostsData', JSON.stringify(fetchedItems));
                setPosts(fetchedItems);
                console.log(fetchedItems);
            } catch (error) {
                console.error('Error fetching collection:', error);
            }
        }
        const storedUserPostsData = sessionStorage.getItem('userPostsData');
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

                    <h2 className='postss'> <b> Regular Posts</b> </h2>
                    {posts.map((post) => (
                        <div key={post.id} className="card1 bg-light my-4 text-start gedf-card py-2 px-3">
                            <div className="card-header cardbag">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div  className="d-flex pointer justify-content-between align-items-center">
                                        <div className="me-2">
                                            <img className="rounded-circle postPfp" width={45} src={post.SenderPFP} />
                                        </div>
                                        <div className="ms-2">
                                            <div className="h5 m-0 namecolor">{post.senderName}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='starRatepp7 justify-content-between align-items-center'>
                                            <div className='' >
                                                <FontAwesomeIcon className='HorizontalDots' icon={fa.faEllipsis} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <p className="card-text h5">
                                    {post.text}
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
