import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { db } from '../Firebase/firebase';
import { MyContext } from './ContextProvider';

export default function Chat(props) {
    const { userObj, setUserObj } = useContext(MyContext);

    const { room } = props
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    const messagesRef = collection(db, "messages")

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", room),orderBy('createdAt'))
        const unsubscribe = onSnapshot(queryMessages, (snapShot) => {
            // console.log("newMessage");
            let messages = [];
            snapShot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
                console.log(messages);
            })
            setMessages(messages)
        })

        return() => unsubscribe();
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
    };


    return (
        <div className=' w-50 '>
            <div className='w-100 bg-light rounded-top-4 py-3 '>
                <div>{messages.map((messages)=> (
                    <div className='d-flex align-items-center'>
                        <span><img className='chatBubblePhoto' src={messages.SenderPFP} alt="" /></span>
                        <h6>{messages.text}</h6>
                    </div>
                
                ))}</div>
            </div>
            <form className='bg-warning p-4 rounded-4 rounded-top-0 w-100 ' onSubmit={handleSubmit}>
                <div className="row  w-100">
                    <div className="col-md-10">
                        <input
                            placeholder='Enter message'
                            className='form-control w-100'
                            type="text"
                            onChange={(e) => setNewMessage(e.target.value)}
                            value={newMessage}
                        />
                    </div>
                    <div className="col-md-2">
                        <button type='submit' className='btn btn-primary'>send</button>
                    </div>
                </div>

            </form>
        </div>


    )
}
