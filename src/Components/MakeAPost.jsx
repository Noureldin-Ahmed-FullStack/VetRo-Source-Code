import React, { forwardRef, useContext, useState } from 'react'
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
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
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
        console.log("tesing post");
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
        let res = await axios.post(`https://vet-ro-server.vercel.app/post`, body, { headers: headers }).catch((err) => {
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
        handleClose()
    }
    const [dialogueOpen, setDialogueOpen] = useState(false);

    const handleClickOpen = () => {
        setDialogueOpen(true);
    };

    const handleClose = () => {
        setDialogueOpen(false);
    };



    return (
        <div>


            <div className='d-flex mt-4 justify-content-center container'>
                <div className=' w-100 bg-light MyShadow rounded-4'>
                    <div className="form-group p-3  ">
                        <h5 className='text-center pb-2'>Create a post</h5>
                        <div onClick={handleClickOpen} className='form-control postInputCss'><span className='text-secondary '>What's on your mind?</span></div>
                        {/* <input type="text" onClick={() => (modalOpen ? close() : open())} className="form-control " placeholder="What's on your mind?" /> */}
                        <div>
                            {/* <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="save-button"
                                onClick={() => (modalOpen ? close() : open())}
                            >
                                Launch modal
                            </motion.button> */}
                            <Dialog
                                open={dialogueOpen}
                                TransitionComponent={Transition}
                                keepMounted
                                fullWidth
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                                <form onSubmit={handlePostSubmit}>
                                    <DialogContent>
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
                                                {/* <button type='button' className="btn me-3 btn-outline-primary p-3 bold mb-2"><FontAwesomeIcon icon={fa.faImage} /> Add Image</button> */}
                                                {/* <button type='submit' className="btn btn-primary p-3 bold mb-2" ><FontAwesomeIcon icon={fa.faPaperPlane} /> submit</button> */}
                                            </div>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button type='button' onClick={handleClose}>close</Button>
                                        <Button type='submit' variant='outlined'>Post</Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
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
                                                {/* <button type='button' className="btn me-3 btn-outline-primary p-3 bold mb-2"><FontAwesomeIcon icon={fa.faImage} /> Add Image</button> */}
                                                <button type='submit' className="btn btn-primary p-3 bold mb-2" ><FontAwesomeIcon icon={fa.faPaperPlane} /> submit</button>
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
