import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

export default function DoctorHome() {
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const [posts, setPosts] = useState([])
    const PostsRef = collection(db, "Posts")

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
    return (
        <div className='d-flex justify-content-center align-items-center MainSection text-center'>

            <div className='w-100 '>
                <h1 className='bigga my-2 mb-3'>Welcome to VetRo</h1>
                <h2>Doctor</h2>
                {UserDBData ? (
                    <>
                        <h2>{UserDBData.isDoctor.toString()}</h2>
                        <h2>{UserDBData.email.toString()}</h2>
                    </>
                ) : (
                    <h2>null</h2>
                )
                }

                <div className='py-3 bg-info container'>
                    {posts.map((item) => (
                        <div key={item.id}>
                            <p>ID: {item.senderId}</p>
                            <img className='circle-round' src={item.SenderPFP} alt="" />
                            <p>Name: {item.senderName}</p>
                            <p>{item.text}</p>
                            <p>{item.createdAt.toString()}</p>
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
