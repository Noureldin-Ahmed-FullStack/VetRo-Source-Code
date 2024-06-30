
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'
import { collection, doc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db, storage, ref, uploadBytes, getDownloadURL } from '../Firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons'
import * as faReg from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'


export default function DoctorProfile() {


    const [image, setImage] = useState(null);
    const [pending, setPending] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const { signOutUser } = UseFirebaseAuth();
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const [isOpen, setIsOpen] = useState(false)

    /*For Clinic data */
    const [clinicData, setClinicData] = useState([]);
    const usersRef = doc(db, "Users", userObj.uid);
    const token = localStorage.getItem('token');
    const headers = {
        'token': token,
    };
    const fetchClinicData = async () => {
        try {
            // const response = collection(db, 'Clinics');
            // const q = query(response, where("DoctorId", "==", usersRef.id)); // Assuming userId property in Clinics collection
            // const data = await getDocs(q);
            // const clinicDataArray = data.docs.map(doc => {
            //     const clinicData = doc.data();
            //     clinicData.clinicID = doc.id;
            //     return clinicData
            // });

            setClinicData(UserDBData?.clinics);
            console.log(UserDBData?.clinics);
        } catch (error) {
            console.error("Error fetching clinic data:", error);
        }
    };

    const HandleInfoUpdate = async (event) => {
        event.preventDefault();
        var body = {
            name: event.target[0].value,
            phoneNumber: event.target[1].value,
            About: event.target[2].value
        }
        const formData = new FormData();
        for (let key in body) {
            // Check if the property exists and is not inherited from prototype
            if (body.hasOwnProperty(key)) {
                // Append the property value to FormData with the corresponding key
                formData.append(key, body[key]);
            }
        }
        if (image) {
            formData.append('file', image);
        }
        console.log(formData);
        let res = await axios.put(`https://vetro-server.onrender.com/user/${userObj.uid}`, formData, { headers: headers }).catch((err) => {
            console.log(err.response);
        })
        // await updateDoc(usersRef, newUserInfo)
        setIsOpen(false)
        setImageUrl(null)
        window.location.reload();
    }
    const handleImageChange = async (e) => {
        setPending(true)

        if (e.target.files[0]) {
            await setImage(e.target.files[0]);
            // const img = await e.target.files[0]
            // handleImageUpload(img)
        } else {
            setPending(false)
        }
    };
    useEffect(() => {
        console.log("Doctor Profile updated");
        fetchClinicData();
    }, [UserDBData]);
    //Fatima's code starts here 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇*************

    const [SelectedClinic, setSelectedClinic] = useState(0)
    const [SelectedClinicID, setSelectedClinicID] = useState()
    // Function to handle the form submission and update the Clinic information
    const handleClinicUpdate = async (event) => {
        event.preventDefault();
        let body = {
            name: event.target[0].value,
            phone: event.target[1].value,
            location: event.target[2].value,
            price: event.target[3].value,
            availableFrom: event.target[4].value,
            availableTo: event.target[5].value
        }
        const formData = new FormData();
        for (let key in body) {
            // Check if the property exists and is not inherited from prototype
            if (body.hasOwnProperty(key)) {
                // Append the property value to FormData with the corresponding key
                const value = body[key];

                // Check if key has a value (not undefined, null, or empty string)
                if (value !== undefined && value !== null && value !== '') {
                    await formData.append(key, value);
                }
                // await formData.append(key, body[key]);
            }
        }
        if (image) {
            await formData.append('file', image);
        }

        console.log(body);
        console.log(formData);
        let res = await axios.put(`https://vetro-server.onrender.com/clinic/${SelectedClinicID}`, formData).catch((err) => {
            console.log(err.response);
            return
        })
        console.log(res);
        console.log(SelectedClinicID);
        // const petRef = doc(db, 'Pets', editingPet.PetID);
        // await updateDoc(petRef, updatedPetInfo);
        // console.log(`Pet ${editingPet.PetID} updated successfully.`);
        setImage(null)
        window.location.reload();
    };


    //*************************👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆************

    return (

        <div className='container mt-3'>
            <div className="row">
                {isOpen ? (
                    <div className='myOverlay d-flex justify-content-center align-items-center'>
                        <div className='container bg-light rounded-5 w-100'>
                            <div className="row text-center">
                                <div className="col-12 d-flex justify-content-between">
                                    <p className='px-3'></p>
                                    <h2 className='py-3' style={{ color: '#71aef3' }}>Edit Info</h2>
                                    <div className='d-flex justify-content-end align-items-center'>
                                        <FontAwesomeIcon onClick={() => { setIsOpen(false); setImageUrl(null) }} className='myClose' icon={fa.faCircleXmark} />
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className='d-flex w-100 justify-content-center'>
                                <label htmlFor="imgUpload">
                                {image ? <img className="avatar-sm circle-round pointer" src={URL.createObjectURL(image)} alt="" /> : <img className="avatar-sm circle-round pointer" src={UserDBData.userPFP} alt="" />}
                                    {/* <img src={imageUrl || UserDBData.userPFP} className='avatar-sm circle-round pointer' alt="" /> */}
                                </label>
                                <input accept="image/*" id='imgUpload' className='d-none' type="file" onChange={handleImageChange} />
                            </div>
                            <form onSubmit={HandleInfoUpdate}>
                                <div className='container' style={{ fontSize: '1.25rem', fontStyle: 'italic', fontFamily: 'arial', color: '#71aef3' }}>

                                    <div className='row py-2 align-items-center'>
                                        <div className='col-sm-2'><span className=''>Name:</span></div>
                                        <div className='col-sm-10'><input className='form-control' type='text' defaultValue={UserDBData.name} /></div>
                                    </div>
                                    <div className='row py-2 align-items-center'>
                                        <div className='col-sm-2'><span className=''>Phone:</span></div>
                                        <div className='col-sm-10'><input className='form-control' type='tel' defaultValue={UserDBData.phoneNumber} /></div>
                                    </div>
                                    <div className='row py-2 pb-2 align-items-center'>
                                        <div className='col-sm-2'><span className=''>Bio:</span></div>
                                        <div className='col-sm-10'><textarea className='form-control' defaultValue={UserDBData.About} style={{ resize: 'none' }} rows='4' /></div>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <button type='submit' className="btn  w-25 py-3 m-3" style={{ background: '#1B85F3', color: 'white' }}>submit</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>

                ) : (
                    <></>
                )
                }

                {/* form for clinic edit */}
                <div>

                    <div className="modal" id="myModal" >
                        <div className="modal-dialog ">
                            <div className="modal-content">
                                {/* Modal Header */}
                                <div className="modal-header ">
                                    <h4 className="modal-title " style={{ color: '#71aef3' }}>Edit Clinic Info</h4>
                                    <button type="button" onClick={() => setImage(null)} className="btn-close" data-bs-dismiss="modal" />
                                </div>
                                {/* Modal body */}
                                <div className="modal-body">
                                    <div className='d-flex w-100 justify-content-center'>
                                        <label htmlFor="imgUpload">
                                            {image ? <img className="avatar-sm circle-round pointer" src={URL.createObjectURL(image)} alt="" /> : <img className="avatar-sm circle-round pointer" src={clinicData[SelectedClinic]?.image} alt="" />}
                                        </label>
                                        <input accept="image/*" id='imgUpload' className='d-none' type="file" onChange={handleImageChange} />
                                    </div>
                                    <form onSubmit={handleClinicUpdate}>
                                        <div className="" style={{ fontSize: '1.25rem', fontStyle: 'italic', fontFamily: 'arial', color: '#71aef3' }}>

                                            <div className="row py-2 align-items-center">
                                                <div className="col-sm-4"><label htmlFor="name">name:</label></div>
                                                <div className="col-sm-8"><input className="form-control" placeholder={clinicData[SelectedClinic]?.clinicName} type="text" /></div>
                                            </div>
                                            <div className="row py-2 align-items-center">
                                                <div className="col-sm-4"><label htmlFor="phone">phone:</label></div>
                                                <div className="col-sm-8"><input className="form-control" placeholder={clinicData[SelectedClinic]?.phoneNumber} type="text" /></div>
                                            </div>
                                            <div className="row py-2 align-items-center">
                                                <div className="col-sm-4"><label htmlFor="location"> location:</label></div>
                                                <div className="col-sm-8"><input className="form-control" placeholder={clinicData[SelectedClinic]?.address} type="text" /></div>
                                            </div>
                                            <div className="row py-2 align-items-center">
                                                <div className="col-sm-4"><label htmlFor="price">price:</label></div>
                                                <div className="col-sm-8"><input className="form-control" placeholder={clinicData[SelectedClinic]?.appointmentPrice} type="text" /></div>
                                            </div>
                                            <div className="row py-2 align-items-center">
                                                <div className="col-sm-4"><label htmlFor="schedule">schedule:</label></div>
                                                <div className="col-sm-8">
                                                    <div className="w-100">
                                                         <span className=" me-3">from</span>
                                                    <select >
                                                        <option value="">select day</option>
                                                        <option value="saturday">saturday</option>
                                                        <option value="sunday">sunday</option>
                                                        <option value="monday">monday</option>
                                                        <option value="tuesday">tuesday</option>
                                                        <option value="wednesday">wednesday</option>
                                                        <option value="thursday">thursday</option>
                                                        <option value="friday">friday</option>
                                                    </select>
                                                    </div>
                                                   <div className="w-100">
                                                    <span className=" me-3">to</span>
                                                    <select defaultValue={null}>
                                                        <option value="">select day</option>
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
                                            </div>
                                        <div className="row py-2 align-items-center">
                                            <div className="col-sm-4"><label htmlFor="availability"> availability:</label></div>
                                            <div className="col-sm-8">
                                                    <div className="w-100">
                                                         <span className=" me-3">from</span>
                                                         <input className="" placeholder={clinicData[SelectedClinic]?.availability} type="time" />
                                                    </div>
                                                   <div className="w-100">
                                                    <span className=" me-3">to</span>
                                                    <input className="" placeholder={clinicData[SelectedClinic]?.availability} type="time" />
                                                   </div>
                                                    
                                                </div>
                                        </div>

                                        <div className='d-flex justify-content-center'>
                                            <button type='submit' className="btn  w-25 py-3 m-3" style={{ background: '#1B85F3', color: 'white' }}>submit</button>
                                        </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
                {/**** *******/ }




    <div className='position-relative'>
        <button onClick={signOutUser} className="btn btn-outline-danger position-absolute mySignOut z-3">Sign Out</button>

        <div className='display row'>
            <div className="card text-center align-items-center w-100 bg-white py-4 rounded shadow">
                <div className="row"  >
                    <div className=""><img src={UserDBData.userPFP} className="avatar circle-round" />
                        <h4>Dr.{UserDBData.name}</h4>
                        {/* <h4>{SelectedClinicID}</h4> */}
                        <div className="about-info d-flex justify-content-center">
                            {/* <div className="py-1 " ><a className='mail' href={`mailto: ${userObj.email}`}>{userObj.email}</a></div> */}
                            <div className='text-warning pe-2'>
                                <FontAwesomeIcon className='' icon={faReg.faStar} />
                                <FontAwesomeIcon className='' icon={faReg.faStar} />
                                <FontAwesomeIcon className='' icon={faReg.faStar} />
                                <FontAwesomeIcon className='' icon={faReg.faStar} />
                                <FontAwesomeIcon className='' icon={faReg.faStar} />
                            </div>
                            <p className='text-secondary'>4.5 (1500 reviews)</p>
                        </div>
                        <div id='about' className='w-100 text-center d-flex align-items-center flex-column'>
                            <p className='w-100 text-secondary'>{UserDBData.About}</p>
                            <p className='w-100 text-secondary'>{UserDBData.phoneNumber}</p>
                        </div>
                        <div className=" py-1">
                            <FontAwesomeIcon onClick={() => setIsOpen(true)} className='btn btn-outline-primary p-2 mb-2' icon={fa.faPenToSquare} />

                        </div>
                        <hr className='w-100' />
                        <div>
                            <h4>
                                Your Clinics
                            </h4>
                        </div>
                    </div>

                    <div className='row w-100 g-3 justify-content-center'>
                        {
                            clinicData.map((clinic, index) => (
                                <div key={index} onClick={() => setSelectedClinic(index)} className="col-4 col-sm-4 col-md-4 col-lg-4 ">
                                    {
                                        clinic.image ? (
                                            <img src={clinic.image} className="profile-pic pointer" />
                                        ) : (
                                            <img src='https://ssniper.sirv.com/Images/clinic.jpg' className="profile-pic pointer" />
                                        )
                                    }
                                </div>

                            ))
                        }

                        <div className='col-4 col-sm-4 col-md-4 col-lg-4'>
                            <Link className="" to="clinic">
                                <button className='btn btn-outline-primary pet-add'>
                                    <FontAwesomeIcon className='' icon={fa.faAdd} />
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>

            </div>
            <div className="card w-100 bg-white rounded shadow pt-3 my-3 mb-5">
                <div className='text-center'><h3 >Clinic Profile</h3></div>
                <div className='d-flex justify-content-center'>
                    {clinicData.length != 0 ? (
                        <div className='w-100 rounded-4 p-4 my-2 mb-4 row justify-content-center'>
                            <div className='col-md-5 align-items-center d-flex'>
                                <div className=''>
                                    <img src={clinicData[SelectedClinic]?.image || 'https://ssniper.sirv.com/Images/clinic.jpg'} className="pet-pic2" />
                                </div>
                                <div className=' ps-3'>
                                    <div className=" align-items-center d-flex" >
                                        <p className='mb-0 me-3'>{clinicData[SelectedClinic]?.clinicName}</p>
                                        <FontAwesomeIcon onClick={() => setSelectedClinicID(clinicData[SelectedClinic]?._id)} data-bs-toggle="modal" data-bs-target="#myModal" className='btn btn-outline-primary p-2' icon={fa.faPenToSquare} />
                                    </div>
                                    {clinicData ? (
                                        <>
                                            {console.log(clinicData)}
                                            <p className='m-0'>Booking price: {clinicData[SelectedClinic]?.appointmentPrice} L.E</p>
                                            <p className='m-0'>schedule: {clinicData[SelectedClinic]?.schedule}</p>
                                            <p className='m-0'>Available from: {clinicData[SelectedClinic]?.availability}</p>
                                        </>
                                    ) : (<></>)
                                    }
                                </div>
                            </div>
                            <div className='col-md-7 '>
                                <div className='w-100 MyLeftBorder'>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6 className='mb-0 text-secondary'>Clinic Name</h6>
                                        <span className='me-5 title'>{clinicData[SelectedClinic]?.clinicName}</span>
                                    </div>
                                    <hr className='my-2' />
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6 className='mb-0 text-secondary'>Clinic phone number</h6>
                                        <span className='me-5 title'>{clinicData[SelectedClinic]?.phoneNumber}</span>
                                    </div>
                                    <hr className='my-2' />
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6 className='mb-0 text-secondary'>Booking price</h6>
                                        <span className='me-5 title'>{clinicData[SelectedClinic]?.appointmentPrice}</span>
                                    </div>

                                </div>
                            </div>



                        </div>
                    ) : (
                        <>no clinics? <Link className="ms-1" to="clinic">add one</Link></>

                    )}

                </div>


            </div>
        </div>

    </div>
            </div >
        </div >
    )
}
// samy was here

