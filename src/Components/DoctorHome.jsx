import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faFaceTired } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '../MyCss/DoctorHome.css'

export default function DoctorHome() {
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const [posts, setPosts] = useState([])
    const [isOpen, setIsOpen] = useState(false)
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
                setPosts(fetchedItems);
                console.log(fetchedItems);
            } catch (error) {
                console.error('Error fetching collection:', error);
            }
        }
        fetchCollection();
    }, [])

/************************************************************************ */

    
    return (
        <>
            <div className='container'>
                <div className='row'>
                <div className='bg1'>
                <div className='text-center item1' >
                    <h2 className='item22'>Welcome Back, <span style={{fontSize:'30px'}}> DR.{UserDBData.userName} </span>
                    <FontAwesomeIcon icon={faUserDoctor} style={{color:'blue' , fontSize:'25px' , margin:'5px'}}/>

                    
                </h2>
                </div>
                </div>
                </div>
            </div>

            
       
                {/*** <h1 className='bigga my-2 mb-3'>Welcome to VetRo</h1>
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
            */} 
            {isOpen ? (
            <div className=' container text-black justify-content-center align-items-center MainSection text-center'>
            <div className='w-100 '>
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
                        <div key={post.id} className="card my-4 text-start gedf-card c5  ">
                                <div className="card-header c4 ">
                                        <div className="d-flex justify-content-between align-items-center ">
                                                <div onClick={() => goToProfile(post.senderId)} className="d-flex pointer justify-content-between align-items-center ">
                                                        <div className="me-2">
                                                            <img className="rounded-circle" width={50} src={post.SenderPFP} />
                                                        </div>
                                                        <div className="ms-2">
                                                            <div className="h5 m-0 lineOnHover">{post.senderName}</div>
                                                        </div>
                                                </div>
                                            <div>
                                                    <div className="dropdown">
                                                            <button className="btn btn-link dropdown-toggle" type="button"
                                                                id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className="fa fa-ellipsis-h" />
                                                            </button>
                                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1" 
                                                                x-placement="bottom-end" style={{ position: 'absolute', willChange: 'transform',
                                                                top: 0, left: 0, transform: 'translate3d(55px, 38px, 0px)' }}>
                                                                <div className="h6 dropdown-header">Configuration</div>
                                                                <a className="dropdown-item" href="#">Save</a>
                                                                <a className="dropdown-item" href="#">Hide</a>
                                                                <a className="dropdown-item" href="#">Report</a>
                                                            </div>
                                                    </div>
                                            </div>
                                        </div>
                                </div>
                            <div className="card-body r1">
                                {/* <div onClick={getTimeSince(post.createdAt.toString())} className="text-muted h7 mb-2"> <i className="fa fa-clock-o" />{post.createdAt.toString()}</div> */}
                                <div className="text-muted h7 mb-2 col-12 starRate  ">
                                <h3 className="card-text">
                                        {post.text}
                                    </h3>
                                <p>
                                <i className="fa fa-clock-o pe-2" />
                                {getTimeSince(post.createdAt.toString())}
                                </p>
                                

                                </div>
                                    
                                    
                            </div>
                                <div className="card-footer c4">
                                    <a href="#" className="card-link text-danger"><i className="fa fa-gittip" /> Like</a>
                                    <a href="#" className="card-link text-secondary"><i className="fa fa-comment" /> Comment</a>
                                    <a href="#" className="card-link text-primary"><i className="fa fa-mail-forward" /> Share</a>
                                </div>

                        </div>
                    
                    ))}
                    <button onClick={() => setIsOpen(false)} className='buttonPost2'  style={{fontSize:'50px' , fontWeight:'bold'}}>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red' , fontSize:'45px' , margin:'5px'}}/>
                     </button>

                        
                </div>
                </div>

                </div>
                ) : (  
                    <div>
                    <div className='container d-grid '>                   
                    <button onClick={() => setIsOpen(true)} className='buttonPost'  style={{fontSize:'20px' , fontWeight:'bold'}}> 
                    VIEW POSTs
                    <FontAwesomeIcon icon={faHeart} style={{color:'red' , fontSize:'25px' , margin:'5px'}}/>
                    </button>
                    </div>
                    </div> 
                    
                    


                    
                    )
                }



                {/*************************************************** */}
                <div className='container mt-5 pd-4'>
                <div className="row">
                <div className=' mt-2'>
                    <h1 className='c2'>Incoming Reservations:-
                    </h1>
                    </div>
                <div className="col-sm-6 col-lg-4 col-md-4">
                    
                    <div className="card r2">
                    <div className="card-body " >
                        <div>
                        <img src={require("../images/port2.png")} alt="nnn" className='itemimage'/>
                    <p className='starRate'>
                        <h3 className="card-title">passant yasser </h3>
                        <p className='chatIcon2' >
                        <FontAwesomeIcon icon={faMessage} style={{color:'#1782ff' , fontSize:'30px' , margin:'10px'}}/>
                        </p>      
                    </p>
                    <a href="#" className="c1">passant@gmail.com</a>
                    <p className='c1'>0124533555</p>
                        </div>
                    </div>
                    <div className='col-12 mt-2 pb-2 starRate' >
                        <button  className="btn buttonDetails1" >Accept</button>
                        <button  className="btn buttonDetails2" style={{marginLeft:'40px'}} >Delete</button>
                    </div>
                </div>

                </div>                
                </div>
                </div>
<hr/>
<hr/>
<hr/>
<hr/>

            
        
        </>
        

    )
}
