
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link, useNavigate } from 'react-router-dom'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db, storage, ref, uploadBytes, getDownloadURL } from '../Firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons'
import tomatto from '../images/tomatto.jpg'
import shoes from '../images/shoes.jpg'


export default function UserProfile() {

    const [image, setImage] = useState(null);
    const [pending, setPending] = useState(false);
    const [imageUrl, setImageUrl] = useState();

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
    const [PetsData, setPetsData] = useState([]);
    const usersRef = doc(db, "Users", userObj.uid);
    const fetchPetsData = async () => {
        try {
            const response = collection(db, 'Pets');
            const q = query(response, where("userID", "==", usersRef.id)); // Assuming userId property in Pets collection
            const data = await getDocs(q);
            console.log("pet data " + data);
            const PetsDataArray = data.docs.map(doc => {
                const petData = doc.data();
                petData.PetID = doc.id;
                return petData
            });
            setPetsData(PetsDataArray);
        } catch (error) {
            console.error("Error fetching PETS data:", error);
        }
    };

    const HandleInfoUpdate = async (event) => {
        let newUserInfo = {
            userName: event.target[0].value,
            phonNumber: event.target[1].value,
            About: event.target[2].value
        }
        if (imageUrl) {
            newUserInfo.userPFP = imageUrl
        }
        await updateDoc(usersRef, newUserInfo)
        setIsOpen(false)
        setImageUrl(null)
        window.location.reload();
    }
    useEffect(() => {
        console.log("user component updated");
        fetchPetsData();
    }, [usersRef.id]);

    //Image Update 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇*************
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
    //img update 👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆*************



    //Fatima's code starts here 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇*************
    const [Open, setOpen] = useState(false)
    const [editingPet, setEditingPet] = useState(null);
    const EditPetData = (petId) => {
        const pet = PetsData.find(pet => pet.PetID === petId);
        if (pet) {
            setEditingPet(pet);
            setOpen(true);
        } else {
            console.error('Pet not found:', petId);
        }
    };

    // Function to handle the form submission and update the pet information
    const handlePetUpdate = async (event) => {
        event.preventDefault();
        const updatedPetInfo = {
            Name: event.target[0].value,
            Age: event.target[1].value,
            Gender: event.target[2].value,
            Breed: event.target[3].value,
            Type: event.target[4].value
        };
        

        if (imageUrl) {
            updatedPetInfo.image = imageUrl
        }
        const petRef = doc(db, 'Pets', editingPet.PetID);
        await updateDoc(petRef, updatedPetInfo);
        console.log(`Pet ${editingPet.PetID} updated successfully.`);
        setOpen(false);
        setImageUrl(null)
        window.location.reload();
    };
    //*************************👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆************



    return (


        <div className="card w-100 p-3 mt-2 myBottomMargin">
            <div className='container'>
                <div className="row">
                    <>
                        {isOpen ? (
                            <div className='myOverlay d-flex justify-content-center align-items-center'>
                                <div className='container bg-light rounded-5 w-100'>
                                    <div className="row text-center">
                                        <div className="col-12 d-flex justify-content-between">
                                            <p className='px-3'></p>
                                            <h2 className='py-3'><b>Edit Info</b></h2>
                                            <div className='d-flex justify-content-end align-items-center'>
                                                <FontAwesomeIcon onClick={() => setIsOpen(false)} className='myClose' icon={fa.faCircleXmark} />
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
                                        <div className='container' style={{ fontSize: '1.25rem', fontStyle: 'italic', fontFamily: 'arial' }}>
                                            <div className='row py-2 align-items-center'>
                                                <div className='col-sm-2'><span className=''>Name:</span></div>
                                                <div className='col-sm-10'><input className='form-control' type='text' defaultValue={UserDBData.userName} /></div>
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
                                                <button type='submit' className="btn btn-outline-success w-25 py-3 m-3">submit</button>
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

                        {Open && editingPet ? (
                            <div className='myOverlay d-flex justify-content-center align-items-center'>
                                <div className='container bg-light rounded-5 w-100'>
                                    <div className="row text-center">
                                        <div className="col-12 d-flex justify-content-between">
                                            <p className='px-3'></p>
                                            <h2 className='py-3'><b>Edit Pet Info</b></h2>
                                            <div className='d-flex justify-content-end align-items-center'>
                                                <FontAwesomeIcon onClick={() => {setOpen(false);setImageUrl(null)}} className='myClose' icon={fa.faCircleXmark} />
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                    <div className='d-flex w-100 justify-content-center'>
                                            <label htmlFor="imgUpload">
                                                <img src={imageUrl || PetsData[SelectedPet]?.image} className='avatar-sm circle-round pointer' alt="" />
                                            </label>
                                            <input accept="image/*" id='imgUpload' className='d-none' type="file" onChange={handleImageChange} />
                                        </div>
                                    <form onSubmit={handlePetUpdate}>

                                        <div className='container' style={{ fontSize: '1.25rem', fontStyle: 'italic', fontFamily: 'arial' }}>
                                            
                                            <div className='row py-2 align-items-center'>
                                                <div className='col-sm-2'><label htmlFor='name'>Name:</label></div>
                                                <div className='col-sm-10'><input className='form-control' type='text' defaultValue={PetsData[SelectedPet]?.Name} /></div>
                                                {/* */}
                                            </div>
                                            <div className='row py-2 align-items-center'>
                                                <div className='col-sm-2'><label htmlFor='Age'>Age</label></div>
                                                <div className='col-sm-10'><input className='form-control' type='text' defaultValue={PetsData[SelectedPet]?.Age} /></div>

                                            </div>
                                            <div className='row py-2 align-items-center'>
                                                <div className='col-sm-2'><label htmlFor='Gender'>Gender</label></div>
                                                <div className='col-sm-10'><input className='form-control' type='text' defaultValue={PetsData[SelectedPet]?.Gender} /></div>

                                            </div>
                                            <div className='row py-2 align-items-center'>
                                                <div className='col-sm-2'><label htmlFor='Breed'> Breed</label></div>
                                                <div className='col-sm-10'><input className='form-control' type='text' defaultValue={PetsData[SelectedPet]?.Breed} /></div>

                                            </div>

                                            <div className='row py-2 align-items-center'>
                                                <div className='col-sm-2'><label htmlFor='Type'> Type</label></div>
                                                <div className='col-sm-10'><input className='form-control' type='text' defaultValue={PetsData[SelectedPet]?.Type} /></div>

                                            </div>
                                            <div className='d-flex justify-content-center'>
                                                <button type='submit' className="btn btn-outline-success py-3 m-3">submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        ) : (
                            <></>
                        )

                        }

                        {/* ******************** */}
                        <div className='position-relative'>
                            <button onClick={signOut} className="btn btn-outline-danger position-absolute mySignOut z-3">Sign Out</button>

                            <div className='display row'>
                                <div className="card text-center align-items-center w-100 bg-white py-4 rounded shadow">
                                    <div className="row"  >
                                        <div className=""><img src={UserDBData.userPFP} className="avatar circle-round" />
                                            {/* {console.log(UserDBData.pets[0].petRef._key.path.segments[6])} */}
                                            {/* {console.log(UserDBData.pets[0])} */}</div>
                                        <div className="about-info my-2">
                                            <h4 >{UserDBData.userName}</h4>
                                            <div className="py-1 " ><a className='mail' href={`mailto: ${userObj.email}`}>{userObj.email}</a></div>
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
                                                            <img src={shoes} className="profile-pic pointer" />
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
                                        <div className='w-100 rounded-4 p-4 my-2 mb-4 row justify-content-center'>
                                            <div className='col-md-5 align-items-center d-flex'>
                                                <div className=''>
                                                    <img src={PetsData[SelectedPet]?.image} className="pet-pic2" />
                                                </div>
                                                <div className=' ps-3'>
                                                    <div className=" align-items-center d-flex" >
                                                        <p className='mb-0 me-3'>{PetsData[SelectedPet]?.Name}</p>
                                                        <FontAwesomeIcon onClick={() => EditPetData(PetsData[SelectedPet]?.PetID)} className='btn btn-outline-primary p-2' icon={fa.faPenToSquare} />
                                                    </div>
                                                    {PetsData ? (
                                                        <p>{PetsData[SelectedPet]?.Type}: {PetsData[SelectedPet]?.Breed}</p>
                                                    ) : (<></>)
                                                    }
                                                </div>
                                            </div>
                                            <div className='col-md-7 '>
                                                <div className='w-100 MyLeftBorder'>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className='mb-0 text-secondary'>gender</h6>
                                                        <span className='me-5 title'>{PetsData[SelectedPet]?.Gender}</span>
                                                    </div>
                                                    <hr className='my-2' />
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className='mb-0 text-secondary'>age</h6>
                                                        <span className='me-5 title'>{PetsData[SelectedPet]?.Age}</span>
                                                    </div>
                                                    <hr className='my-2' />
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className='mb-0 text-secondary'>breed</h6>
                                                        <span className='me-5 title'>{PetsData[SelectedPet]?.Breed}</span>
                                                    </div>

                                                </div>
                                            </div>



                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </>

                </div>
            </div>
        </div>
    )
}
