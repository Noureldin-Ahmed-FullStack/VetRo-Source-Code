import React, { useContext, useState } from 'react'
import { MyContext } from './ContextProvider';
import { db } from '../Firebase/firebase';
import { Timestamp, addDoc, arrayUnion, collection, doc, getDocs, query, runTransaction, where } from 'firebase/firestore';
import '../MyCss/userHome.css'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from './Modal Stuff/Modal';

export default function MakeAPost() {
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const [doctorData, setDoctorData] = useState(false)
    const [PostText, setPostText] = useState("")
    const PostsRef = collection(db, "Posts")

    const [isOpen, setIsOpen] = useState(false)
    const [postType, setPostType] = useState('regular');

    const [modalOpen, setModalOpen] = useState(false);

    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);

    const headers = {
        'token': localStorage.getItem('token'),
    };
    const handlePostSubmit = async (e) => {
        e.preventDefault();
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
        if (PostText === "") return;
        // console.log(PostText);
        // const dateTimeVar = new Date().toString();
        // let collectionRef;
        // if (postType === 'urgent') {
        //     collectionRef = collection(db, "UrgentPosts");
        // } else {
        //     collectionRef = collection(db, "Posts");
        // }


        // await addDoc(collectionRef, {
        //     text: PostText,
        //     createdAt: dateTimeVar.slice(0, 21),
        //     senderName: UserDBData.userName,
        //     senderId: UserDBData.uid,
        //     SenderPFP: UserDBData.userPFP,
        //     UserData: UserDBData,
        //     photos: "",
        // });
        const body = {
            title: e.target[1].value,
            content: e.target[2].value,
            urgent: e.target[0].value
        }
        console.log(body, headers);
        let res = await axios.post(`https://vetro-server.onrender.com/post`, body, { headers: headers }).catch((err) => {
            toast.error(err, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
        if (res) {
            console.log(res);
            toast.success("Posted!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setPostText("")
        setIsOpen(false)
        close()
    }

    return (
        <div>
            {/* {isOpen ? (
                <div className='myOverlay w-100  d-flex justify-content-center align-items-center '>
                    <div className='container'>
                        <div className='container bg-light rounded-5 w-100 '>
                            <div className="row text-center  ">
                                <div className="col-12 d-flex justify-content-between  y2">
                                    <p></p>
                                    <h2 className='py-3' style={{ color: '#74b4ff' }}>Create  post</h2>
                                    <div className='d-flex justify-content-end align-items-center'>
                                        <FontAwesomeIcon onClick={() => setIsOpen(false)} className='myClose' icon={fa.faCircleXmark} />
                                    </div>
                                </div>

                            </div>
                            <form onSubmit={handlePostSubmit}>
                                <div className="post-box container y1">
                                    <div className="user-profile row">
                                        <div className='d-flex align-items-center py-2'>
                                            <img className='circle-round' src={UserDBData?.userPFP || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRLRMXynnc7D6-xfdpeaoEUeon2FaU0XtPg&usqp=CAU"} alt="Profile Picture" />
                                            <h2 className='usrText pot1'>{UserDBData?.userName}</h2>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label >Post Type </label>
                                        <select onChange={(e) => setPostType(e.target.value)} className="form-control my-2">
                                            <option value={false}> Regular Post</option>
                                            <option value={true}>Urgent Post</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label >Title </label>
                                        <input type="text" className='form-control mb-3' placeholder='Title' />
                                    </div>

                                    <div className='input-area '>
                                        <textarea onChange={(e) => setPostText(e.target.value)} className='form-control  bg-light' rows="6" placeholder="What's on your mind?"></textarea>
                                    </div>
                                    <div className=" mt-3">
                                        <button type='button' className="btn me-3 btn-outline-primary p-3 bold mb-2"><FontAwesomeIcon icon={fa.faImage} /> Add Image</button>
                                        <button type='submit' className="btn mx-3 btn-primary p-3 bold mb-2" ><FontAwesomeIcon icon={fa.faPaperPlane} /> submit</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

            ) : (
                <> </>

            )

            } */}

            <div className='d-flex mt-4 justify-content-center container'>
                <div className=' w-100 bg-light MyShadow rounded-4'>
                    <div className="form-group p-3  ">
                        <h5 className='text-center'>Create a post</h5>
                        <input type="email" onClick={() => (modalOpen ? close() : open())} className="form-control inpo" placeholder='write here' />
                        <div>
                            {/* <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="save-button"
                                onClick={() => (modalOpen ? close() : open())}
                            >
                                Launch modal
                            </motion.button> */}
                            <AnimatePresence
                                // Disable any initial animations on children that
                                // are present when the component is first rendered
                                initial={false}
                                // Only render one component at a time.
                                // The exiting component will finish its exit
                                // animation before entering component is rendered
                                mode='wait'
                                // Fires when all exiting nodes have completed animating out
                                onExitComplete={() => null}
                            >
                                {modalOpen && <Modal modalOpen={modalOpen} animation={"dropIn"} handleClose={close} >

                                    <form onSubmit={handlePostSubmit}>
                                        <div className="post-box container y1">
                                            <div className="user-profile row">
                                                <div className='d-flex align-items-center py-2'>
                                                    <img className='circle-round' src={UserDBData?.userPFP || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRLRMXynnc7D6-xfdpeaoEUeon2FaU0XtPg&usqp=CAU"} alt="Profile Picture" />
                                                    <h2 className='usrText pot1'>{UserDBData?.userName}</h2>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label >Post Type </label>
                                                <select onChange={(e) => setPostType(e.target.value)} className="form-control my-2">
                                                    <option value={false}> Regular Post</option>
                                                    <option value={true}>Urgent Post</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label >Title </label>
                                                <input type="text" className='form-control mb-3' placeholder='Title' />
                                            </div>

                                            <div className='input-area '>
                                                <textarea onChange={(e) => setPostText(e.target.value)} className='form-control  bg-light' rows="6" placeholder="What's on your mind?"></textarea>
                                            </div>
                                            <div className=" mt-3">
                                                <button type='button' className="btn me-3 btn-outline-primary p-3 bold mb-2"><FontAwesomeIcon icon={fa.faImage} /> Add Image</button>
                                                <button type='submit' className="btn mx-3 btn-primary p-3 bold mb-2" ><FontAwesomeIcon icon={fa.faPaperPlane} /> submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </Modal>}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
