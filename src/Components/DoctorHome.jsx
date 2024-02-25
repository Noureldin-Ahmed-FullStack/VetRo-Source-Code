import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function DoctorHome() {
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const [posts, setPosts] = useState([])
    const { currentDevice, setCurrentDevice } = useContext(MyContext);
    const PostsRef = collection(db, "Posts")
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
        navigate('/profile', { state: { id: Docid } });
    }
    useEffect(() => {
        const fetchCollection = async () => {
            // const queryMessages = query(PostsRef)
            try {
                const querywithTime = query(PostsRef, orderBy('createdAt', 'desc'))
                // const querySnapshot = await getDocs(PostsRef);
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
        <div className='d-flex text-black justify-content-center align-items-center MainSection text-center'>

            <div className='w-100 '>
                <h1 className='bigga my-2 mb-3'>Welcome to VetRo</h1>
                <h2>Doctor</h2>
                <h2>current Device: {currentDevice}</h2>
                {UserDBData ? (
                    <>
                        <h2>{UserDBData.isDoctor.toString()}</h2>
                        <h2 >{UserDBData.email.toString()}</h2>
                    </>
                ) : (
                    <h2>null</h2>
                )
                }

                <div className='py-3 container'>
                    {posts.map((post) => (
                        // <div className='bg-light card text-black' key={post.id}>
                        //     <p>ID: {post.senderId}</p>
                        //     <p>ID: {post.id}</p>
                        //     <img className='circle-round' src={post.SenderPFP} alt="" />
                        //     <p>Name: {post.senderName}</p>
                        //     <p>{post.text}</p>
                        //     <p>{post.createdAt.toString()}</p>
                        // </div>
                        <div key={post.id} className="card my-4 text-start gedf-card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div onClick={() => goToProfile(post.senderId)} className="d-flex pointer justify-content-between align-items-center">
                                        <div className="me-2">
                                            <img className="rounded-circle" width={45} src={post.SenderPFP} />
                                        </div>
                                        <div className="ms-2">
                                            <div className="h5 m-0 lineOnHover">{post.senderName}</div>
                                            <div className="h7 text-muted lineOnHover">{post.senderName}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="dropdown">
                                            <button className="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fa fa-ellipsis-h" />
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1" x-placement="bottom-end" style={{ position: 'absolute', willChange: 'transform', top: 0, left: 0, transform: 'translate3d(55px, 38px, 0px)' }}>
                                                <div className="h6 dropdown-header">Configuration</div>
                                                <a className="dropdown-item" href="#">Save</a>
                                                <a className="dropdown-item" href="#">Hide</a>
                                                <a className="dropdown-item" href="#">Report</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                {/* <div onClick={getTimeSince(post.createdAt.toString())} className="text-muted h7 mb-2"> <i className="fa fa-clock-o" />{post.createdAt.toString()}</div> */}
                                <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o pe-2" />{getTimeSince(post.createdAt.toString())}</div>
                                <a className="card-link" href="#">
                                    <h5 className="card-title">Title</h5>
                                </a>
                                <p className="card-text">
                                    {post.text}
                                </p>
                            </div>
                            <div className="card-footer">
                                <a href="#" className="card-link"><i className="fa fa-gittip" /> Like</a>
                                <a href="#" className="card-link"><i className="fa fa-comment" /> Comment</a>
                                <a href="#" className="card-link"><i className="fa fa-mail-forward" /> Share</a>
                            </div>
                        </div>

                    ))}
                </div>
                <div className="starArea d-flex justify-content-center my-3 align-items-center ">
                    <div className="whiteLine"></div>
                    <div className="whiteLine"></div>
                </div>
                <p>Your Expert Veterinary assitant</p>

            </div>

        </div>
    )
}
