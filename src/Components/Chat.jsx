import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { db } from '../Firebase/firebase';
import { MyContext } from './ContextProvider';

export default function Chat(props) {
    const { userObj, setUserObj } = useContext(MyContext);

    const {room} = props
    const [newMessage, setNewMessage] = useState("")
    const messagesRef = collection(db, "messages")
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newMessage === "") return
        console.log(userObj);
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            sender: userObj.displayName,
            room,
        })

        setNewMessage("")
    };


    return (

        <form className='bg-warning p-4 rounded-4 w-50 ' onSubmit={handleSubmit}>
            <input 
            placeholder='Enter message' 
            className='form-control w-100' 
            type="text"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            />
            <button type='submit' className='btn btn-primary my-3 w-25'>send</button>
        </form>




    )
}
