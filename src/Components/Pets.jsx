import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
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
