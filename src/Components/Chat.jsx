import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { db } from '../Firebase/firebase';
import { MyContext } from './ContextProvider';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Chat(props) {
    const { userObj, setUserObj } = useContext(MyContext);
    const dummy = useRef()
    const ChatRoom = useRef()
    const { room } = props
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    const messagesRef = collection(db, "messages")

    const scrollToBottom = () => {
        if (ChatRoom.current) {
            ChatRoom.current.style.scrollBehavior = 'smooth'; // Enable smooth scrolling
            ChatRoom.current.scrollTop = ChatRoom.current.scrollHeight;
        }
      };

    useEffect(() => {
        let delayedAction;
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
        
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newMessage === "") return
        console.log(userObj);
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            senderName: userObj.displayName,
            senderId: userObj.uid,
            SenderPFP: userObj.photoURL,
            room,
        })

        setNewMessage("")
        // dummy.current.scrollIntoView({behavior: 'smooth'})
        scrollToBottom();


    };
    // key={message.id} 
    //-------------uploadImage---------
    const handlleSubmit = (e) => {
        e.preventDefault()
        const file = e.target[0]?.files[0]
        if (!file) return;
        const storage=getStorage();
        //reference where the file will be stored in Storage.
        const storageRef = ref(storage, `chat/${file.name}`); //"caht" file name in Storage
        //uploading the file to Storage.
        const uploadTask = uploadBytesResumable(storageRef, file);
     
        uploadTask.on("state_changed",
        //--
    (snapshot) => {
        //calculated as a percentage of the total bytes transferred
     const progress =
       Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
     setProgresspercent(progress);
    },
    (error) => {
     console.error("Upload error:", error);
    },
    () => {
    
     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       console.log("Download URL:", downloadURL);
       setImgUrl(downloadURL);
     })}
   
        )}

    return (
        <div className=' w-100 '>
            <div ref={ChatRoom} className='w-100 bg-light rounded-top-4 py-3 flower container'>
                <div>{messages.map((messages) => (
                     messages.senderId === userObj.uid ? (
                    <div key={messages.id}  className='d-flex align-items-center my-2 justify-content-end'>
                        <h6 className='MechatBubble'>{messages.text}</h6>
                        <span><img className='MechatBubblePhoto' src={messages.SenderPFP} alt="" /></span>
                    </div>
                     ) : (
                        <div key={messages.id}  className='d-flex align-items-center my-2 '>
                        <span><img className='OtherchatBubblePhoto' src={messages.SenderPFP} alt="" /></span>
                        <h6 className='OtherchatBubble'>{messages.text}</h6>
                      </div>
                    )
                ))}
                </div>
                <div ref={dummy}></div>
            </div>
            <form className='bg-warning p-4 rounded-4 rounded-top-0 w-100 ' onSubmit={handleSubmit}>
                <div className="row gx-1 w-100">
                    <div className="col-9 ">
                        <input
                            placeholder='Enter message'
                            className='form-control w-100'
                            type="text"
                            onChange={(e) => setNewMessage(e.target.value)}
                            value={newMessage}
                        />
                    </div>
                    <div className="col-3">
                        <button type='submit' className='btn btn-primary w-100'>send</button>
                    </div>
                </div>

            </form>
        
 {/* -----------update image-----------*/}
 <div className="col-3">
 <form onSubmit={handlleSubmit} className='form'>
      <input type='file' />
     
 </form>
     
</div>
</div>



    )
}
