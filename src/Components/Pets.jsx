import React, { useContext, useState } from "react";
import { MyContext } from "./ContextProvider";
import axios from 'axios'
import '../MyCss/addPetsForm.css'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Pets() {

    const { userObj, setUserObj } = useContext(MyContext);
    const [image, setImage] = useState(null);
    let navigate = useNavigate()

    const token = localStorage.getItem('token');

    const headers = {
        'token': token,
    };

    const formData = new FormData();



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const body = {
            petName: e.target[1].value,
            userID: userObj.uid,
            age: e.target[2].value,
            gender: e.target[3].value,
            type: e.target[4].value,
            breed: e.target[5].value,
        };
        for (let key in body) {
            // Check if the property exists and is not inherited from prototype
            if (body.hasOwnProperty(key)) {
                // Append the property value to FormData with the corresponding key
                formData.append(key, body[key]);
            }
        }
        // console.log(body);
        if (image) {
            await formData.append('file', image);
        }


        let res = await axios.post(`https://vetro-server.onrender.com/pet`, formData, { headers: headers }).catch((err) => {
            console.log(err.response);
        })
        if (res) {
            console.log(res);
            toast.success(`${e.target[1].value} added`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/SignIn');
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
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };
    return (<>
        <div className="d-flex justify-content-center align-items-center  mb-3">
            <div className='container '>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className='' style={{ color: '#71aef3' }}>
                            <h1 className="text-center">Add your pet</h1>

                            <div className="mb-3 d-flex justify-content-center ">
                                <div className="w-25">
                                    <label htmlFor="img" className="pointer">
                                        {image ? <img className="w-100" src={URL.createObjectURL(image)} alt="" /> : <img className="w-100" src={'https://ssniper.sirv.com/Images/dog.jpg'} alt="" />}
                                    </label>
                                    <input className="d-none" type="file" onChange={handleImageChange} id="img" />
                                </div>
                            </div>
                            <div className="mb-3  ">
                                <label htmlFor="" > Name:</label>
                                <div className="col-lg-12">
                                    <input type="text" className="form-control" name='Name' placeholder="Name" />
                                </div>
                            </div>

                            <div className="mb-3 ">
                                <label htmlFor="" className='' > age:</label>
                                <div className="col-lg-12">
                                    <input type="number" min={0} className="form-control" name='age' placeholder="age" />
                                </div>
                            </div>

                            <div className="mb-3 ">
                                <label htmlFor="" > gender:</label>
                                <div className="col-lg-12">
                                    <select >
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3 ">
                                <label htmlFor="" > type:</label>
                                <div className="col-lg-12">
                                    <select >
                                        <option value="dog">dog</option>
                                        <option value="cat">cat</option>
                                        <option value="bird">bird</option>
                                        <option value="other">other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3 ">
                                <label htmlFor="breed" >Breed:</label>
                                <div className="col-lg-12">
                                <input type="text" min={0} className="form-control" name='breed' placeholder="breed" />
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
