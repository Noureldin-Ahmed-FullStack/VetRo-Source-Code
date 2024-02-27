import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
/** */
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


import '../MyCss/doctorHome.css'
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



    /**** */
    const responsive = {
        0: {
          items:  1,
        },
        600: {
          items:  2, // Adjust this value based on your preference for tablet screens
        },
        1000: {
          items:  2, // Adjust this value based on your preference for larger screens
        },
      };
    
    return (
<>
<div className='w-100 p1 '>
        <div className=''>
          <div className=''>
            <h3 className='container text-light pt-5'>Welcome Back, <span style={{ fontSize: '35px' }}> {UserDBData?.userName} </span></h3>
            <div className='pt-4 container pb-2'>
              <input className='form-control p4 py-2' placeholder="search here" />
            </div>
          </div>
        </div>
      </div>

      <div className='L1 w-100 d-flex align-items-center justify-content-center'>
        <div className='noneInphone'>
          <div className=' text-center text-light'>
            <h1 className='container text-light'>Empowering Healthy Lives for Your Pets</h1>
            <div className='pt-4 container pb-2'>
              <h4>Experience Veterinary Excellence Crafted with Love and Expertise for the Furry Friends We Adore</h4>
            </div>
          </div>
        </div>
      </div>

    

<div className='pp4'>incomming Pet Owner Reservations</div>

<div className='container'>
      <OwlCarousel className='owl-theme' responsive={responsive}  nav>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 col-12'>
              <div className="card cardsize">
                <img src={require("../images/port2.png")} alt="nnn" className="circle-round-profile"/>
                <div className="card-body">
                  <div className='starRatepp7 justify-content-between align-items-center'>
                    <div className="ms-2">
                      <div className="h4 m-0" style={{color:'#39434F'}}>sara</div>
                      <div className="m-0 COLorli">sara@gmail</div>
                      <div className="m-0 COLorli">0123456789</div>
                    </div>
                    <div className=''><FontAwesomeIcon className='mess' icon={fa.faCommentDots} /></div>
                  </div>
                  <hr/>
                  <div className='starRated COLorP'>
                    <p>Route check-up</p>
                    <p> Monday-2/5/2024</p>
                  </div>
                  <hr/>
                  <div className='col-12 mt-2'>
                    <button className="btn buttonDetails1">
                      <FontAwesomeIcon className='' icon={fa.faCheck} style={{ color: '#10E10B', fontSize:'20px' }} />
                      Accept
                    </button>
                    <button className="btn buttonDetails2">
                      <FontAwesomeIcon className='' icon={fa.faXmark} style={{ color: '#F93535', fontSize:'20px' }} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </OwlCarousel>
    </div>







        <div className='text-black justify-content-center align-items-center MainSection text-center container px-5 mt-5'>

            <div className='container'>

                <h2 className='postss'>Recent posts from pet owners </h2>
                    {posts.map((post) => (
                        <div key={post.id} className="card1 my-4 text-start gedf-card py-2 px-2">
                            <div className="card-header cardbag">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div onClick={() => goToProfile(post.senderId)} className="d-flex pointer justify-content-between align-items-center">
                                        <div className="me-2">
                                            <img className="rounded-circle" width={45} src={post.SenderPFP} />
                                        </div>
                                        <div className="ms-2">
                                            <div className="h5 m-0 namecolor">{post.senderName}</div>
                                        </div>
                                    </div>
                                <div>
                                    <div className='starRatepp7 justify-content-between align-items-center'>
                                    <div className=''>
                                    <FontAwesomeIcon className='mess' icon={fa.faCommentDots} />
                                    </div>
                                </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                            <p className="card-text h5">
                                    {post.text}
                                </p>
                                <div className="text-muted  mb-4 mt-4" style={{fontSize:'12px'}}> 
                                <i className="fa fa-clock-o pe-1" />{getTimeSince(post.createdAt.toString())}
                                </div>
                                
                                
                            </div>
                        
                        </div>

                    ))}



                
                <div className="starArea d-flex justify-content-center my-3 align-items-center ">
                    <div className="whiteLine"></div>
                    <div className="whiteLine"></div>
                </div>
                <p>Your Expert Veterinary assitant</p>

            </div>

        </div>

</>
    )
}
