
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'
import { collection, doc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db, storage, ref, uploadBytes, getDownloadURL } from '../Firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons'
import * as faReg from '@fortawesome/free-regular-svg-icons'
import shoes from '../images/shoes.jpg'


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
    const fetchClinicData = async () => {
        try {
            const response = collection(db, 'Clinics');
            const q = query(response, where("DoctorId", "==", usersRef.id)); // Assuming userId property in Clinics collection
            const data = await getDocs(q);
            const clinicDataArray = data.docs.map(doc => {
                const clinicData = doc.data();
                clinicData.clinicID = doc.id;
                return clinicData
            });
            setClinicData(clinicDataArray);
            console.log(clinicDataArray);
        } catch (error) {
            console.error("Error fetching clinic data:", error);
        }
    };

    const HandleInfoUpdate = async (event) => {
        let newUserInfo = {
            userName: event.target[0].value,
            phoneNumber: event.target[1].value,
            About: event.target[2].value
        }
        if (imageUrl) {
            newUserInfo.userPFP = imageUrl
        }
        console.log(newUserInfo);
        await updateDoc(usersRef, newUserInfo)
        setIsOpen(false)
        setImageUrl(null)
        window.location.reload();
    }
    const handleImageChange = async (e) => {
        setPending(true)

        if (e.target.files[0]) {
            // await setImage(e.target.files[0]);
            const img = await e.target.files[0]
            handleImageUpload(img)
        } else {
            setPending(false)
        }
    };
    const handleImageUpload = (image) => {
        console.log("lol ya negm");
        if (image) {
            console.log(image);
            const storageRef = ref(storage, `images/${image.name}`);
            uploadBytes(storageRef, image)
                .then((snapshot) => {
                    // Image uploaded successfully, get download URL
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        setImageUrl(downloadURL);
                        console.log('File available at', downloadURL);
                        setPending(false)

                        // You can use downloadURL here or set it to state for later use
                    });
                })
                .catch((error) => {
                    setPending(false)
                    // Handle any errors here
                    console.error('Error uploading image: ', error);
                });
        }
    }
    useEffect(() => {
        console.log("Doctor Profile updated");
        fetchClinicData();
    }, [usersRef.id]);
    //Fatima's code starts here 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇*************

    const [SelectedClinic, setSelectedClinic] = useState(0)
    const [SelectedClinicID, setSelectedClinicID] = useState()
    // Function to handle the form submission and update the Clinic information
    const handleClinicUpdate = async (event) => {
        event.preventDefault();
        const updatedClinicInfo = {
            name: event.target[0].value,
            phone: event.target[1].value,
            location: event.target[2].value,
            price: event.target[3].value,
            availableFrom: event.target[4].value,
            availableTo: event.target[5].value
        };

        if (imageUrl) {
            updatedClinicInfo.image = imageUrl
        }

        const ClinicRef = doc(db, 'Clinics', SelectedClinicID);
        await updateDoc(ClinicRef, updatedClinicInfo);
        console.log(`Clinic${SelectedClinicID} updated successfully.`);
        setImageUrl(null)
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
                                        <h2 className='py-3' style={{color:'#71aef3'}}>Edit Info</h2>
                                        <div className='d-flex justify-content-end align-items-center'>
                                            <FontAwesomeIcon onClick={() => {setIsOpen(false);setImageUrl(null)}} className='myClose' icon={fa.faCircleXmark} />
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                                <div className='d-flex w-100 justify-content-center'>
                                    <label htmlFor="imgUpload">
                                        <img src={imageUrl || UserDBData.userPFP} className='avatar-sm circle-round pointer' alt="" />
                                    </label>
                                    <input accept="image/*" id='imgUpload' className='d-none' type="file" onChange={handleImageChange} />
                                </div>
                                <form onSubmit={HandleInfoUpdate}>
                                    <div className='container' style={{ fontSize: '1.25rem', fontStyle: 'italic', fontFamily: 'arial',color:'#71aef3'  }}>

                                        <div className='row py-2 align-items-center'>
                                            <div className='col-sm-2'><span className=''>Name:</span></div>
                                            <div className='col-sm-10'><input className='form-control' type='text' defaultValue={UserDBData.userName} /></div>
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
                                            <button type='submit' className="btn  w-25 py-3 m-3" style={{background:'#1B85F3' , color:'white'}}>submit</button>
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
                                        <h4 className="modal-title "  style={{color:'#71aef3'}}>Edit Clinic Info</h4>
                                        <button type="button" onClick={()=>setImageUrl(null)} className="btn-close" data-bs-dismiss="modal" />
                                    </div>
                                    {/* Modal body */}
                                    <div className="modal-body">
                                        <div className='d-flex w-100 justify-content-center'>
                                            <label htmlFor="imgUpload">
                                                <img src={imageUrl || clinicData[SelectedClinic]?.image} className='avatar-sm circle-round pointer' alt="" />
                                            </label>
                                            <input accept="image/*" id='imgUpload' className='d-none' type="file" onChange={handleImageChange} />
                                        </div>
                                        <form onSubmit={handleClinicUpdate}>
                                            <div className="" style={{ fontSize: '1.25rem', fontStyle: 'italic', fontFamily: 'arial' ,color:'#71aef3' }}>
                                                
                                                <div className="row py-2 align-items-center">
                                                    <div className="col-sm-4"><label htmlFor="name">Name:</label></div>
                                                    <div className="col-sm-8"><input className="form-control" defaultValue={clinicData[SelectedClinic]?.name} type="text" /></div>
                                                </div>
                                                <div className="row py-2 align-items-center">
                                                    <div className="col-sm-4"><label htmlFor="phone">phone:</label></div>
                                                    <div className="col-sm-8"><input className="form-control" defaultValue={clinicData[SelectedClinic]?.phone} type="text" /></div>
                                                </div>
                                                <div className="row py-2 align-items-center">
                                                    <div className="col-sm-4"><label htmlFor="location"> location:</label></div>
                                                    <div className="col-sm-8"><input className="form-control" defaultValue={clinicData[SelectedClinic]?.location} type="text" /></div>
                                                </div>
                                                <div className="row py-2 align-items-center">
                                                    <div className="col-sm-4"><label htmlFor="price">price:</label></div>
                                                    <div className="col-sm-8"><input className="form-control" defaultValue={clinicData[SelectedClinic]?.price} type="text" /></div>
                                                </div>
                                                <div className="row py-2 align-items-center">
                                                    <div className="col-sm-4"><label htmlFor="availableFrom">availableFrom:</label></div>
                                                    <div className="col-sm-8"><input className="form-control" defaultValue={clinicData[SelectedClinic]?.availableFrom} type="time" /></div>
                                                </div>
                                                <div className="row py-2 align-items-center">
                                                    <div className="col-sm-4"><label htmlFor="availableTo"> availableTo:</label></div>
                                                    <div className="col-sm-8"><input className="form-control" defaultValue={clinicData[SelectedClinic]?.availableTo} type="time" /></div>
                                                </div>

                                                <div className='d-flex justify-content-center'>
                                                    <button type='submit' className="btn  w-25 py-3 m-3" style={{background:'#1B85F3' , color:'white'}}>submit</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/**** *******/}




                    <div className='position-relative'>
                        <button onClick={signOutUser} className="btn btn-outline-danger position-absolute mySignOut z-3">Sign Out</button>

                        <div className='display row'>
                            <div className="card text-center align-items-center w-100 bg-white py-4 rounded shadow">
                                <div className="row"  >
                                    <div className=""><img src={UserDBData.userPFP} className="avatar circle-round" />
                                        <h4>Dr.{UserDBData.userName}</h4>
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
                                        <div id='about' className='w-100 text-center d-flex justify-content-center'>
                                            <p className='w-50 text-secondary'>{UserDBData.About}</p>
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

                                    <div className='row justify-content-center'>
                                        {
                                            clinicData.map((clinic, index) => (
                                                <div key={index} onClick={() => setSelectedClinic(index)} className="col-4 col-sm-4 col-md-4 col-lg-4 ">
                                                    {
                                                        clinic.image ? (
                                                            <img src={clinic.image} className="profile-pic pointer" />
                                                        ) : (
                                                            <img src={shoes} className="profile-pic pointer" />
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
                            <div className="card w-100 bg-white rounded shadow pt-3 my-3">
                                <div className='text-center'><h3 >Clinic Profile</h3></div>
                                <div className='d-flex justify-content-center'>
                                    {clinicData.length != 0?(
                                        <div className='w-100 rounded-4 p-4 my-2 mb-4 row justify-content-center'>
                                        <div className='col-md-5 align-items-center d-flex'>
                                            <div className=''>
                                                <img src={clinicData[SelectedClinic]?.image} className="pet-pic2" />
                                            </div>
                                            <div className=' ps-3'>
                                                <div className=" align-items-center d-flex" >
                                                    <p className='mb-0 me-3'>{clinicData[SelectedClinic]?.name}</p>
                                                    <FontAwesomeIcon onClick={() => setSelectedClinicID(clinicData[SelectedClinic]?.clinicID)} data-bs-toggle="modal" data-bs-target="#myModal" className='btn btn-outline-primary p-2' icon={fa.faPenToSquare} />
                                                </div>
                                                {clinicData ? (
                                                    <>
                                                        {console.log(clinicData)}
                                                        <p className='m-0'>Booking price: {clinicData[SelectedClinic]?.price} L.E</p>
                                                        <p className='m-0'>Clinic phone number: {clinicData[SelectedClinic]?.phone}</p></>
                                                ) : (<></>)
                                                }
                                            </div>
                                        </div>
                                        <div className='col-md-7 '>
                                            <div className='w-100 MyLeftBorder'>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className='mb-0 text-secondary'>Clinic Name</h6>
                                                    <span className='me-5 title'>{clinicData[SelectedClinic]?.name}</span>
                                                </div>
                                                <hr className='my-2' />
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className='mb-0 text-secondary'>Clinic phone number</h6>
                                                    <span className='me-5 title'>{clinicData[SelectedClinic]?.phone}</span>
                                                </div>
                                                <hr className='my-2' />
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className='mb-0 text-secondary'>Booking price</h6>
                                                    <span className='me-5 title'>{clinicData[SelectedClinic]?.price}</span>
                                                </div>

                                            </div>
                                        </div>



                                    </div>
                                    ):(
                                        <>no clinics? <Link className="ms-1" to="clinic">add one</Link></>
                                        
                                    )}
                                    
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
    )
}
// samy was here

