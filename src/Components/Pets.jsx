import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useContext } from 'react';
import { db } from '../Firebase/firebase';
import { MyContext } from './ContextProvider';

export default function Pets() {

    const [Name, setName] = useState("");
    const [Age, setAge] = useState("");
    const [Type, setType] = useState("");
    const [Gender, setGender] = useState("");
    const [Breed, setBreed] = useState("");
    const { userObj, setUserObj } = useContext(MyContext);


    const usersRef = doc(db, "Users",userObj.uid);
    const PetRef = doc(db , "Pets" ,"PetsID");

    const handleSubmit = (async (event) => {
        event.preventDefault();

        const PetsData ={
            Name,
            userID:userObj.uid,
            Age,
            Type,
            Gender,
            Breed
        };
        try {
            // Save PETS data to Firestore
            const userRef = await addDoc(collection(db , "Pets"),PetsData);
            console.log("Pets added with ID: ", userRef.id);
            // Update user document with PETS reference
            await updateDoc(usersRef, {
                Pets:userRef,            
            });
            // Clear the form after successful submission
            setName("");
            setAge("");
            setType("");
            setGender("");
            setBreed("");
        }catch(error){
            console.error("Error adding PETS: ", error);
        }
    })









  return (
    <>
    
    <div className=' d-flex justify-content-center align-items-center Mytall'>
        <div className='container'>
        <form onSubmit={handleSubmit} >
            <div className='row'>
            <div className='text-light '>
            <h1 className="text-center">PETS</h1> 
            
                <div class="mb-3 ">
                <label for="" > Name</label>
                <div className="col-lg-12">
                <input type="text" className="form-control" name='Name' value={Name}
                    onChange={(event) => setName(event.target.value)} />
                </div>
                </div>
                
                <div class="mb-3  ">
                <label for="" > Age</label>
                <div className="col-lg-12">
                <input type="number" className="form-control" name='Age' value={Age}
                    onChange={(event) => setAge(event.target.value)} />
                </div>
                </div>

                <div class="mb-3  ">
                <label for=""> Types</label>
                <div className="col-lg-12">
                <input type="text" className="form-control" name='Type'  value={Type}
                    onChange={(event) => setType(event.target.value)} />
                </div>
                </div>

                <div class="mb-3  ">
                <label for="" > Gender</label>
                <div className="col-lg-12">
                <input type="text" className="form-control" name='Gender'  value={Gender}
                    onChange={(event) => setGender(event.target.value)}/>
                </div>
                </div>
                
                <div class="mb-3  ">
                <label for="" > Breed</label>
                <div className="col-lg-12">
                <input type="text" className="form-control" name='Breed' value={Breed}
                    onChange={(event) => setBreed(event.target.value)} />
                </div>
                </div>
                
                <div className='d-grid' onSubmit={handleSubmit}>
                    <button className='btn btn-dark' >Submit</button>
                </div>







            </div>
            </div>
        </form>        
        </div>
    </div>            
    
    
    
    </>
  )
}
