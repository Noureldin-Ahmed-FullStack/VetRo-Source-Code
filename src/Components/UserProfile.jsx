
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link, useNavigate } from 'react-router-dom'
// import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
// import { db, storage, ref, uploadBytes, getDownloadURL } from '../Firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


export default function UserProfile() {

    const [image, setImage] = useState(null);
    const [pending, setPending] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const token = localStorage.getItem('token');
    const headers = {
        'token': token,
    };
    const [SelectedPet, setSelectedPet] = useState(0)
    const [SelectedPetID, setSelectedPetID] = useState()
    const { signOutUser } = UseFirebaseAuth();
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const [isOpen, setIsOpen] = useState(false)
    // const [PostText, setPostText] = useState("")

    let navigate = useNavigate()
    const signOut = () => {
        signOutUser()
        navigate('/signin')
    }


    /*For Pets data */
    const [PetsData, setPetsData] = useState(UserDBData.pets);
    // const usersRef = doc(db, "Users", userObj.uid);
    // const fetchPetsData = async () => {
    //     try {
    //         // const response = collection(db, 'Pets');
    //         // const q = query(response, where("userID", "==", usersRef.id)); // Assuming userId property in Pets collection
    //         // const data = await getDocs(q);
    //         // console.log("pet data " + data);
    //         // const PetsDataArray = data.docs.map(doc => {
    //         //     const petData = doc.data();
    //         //     petData.PetID = doc.id;
    //         //     return petData
    //         // });
    //         console.log(UserDBData?.pets);
    //         setPetsData(UserDBData?.pets);
    //     } catch (error) {
    //         console.error("Error fetching PETS data:", error);
    //     }
    // };


    const HandleInfoUpdate = async (event) => {
        let body = {
            name: event.target[0].value,
            phoneNumber: event.target[1].value,
            About: event.target[2].value
        }
        const formData = new FormData();
        for (let key in body) {
            // Check if the property exists and is not inherited from prototype
            if (body.hasOwnProperty(key)) {
                // Append the property value to FormData with the corresponding key
                await formData.append(key, body[key]);
            }
        }
        if (image) {
            await formData.append('file', image);
        }
        console.log(formData);
        let res = await axios.put(`http://localhost:3000/user/${userObj.uid}`, formData, { headers: headers }).catch((err) => {
            console.log(err.response);
            return
        })
        // await updateDoc(usersRef, newUserInfo)
        console.log(body);
        console.log(formData);
        setIsOpen(false)
        setImageUrl(null)
        window.location.reload();
    }
    // useEffect(() => {
    //     console.log("user component updated");
    //     // fetchPetsData();
    // }, [usersRef.id]);

    //Image Update 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇*************
    const handleImageChange = async (e) => {
        setPending(true)

        if (e.target.files[0]) {
            // await setImage(e.target.files[0]);
            await setImage(e.target.files[0]);
            setPending(false)
        } else {
            setPending(false)
        }
    };




    const [Open, setOpen] = useState(false)
    const [editingPet, setEditingPet] = useState(null);

    // Function to handle the form submission and update the pet information
    const handlePetUpdate = async (event) => {
        event.preventDefault();
        let body = {
            petName: event.target[0].value,
            age: event.target[1].value,
            gender: event.target[2].value,
            type: event.target[3].value,
            breed: event.target[4].value,
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
        let res = await axios.put(`http://localhost:3000/pet/${SelectedPetID}`, formData).catch((err) => {
            console.log(err.response);
            return
        })
        console.log(res);
        console.log(SelectedPetID);
        // const petRef = doc(db, 'Pets', editingPet.PetID);
        // await updateDoc(petRef, updatedPetInfo);
        // console.log(`Pet ${editingPet.PetID} updated successfully.`);
        setOpen(false);
        setImage(null)
        window.location.reload();
    };



    return (


        <div className='container mt-4'>

            {/* form for clinic edit */}
            <div>

                <div className="modal" id="petModal" >
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header ">
                                <h4 className="modal-title " style={{ color: '#71aef3' }}>Edit pet Info</h4>
                                <button type="button" onClick={() => setImage(null)} className="btn-close" data-bs-dismiss="modal" />
                            </div>
                            {/* Modal body */}
                            <div className="modal-body">
                                <div className='d-flex w-100 justify-content-center'>
                                    <label htmlFor="imgUpload">
                                        <img src={ PetsData[SelectedPet]?.image} className='avatar-sm circle-round pointer' alt="" />
                                    </label>
                                    <input accept="image/*" id='imgUpload' className='d-none' type="file" onChange={handleImageChange} />
                                </div>
                                <form onSubmit={handlePetUpdate}>
                                    <div className="" style={{ fontSize: '1.25rem', fontStyle: 'italic', fontFamily: 'arial', color: '#71aef3' }}>

                                        <div className="row py-2 align-items-center">
                                            <div className="col-sm-4"><label htmlFor="name">Name:</label></div>
                                            <div className="col-sm-8"><input className="form-control" placeholder ={ PetsData[SelectedPet]?.petName} type="text" /></div>
                                        </div>
                                        <div className="row py-2 align-items-center">
                                            <div className="col-sm-4"><label htmlFor="age">age:</label></div>
                                            <div className="col-sm-8"><input className="form-control" placeholder ={PetsData[SelectedPet]?.age} type="number" /></div>
                                        </div>
                                        <div className="row py-2 align-items-center">
                                            <div className="col-sm-4"><label htmlFor="gender"> gender:</label></div>
                                            <div className="col-sm-8">
                                                <select value ={PetsData[SelectedPet]?.gender} onChange={()=> console.log(PetsData[SelectedPet]?.gender)}>
                                                    <option value="male">male</option>
                                                    <option value="female">female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row py-2 align-items-center">
                                            <div className="col-sm-4"><label htmlFor="price">type:</label></div>
                                            <div className="col-sm-8">
                                                <select value ={PetsData[SelectedPet]?.type} onChange={()=> console.log(PetsData[SelectedPet]?.type)}>
                                                    <option value="dog">dog</option>
                                                    <option value="cat">cat</option>
                                                    <option value="bird">bird</option>
                                                    <option value="other">other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row py-2 align-items-center">
                                            <div className="col-sm-4"><label htmlFor="breed">breed:</label></div>
                                            <div className="col-sm-8"><input className="form-control" placeholder={PetsData[SelectedPet]?.breed} type="text" /></div>
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
            {/**** *******/}
            <div className="row">
                <>
                    {isOpen ? (
                        <div className='myOverlay d-flex justify-content-center align-items-center'>
                            <div className='container bg-light rounded-5 w-100'>
                                <div className="row text-center">
                                    <div className="col-12 d-flex justify-content-between">
                                        <p className='px-3'></p>
                                        <h2 className='py-3' style={{ color: '#71aef3' }}><b>Edit Info</b></h2>
                                        <div className='d-flex justify-content-end align-items-center'>
                                            <FontAwesomeIcon onClick={() => setIsOpen(false)} className='myClose' icon={fa.faCircleXmark} />
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
                                            <div className='col-sm-10'><input className='form-control' type='tel' defaultValue={UserDBData.phonNumber} /></div>
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
                    {/* form for pet edit */}

                    
                    {/* ******************** */}
                    <div className='position-relative'>
                        <button onClick={signOut} className="btn btn-outline-danger position-absolute mySignOut z-3">Sign Out</button>

                        <div className='display row '>
                            <div className="card text-center align-items-center w-100 bg-white py-4 rounded shadow">
                                <div className="row"  >
                                    <div className=""><img src={UserDBData.userPFP} className="avatar circle-round" />
                                        {/* {console.log(UserDBData.pets[0].petRef._key.path.segments[6])} */}
                                        {/* {console.log(UserDBData.pets[0])} */}</div>
                                    <div className="about-info my-2">
                                        <h4 >{UserDBData.name}</h4>
                                        <div className="py-1 " ><a className='mail' href={`mailto: ${userObj.email}`}>{userObj.email}</a></div>
                                        <p>{UserDBData.About}</p>
                                    </div>
                                    <div className=" py-1">
                                        <FontAwesomeIcon onClick={() => setIsOpen(true)} className='btn btn-outline-primary p-2 mb-2' icon={fa.faPenToSquare} />

                                    </div>
                                    <hr className='w-100' />
                                    <div>
                                        <h4>
                                            Your Pets
                                        </h4>
                                    </div>
                                </div>

                                {/* {console.log(UserDBData.pets[0].petRef._key.path.segments[6])} */}
                                {/* {console.log(UserDBData.pets[0])} */}
                                <div className='row gy-3 justify-content-center'>
                                    {
                                        PetsData.map((pets, index) => (
                                            <div key={index} onClick={() => setSelectedPet(index)} className="col-4 col-sm-4 col-md-4 col-lg-4 ">
                                                {
                                                    pets.image ? (
                                                        <img src={pets.image} className="profile-pic pointer" />
                                                    ) : (
                                                        <img src='https://t4.ftcdn.net/jpg/01/18/91/73/360_F_118917333_uEdOfPd69Hiqi3q69KUWnU6YCpUgG1v1.jpg' className="profile-pic pointer" />
                                                    )
                                                }
                                            </div>

                                        ))
                                    }

                                    <div className='col-4 col-sm-4 col-md-4 col-lg-4'>
                                        <Link className="" to="Pets">
                                            <button className='btn btn-outline-primary pet-add'>
                                                <FontAwesomeIcon className='' icon={fa.faAdd} />
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                            <div className="card w-100 bg-white rounded shadow pt-3 mt-3">
                                <div className='text-center'><h3 >Pet Profile</h3></div>
                                <div className='d-flex justify-content-center'>
                                    {PetsData.length != 0 ? (
                                        <div className='w-100 rounded-4 p-4 my-2 mb-4 row justify-content-center'>
                                            <div className='col-md-5 align-items-center d-flex'>
                                                <div className=''>
                                                    <img src={PetsData[SelectedPet]?.image || 'https://t4.ftcdn.net/jpg/01/18/91/73/360_F_118917333_uEdOfPd69Hiqi3q69KUWnU6YCpUgG1v1.jpg'} className="pet-pic2" />
                                                </div>
                                                <div className=' ps-3'>
                                                    <div className=" align-items-center d-flex" >
                                                        <p className='mb-0 me-3'>{PetsData[SelectedPet]?.petName}</p>
                                                        <FontAwesomeIcon onClick={()=>setSelectedPetID(PetsData[SelectedPet]?._id)} data-bs-toggle="modal" data-bs-target="#petModal" className='btn btn-outline-primary p-2' icon={fa.faPenToSquare} />
                                                    </div>
                                                    {PetsData ? (
                                                        <p>{PetsData[SelectedPet]?.type}: {PetsData[SelectedPet]?.breed}</p>
                                                    ) : (<></>)
                                                    }
                                                </div>
                                            </div>
                                            <div className='col-md-7 '>
                                                <div className='w-100 MyLeftBorder'>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className='mb-0 text-secondary'>gender</h6>
                                                        <span className='me-5 title'>{PetsData[SelectedPet]?.gender}</span>
                                                    </div>
                                                    <hr className='my-2' />
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className='mb-0 text-secondary'>age</h6>
                                                        <span className='me-5 title'>{PetsData[SelectedPet]?.age}</span>
                                                    </div>
                                                    <hr className='my-2' />
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className='mb-0 text-secondary'>breed</h6>
                                                        <span className='me-5 title'>{PetsData[SelectedPet]?.breed}</span>
                                                    </div>

                                                </div>
                                            </div>



                                        </div>

                                    ) : (
                                        <>no pets? <Link className="ms-1" to="Pets">add some</Link></>
                                    )}
                                </div>


                            </div>
                        </div>
                    </div>
                </>

            </div>
        </div>
    )
}
