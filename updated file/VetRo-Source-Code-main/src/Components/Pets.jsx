


/*import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React from 'react'
import { db } from '../Firebase/firebase'

export default function Pets() {

    const usersRef = collection(db, "Users")
    const petRef = collection(db, "Pets")

    const petDocumentRef = doc(petRef, "1");

    let petsObj = {
        pet1:petDocumentRef,
        pet2:petDocumentRef,
        pet3:petDocumentRef,
        pet4:petDocumentRef,
    }

    // Use getDocs to execute the query



    const handleNameChange = () => {
        // const updateData = {};
        // updateData["userName"] = "Hendy";
        // updateDoc(userDocumentRef, updateData)
        const q = query(usersRef, where('uid', '==', "of2aRstrbZOt0dRDp1obL5fQoHh1"));
        getDocs(q)
            .then((querySnapshot) => {
                querySnapshot.forEach((docu) => {
                    // Here, you can access the document ID and document data
                    const docID = docu.id;
                    const data = docu.data();
                    const userDocumentRef = doc(usersRef, docID);
                    const updateData = {};
                    updateData["pet"] = petsObj;
                    updateDoc(userDocumentRef, updateData)
                });
            })
            .catch((error) => {
                console.error('Error querying documents:', error);
            });
    }

    return (
        <div>
            <button className='btn btn-danger' onClick={handleNameChange}>change name</button>
        </div>
    )
}
*/

import React, { useContext, useState } from 'react';
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from '../Firebase/firebase'
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { MyContext } from './ContextProvider';
var arr =[]
function Form() {
    const { userObj, setUserObj } = useContext(MyContext);
    const petRef = collection(db, "Pets")
    const newPetDocRef = doc(petRef);
    const { updatePetsFieldForUser } = UseFirebaseAuth();
    const [PetData, setPetData] = useState([]);

    //This function takes in the PetData object
    const addpetToFirestore = async () => {
        try {
            arr.push({
                petRef: newPetDocRef
              })
              await setPetData(arr)
            setDoc(newPetDocRef, {
                petId: newPetDocRef.id,
                Name: Name,
                Age: Age,
                gender: gender,
                Type: Type,
                breed: breed
              })
              console.log(newPetDocRef.id);
              setCurrentPetId(newPetDocRef.id)
              console.log(arr);
              console.log(userObj.uid);
            // const docRef = await addDoc(collection(db, "Pets"), PetData); //addDoc to add a new document to the "Pets" collection
            // console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        await updatePetsFieldForUser( arr)
    };

    const handleSubmit = (event) => {
        event.preventDefault(); //It prevents the default form submission behavior
        const PetData = {
            Name: Name,
            Age: Age,
            gender: gender,
            Type: Type,
            breed: breed
        };
        addpetToFirestore(PetData);
    };


    const [Name, setName] = useState('');
    const [Age, setAge] = useState('');
    const [gender, setgender] = useState('');
    const [Type, setType] = useState('');
    const [breed, setbreed] = useState('');
    const [currentPetId, setCurrentPetId] = useState('');


    return (
        <div className='container d-flex justify-content-center align-items-center Mytall'>
            <div className='bg-light rounded-3 py-5 d-flex justify-content-center w-auto'>
                <div className='container'>
                <form onSubmit={handleSubmit} className=''>
                    <div className='row'>
                        <div className=" py-2">
                            <label htmlFor="Name">  Name:</label>
                            <input
                                className='form-control'
                                type="text"
                                id="Name"
                                value={Name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className=" py-2">
                            <label htmlFor="Age">Age:</label>
                            <input
                                className='form-control'
                                type="number"
                                id="Age"
                                value={Age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className=" py-2">
                            <       label htmlFor="gender">gender:</label>
                            <input
                                className='form-control'
                                type="text"
                                id="ender"
                                value={gender}
                                onChange={(e) => setgender(e.target.value)}
                            />
                        </div>
                        <div className=" py-2">
                            <label htmlFor="Type">Type:</label>
                            <input
                                className='form-control'
                                type="text"
                                id="type"
                                value={Type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                        <div className=" py-2">
                            <label htmlFor="breed">breed:</label>
                            <input
                                className='form-control'
                                type="text"
                                id="breed"
                                value={breed}
                                onChange={(e) => setbreed(e.target.value)}
                            />
                        </div></div>
                    <button type="add" className='btn btn-success w-100 py-3 mt-2' >Submit</button>
                </form>
                </div>
            </div>
        </div>

    );
}

export default Form;