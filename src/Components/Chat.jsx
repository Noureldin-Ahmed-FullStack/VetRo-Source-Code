import { addDoc, collection, doc, onSnapshot, orderBy, query, runTransaction, serverTimestamp, where } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { db, getDownloadURL, ref, storage, uploadBytes } from '../Firebase/firebase';
import { MyContext } from './ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons'

export default function Chat(props) {
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const { SelectedContactData, setSelectedContactData } = useContext(MyContext);
    // const temporary= {
    //     room:"12312",
    //     reciverName:"namead",
    //     reciverPFP:"23123"
    // }
    const { room, reciverName, reciverPFP } = props;

    const dummy = useRef()
    const ChatRoom = useRef()
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    const messagesRef = collection(db, "messages")
    const userChatsref = collection(db, "UserChats")
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();

    const btnRef = useRef(null);
    const scrollToBottom = () => {
        if (ChatRoom.current) {
            ChatRoom.current.style.scrollBehavior = 'smooth'; // Enable smooth scrolling
            ChatRoom.current.scrollTop = ChatRoom.current.scrollHeight;
        }
    };

    // function formatTimeAgo(timestamp) {
    //     const now = new Date();
    //     const diff = now - timestamp;
    
    //     // Convert milliseconds to minutes
    //     const minutes = Math.floor(diff / (1000 * 60));
    
    //     if (minutes < 1440) { // Less than a day (24 hours)
    //         const hours = Math.floor(minutes / 60);
    //         const mins = minutes % 60;
            
    //         if (hours > 0) {
    //             return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    //         } else {
    //             return `${mins} ${mins === 1 ? 'minute' : 'minutes'} ago`;
    //         }
    //     } else {
    //         // More than a day, return the date string
    //         return timestamp.toDateString();
    //     }
    // }

    useEffect(() => {
        let delayedAction;
        console.log(props);
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy('createdAt'))
        const unsubscribe = onSnapshot(queryMessages, (snapShot) => {
            // console.log("newMessage");
            let messages = [];
            snapShot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
                console.log(messages);
            })
            setMessages(messages)
            // dummy.current.scrollIntoView({behavior: 'smooth'})
            scrollToBottom();
            if (delayedAction) {
                clearTimeout(delayedAction);
            }
            delayedAction = setTimeout(() => {
                // Your code here
                scrollToBottom();
            }, 1000); // 2 seconds in milliseconds

        })

        return () => {
            unsubscribe();
            clearTimeout(delayedAction);
        }

    }, [room])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const userChatDocRef = doc(userChatsref, userObj.uid);

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            senderName: UserDBData.name,
            senderId: userObj.uid,
            SenderPFP: UserDBData.userPFP,
            IsImage: false,
            room,
        })
        if (newMessage === "") return
        await runTransaction(db, async (transaction) => {
            const userChatDocSnap = await transaction.get(userChatDocRef);
            // const newMessageData = {
            //     text: newMessage,
            //     createdAt: serverTimestamp(),
            //     senderName: userObj.displayName,
            //     senderId: userObj.uid,
            //     SenderPFP: UserDBData.userPFP,
            //     IsImage: false,
            //     room,
            // };
            // transaction.add(messagesRef, newMessageData)
            if (userChatDocSnap.exists()) {
                const chatRooms = userChatDocSnap.data().ChatRooms;
    
                // Find the index of the array item with ID
                const index = chatRooms.findIndex(r => r.ChatRoomID === room);
                const timestamp = new Date();
                if (index !== -1) {
                    // Edit the array item with ID
                    chatRooms[index] = {
                        ...chatRooms[index],
                        // Modify the properties as needed
                        LastMsg: "you: "+ newMessage,
                        LastMsgTimeStamp: timestamp.toString()
                    };
    
                    // Update the document within the transaction
                    transaction.update(userChatDocRef, {
                        ChatRooms: chatRooms
                    });
                }
            }
        })
        // await addDoc(messagesRef, {
        //     text: newMessage,
        //     createdAt: serverTimestamp(),
        //     senderName: userObj.displayName,
        //     senderId: userObj.uid,
        //     SenderPFP: UserDBData.userPFP,
        //     IsImage: false,
        //     room,
        // })
        setNewMessage("")
        scrollToBottom();
    }

    const handleImageUpload = async (e) => {

        if (e.target.files[0]) {
            await setImage(e.target.files[0]);
            await triggerInputClick()
            // await triggerInputClick()
        }
    };


    const triggerInputClick = () => {
        btnRef.current.click(); //handleUpload
    };

    const handleUpload = () => {
        console.log("handling");
        if (image) {
            console.log(image);
            const storageRef = ref(storage, `chat/${image.name}`);
            uploadBytes(storageRef, image)
                .then((snapshot) => {
                    // Image uploaded successfully, get download URL
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        setImageUrl(downloadURL)
                        PostImgToDb(downloadURL)

                        console.log('File available at', downloadURL)

                        // You can use downloadURL here or set it to state for later use
                    });
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error('Error uploading image: ', error);
                });
        } else {
            console.log("no image");
        }
    };
    const PostImgToDb = async (img) => {
        await addDoc(messagesRef, {
            text: img,
            createdAt: serverTimestamp(),
            senderName: UserDBData.name,
            senderId: userObj.uid,
            SenderPFP: UserDBData.userPFP,
            IsImage: true,
            room,
        })
        setImageUrl(null)
        setImage(null)
        scrollToBottom();
    }
    return (
        <div className=' w-100 Chatvh100'>
            <div className='w-100 bg-light py-2 d-flex align-items-center border-bottom'>
                <FontAwesomeIcon onClick={() => setSelectedContactData(null)} className='MyArrow mx-3 f-size-2 pointer' icon={fa.faArrowLeft} />
                <img src={reciverPFP} className='mx-1 mb-1 mainOtherchatBubblePhoto ' /><span className='ps-3 mainOtherchatBubbleName'>{reciverName}</span>
            </div>
            <div ref={ChatRoom} className='w-100 bg-light tall py-3 flower container'>
                <div>{messages.map((messages) => (messages.IsImage ? (
                    messages.senderId === userObj.uid ? (
                        <div key={messages.id} className='d-flex align-items-end my-2 justify-content-end'>
                            <img src={messages.text} className='MechatBubble ChatImages' />
                            <span><img className='MechatBubblePhoto' src={UserDBData?.userPFP} alt="" /></span>
                        </div>
                    ) : (
                        <div key={messages.id} className='d-flex align-items-end my-2 '>
                            <span><img className='OtherchatBubblePhoto' src={reciverPFP} alt="" /></span>
                            <img src={messages.text} className='OtherchatBubble ChatImages' />
                        </div>
                    )
                ) : (
                    messages.senderId === userObj.uid ? (
                        <div key={messages.id} className='d-flex align-items-end my-2 justify-content-end'>
                            <h6 className='MechatBubble wordBreaker'>{messages.text}</h6>
                            <span><img className='MechatBubblePhoto' src={UserDBData?.userPFP} alt="" /></span>
                        </div>
                    ) : (
                        <div key={messages.id} className='d-flex align-items-end my-2 '>
                            <span><img className='OtherchatBubblePhoto' src={reciverPFP} alt="" /></span>
                            <h6 className='OtherchatBubble wordBreaker'>{messages.text}</h6>
                        </div>
                    )
                )

                ))}
                </div>
                <div ref={dummy}></div>
            </div>
            <form id='chatForm' className='bg-light p-4 rounded-4 rounded-top-0 w-100 border-top' onSubmit={handleSubmit}>
                <div className="row gx-1 w-100">
                    <div className='col-1'>
                        <button ref={btnRef} className='d-none' onClick={handleUpload}>handleUpload</button>
                        <label className='btn' htmlFor="imgUploader"><FontAwesomeIcon className='' icon={fa.faImage} /></label>
                        <input onChange={handleImageUpload} accept="image/*" id='imgUploader' capture="environment" className='d-none' text="hi" type="file" />
                        {/* <button onClick={handleImageUpload} type='button' className='btn btn-success w-100'>Upload Image</button> */}
                    </div>
                    <div className="col-9">
                        <input
                            placeholder='Enter message'
                            className='form-control w-100'
                            type="text"
                            onChange={(e) => setNewMessage(e.target.value)}
                            value={newMessage}
                        />
                    </div>
                    <div className="col-2 btn-group">
                        <button type='submit' className='btn btn-primary w-100'><FontAwesomeIcon className='' icon={fa.faPaperPlane} /></button>
                    </div>
                </div>
            </form>
        </div>


    )
}
