import React, { useState } from "react";
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { getFirestore, collection, addDoc } from "firebase/firestore";
const db = getFirestore();


export default function AddClinic() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [availableFrom, setAvailableFrom] = useState("");
    const [availableTo, setAvailableTo] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const clinicData = {
            name,
            phone,
            location,
            price,
            availableFrom,
            availableTo,
        };
    // Save clinic data to Firestore
    addDoc(collection(db, "Clinics"), clinicData)
    .then((docRef) => {
        console.log("Clinic added with ID: ", docRef.id);
        // Clear the form after successful submission
        setName("");
        setPhone("");
        setLocation("");
        setPrice("")
        setAvailableFrom("");
        setAvailableTo("");
        })
        .catch((error) => {
        console.error("Error adding clinic: ", error);
        });
    };
    return (<>
    <div className='container '>
    <form  onSubmit={handleSubmit}>
    <div class="row">
    <div className='text-light '>
    <h1 className="text-center">Clinic</h1> 
    
        <div class="mb-3  ">
        <label for="" > Name</label>
        <div className="col-lg-12">
        <input type="text" className="form-control" name='Name' value={name}
            onChange={(event) => setName(event.target.value)} />
        </div>
        </div>

        <div class="mb-3 ">
        <label for="" className='' > phone</label>
        <div className="col-lg-12">
        <input type="number" className="form-control" name='phone' value={phone}
            onChange={(event) => setPhone(event.target.value)} />
        </div>
        </div>

        <div class="mb-3 ">
        <label for="" > location</label>
        <div className="col-lg-12">
        <input type="text" className="form-control" name='location' value={location}
            onChange={(event) => setLocation(event.target.value)} />
        </div>
        </div>

        <div class="mb-3 ">
        <label for="" > price</label>
        <div className="col-lg-12">
        <input type="text" className="form-control" name='price'  value={price}
            onChange={(event) => setPrice(event.target.value)} />
        </div>
        </div>

        <div class="mb-3 ">
        <label for="" >Available From</label>
        <div className="col-lg-12">
        <input type="time" className="form-control" name='AvailableFrom' value={availableFrom}
            onChange={(event) => setAvailableFrom(event.target.value)} />
        </div>
        </div>

        <div class="mb-3 ">
        <label for="" >Available to</label>
        <div className="col-lg-12 ">
        <input type="time" className="form-control " name='AvailableTo' value={availableTo}
            onChange={(event) => setAvailableTo(event.target.value)} />
        </div>
        </div>

        <div className='d-grid' onSubmit={handleSubmit}>
        <button className='btn btn-light' >Submit</button>
        </div>
    </div>
    </div>       
    </form>
    </div>
    
    
    
    
    
    
    
    
    
    
    </>

    )
}
/****************** */