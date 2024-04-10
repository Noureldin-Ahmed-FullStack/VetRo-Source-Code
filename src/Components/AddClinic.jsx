import React, { useContext, useState } from "react";
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { getFirestore, collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { MyContext } from "./ContextProvider";
import axios from 'axios'
const db = getFirestore();

export default function AddClinic() {

    const { userObj, setUserObj } = useContext(MyContext);
    const [image, setImage] = useState(null);

    const token = localStorage.getItem('token');

    const headers = {
        'token': token,
    };

    const formData = new FormData();



    const handleSubmit = async (e) => {
        e.preventDefault();

        const day_from = e.target[4].value
        const day_till = e.target[5].value

        const time_from = e.target[6].value
        const time_till = e.target[7].value
        const body = {
            clinicName: e.target[0].value,
            userID: userObj.uid,
            phoneNumber: e.target[1].value,
            address: e.target[2].value,
            appointmentPrice: e.target[3].value,
            schedule: day_from + " to " + day_till,
            availability: time_from + " to " + time_till
        };
        // console.log(body);
        if (image) {
            formData.append('file', image);
        }
        
        
        let res = await axios.post(`http://localhost:3000/clinic`, body,  { headers: headers }, formData).catch((err) => {
            console.log(err.response);
        })
        if (res) {
            console.log(res);
        }
        // try {
        //     // Save clinic data to Firestore
        //     const docRef = await addDoc(collection(db, "Clinics"), clinicData);
        //     console.log("Clinic added with ID: ", docRef.id);
        //     // Update user document with clinic reference
        //     await updateDoc(usersRef, {
        //         clinics: docRef,

        //     });

        //     // Clear the form after successful submission
        // } catch (error) {
        //     console.error("Error adding clinic: ", error);
        // }

    };
    return (<>
        <div className="d-flex justify-content-center align-items-center Mytall1">
            <div className='container '>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className='' style={{ color: '#71aef3' }}>
                            <h1 className="text-center">Clinic</h1>

                            <div className="mb-3  ">
                                <label htmlFor="" > Name:</label>
                                <div className="col-lg-12">
                                    <input type="text" className="form-control" name='Name' placeholder="Name" />
                                </div>
                            </div>

                            <div className="mb-3 ">
                                <label htmlFor="" className='' > phone:</label>
                                <div className="col-lg-12">
                                    <input type="tel" className="form-control" name='phone' placeholder="Phone" />
                                </div>
                            </div>

                            <div className="mb-3 ">
                                <label htmlFor="" > address:</label>
                                <div className="col-lg-12">
                                    <input type="text" className="form-control" name='address' placeholder="address" />
                                </div>
                            </div>

                            <div className="mb-3 ">
                                <label htmlFor="" > booking price:</label>
                                <div className="col-lg-12">
                                    <input type="text" className="form-control" name='booking_price' placeholder="booking Price" />
                                </div>
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="" > schedule:</label>
                                <div className="col-lg-12">
                                    <span className="me-3">from</span>
                                    <select >
                                        <option value="saturday">saturday</option>
                                        <option value="sunday">sunday</option>
                                        <option value="monday">monday</option>
                                        <option value="tuesday">tuesday</option>
                                        <option value="wednesday">wednesday</option>
                                        <option value="thursday">thursday</option>
                                        <option value="friday">friday</option>
                                    </select>
                                    <span className="mx-3">to</span>
                                    <select >
                                        <option value="saturday">saturday</option>
                                        <option value="sunday">sunday</option>
                                        <option value="monday">monday</option>
                                        <option value="tuesday">tuesday</option>
                                        <option value="wednesday">wednesday</option>
                                        <option value="thursday">thursday</option>
                                        <option value="friday">friday</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3 ">
                                <label htmlFor="" >Available From:</label>
                                <div className="col-lg-12">
                                    <span className="me-3">from</span>
                                    <input type="time" className="" name='AvailableFrom' />
                                    <span className="mx-3">till</span>
                                    <input type="time" className=" " name='AvailableTo' />
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