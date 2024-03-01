import React, { useContext, useState } from "react";
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { getFirestore, collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { MyContext } from "./ContextProvider";
const db = getFirestore();

export default function AddClinic() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [Day, setDay] = useState("");
    const [availableFrom, setAvailableFrom] = useState("");
    const [availableTo, setAvailableTo] = useState("");
    const { userObj, setUserObj } = useContext(MyContext);

    const usersRef = doc(db, "Users", userObj.uid);
    const clinicRef = doc(db, "Clinics", "clinicID");



    const handleSubmit = (async (event) => {
        event.preventDefault();


        const clinicData = {
            name,
            DoctorId: userObj.uid,
            phone,
            location,
            price,
            Day,
            availableFrom,
            availableTo,
        };
        try {
            // Save clinic data to Firestore
            const docRef = await addDoc(collection(db, "Clinics"), clinicData);
            console.log("Clinic added with ID: ", docRef.id);
            // Update user document with clinic reference
            await updateDoc(usersRef, {
                clinics: docRef,

            });

            // Clear the form after successful submission
            setName("");
            setPhone("");
            setLocation("");
            setPrice("");
            setDay("");
            setAvailableFrom("");
            setAvailableTo("");
        } catch (error) {
            console.error("Error adding clinic: ", error);
        }

    });
    return (<>
    <div className="d-flex justify-content-center align-items-center Mytall1">
        <div className='container '>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className='' style={{color:'#71aef3'}}>
                        <h1 className="text-center">Clinic</h1>

                        <div className="mb-3  ">
                            <label htmlFor="" > Name:</label>
                            <div className="col-lg-12">
                                <input type="text" className="form-control" name='Name' value={name}
                                    onChange={(event) => setName(event.target.value)}  placeholder="Name"/>
                            </div>
                        </div>

                        <div className="mb-3 ">
                            <label htmlFor="" className='' > phone:</label>
                            <div className="col-lg-12">
                                <input type="number" className="form-control" name='phone' value={phone}
                                    onChange={(event) => setPhone(event.target.value)}  placeholder="Phone" />
                            </div>
                        </div>

                        <div className="mb-3 ">
                            <label htmlFor="" > location:</label>
                            <div className="col-lg-12">
                                <input type="text" className="form-control" name='location' value={location}
                                    onChange={(event) => setLocation(event.target.value)}  placeholder="Location"/>
                            </div>
                        </div>

                        <div className="mb-3 ">
                            <label htmlFor="" > price:</label>
                            <div className="col-lg-12">
                                <input type="text" className="form-control" name='price' value={price}
                                    onChange={(event) => setPrice(event.target.value)}  placeholder="Price" />
                            </div>
                        </div>
                        <div className="mb-3 ">
                            <label htmlFor="" > Day:</label>
                            <div className="col-lg-12">
                                <input type="day" className="form-control" name='Day' value={Day}
                                    onChange={(event) => setDay(event.target.value)}  placeholder="Day" />
                            </div>
                        </div>

                        <div className="mb-3 ">
                            <label htmlFor="" >Available From:</label>
                            <div className="col-lg-12">
                                <input type="time" className="form-control" name='AvailableFrom' value={availableFrom}
                                    onChange={(event) => setAvailableFrom(event.target.value)}   />
                            </div>
                        </div>

                        <div className="mb-3 ">
                            <label htmlFor="" >Available to:</label>
                            <div className="col-lg-12 ">
                                <input type="time" className="form-control " name='AvailableTo' value={availableTo}
                                    onChange={(event) => setAvailableTo(event.target.value)}  />
                            </div>
                        </div>

                        <div className='d-grid sub' onSubmit={handleSubmit}>
                            <button className='btn sub' >Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        </div>
    







    </>

    )
}
/****************** */