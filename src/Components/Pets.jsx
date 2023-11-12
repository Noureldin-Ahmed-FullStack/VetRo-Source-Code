


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

import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../Firebase/firebase'
function Form() {

    //This function takes in the PetData object
    const addpetToFirestore = async (PetData) => 
    {
        try { 
            
         const docRef = await addDoc(collection(db, "Pets"), PetData); //addDoc to add a new document to the "Pets" collection
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); //It prevents the default form submission behavior
        const PetData = { 
          Name: Name,
          Age: Age,
          gender:gender,
          Type:Type,
          breed:breed
        };
        addpetToFirestore(PetData);
    };
      

    const [Name, setName] = useState('');
    const [Age, setAge] = useState('');
    const [gender, setgender] = useState('');
    const [Type, setType] = useState('');
    const [breed, setbreed] = useState('');
  
    
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">  Name:</label>
        <input
          type="text"
          id="Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
  
        <label htmlFor="Age">Age:</label>
        <input
          type="number"
          id="Age"
          value={Age}
          onChange={(e) => setAge(e.target.value)}
        />

       
<       label htmlFor="gender">gender:</label>
        <input
          type="text"
          id="ender"
          value={gender}
          onChange={(e) => setgender(e.target.value)}
        />

        <label htmlFor="Type">Type:</label>
        <input
          type="text"
          id="type"
          value={Type}
          onChange={(e) => setType(e.target.value)}
        />

        <label htmlFor="breed">breed:</label>
        <input
          type="text"
          id="breed"
          value={breed}
          onChange={(e) => setbreed(e.target.value)}
        />

        <button type="add" >Submit</button>
      </form>
    );
  }
  
  export default Form;