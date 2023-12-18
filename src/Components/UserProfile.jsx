
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons'
import tomatto from '../images/tomatto.jpg'
import shoes from '../images/shoes.jpg'


export default function UserProfile() {

    const { signOutUser } = UseFirebaseAuth();
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const [isOpen, setIsOpen] = useState(false)
    // const [PostText, setPostText] = useState("")


    /*For Pets data */
    const [PetsData, setPetsData] = useState([]);
    const usersRef = doc(db, "Users", userObj.uid);
    const fetchPetsData = async () => {
        try {
            const response = collection(db, 'Pets');
            const q = query(response, where("userID", "==", usersRef.id)); // Assuming userId property in Pets collection
            const data = await getDocs(q);
            const PetsDataArray = data.docs.map(doc => doc.data());
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
        await updateDoc(usersRef, newUserInfo)
        setIsOpen(false)
        window.location.reload();
    }
    const petClick = (index) => {
        console.log("click");
        console.log(index);
    }
    useEffect(() => {
        console.log("user component updated");
        fetchPetsData();
    }, [usersRef.id]);







    return (


        <div  className="card w-100 p-3 mt-2 myBottomMargin">
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
                        {/* <div className="col-sm-12">
                <div className="box-shadow-full">
                    <div className="row">
                        <div className="col-md-5 wow BounceInLeft" data-wow-offset={200} style={{ visibility: 'visible', animationName: 'bounceInLeft' }}>
                            <div className="row">
                                <div className="col-sm-6 col-md-5 About ">
                                    <div>
                                        <img id="img" src={UserDBData.userPFP} className="img-fluid rounded b-shadow-a w-100" />

                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-7 About">
                                    <div className="about-info my-2">
                                        <p><span style={{ fontWeight: 'bolder' }} className="title-s">Name: </span> <span>{UserDBData.userName}</span></p>

                                        <div className="d-flex align-content-center pb-3"><div style={{ fontWeight: 'bolder' }} className="">Email: </div>
                                            <div className='w-100'><a className='wordBreaker' href="mailto: noureldin2662002@gmail.com">{UserDBData.email}</a></div>
                                        </div>
                                        <p><span style={{ fontWeight: 'bolder' }} className="title-s">Phone: </span> <a href="tel:+201116074576">{UserDBData.phonNumber}</a></p>
                                    </div>
                                    <div>
                                        <button onClick={() => setIsOpen(true)} className='btn btn-danger'>Edit Info</button>
                                    </div>
                                </div>
                            </div>
                            <div className="skill-mf my-2 wow bounceInUp" data-wow-offset={150} style={{ visibility: 'visible', animationName: 'bounceInUp' }}>
                                {/*display data of Pets*/}
                        {/* <h4>Pets Data:</h4> */}
                        {/* {
                                    PetsData.map((pets, index) => (
                                        <div key={index}>
                                            <p><b>Name:</b> {pets.Name}</p>
                                            <p><b>Age:</b> {pets.Age}</p>
                                            <p><b>Type:</b> {pets.Type}</p>
                                            <p><b>Gender:</b> {pets.Gender}</p>
                                            <p><b>Breed:</b> {pets.Breed}</p>

                                        </div>
                                    ))
                                }


*/}



                        {/*  
                            </div>
                        </div>
                        <div className="col-md-1" />
                        <div className="col-md-6 wow BounceInRight" data-wow-offset={200} style={{ visibility: 'visible', animationName: 'bounceInRight' }}>
                            <div className="about-me pt-4 pt-md-0">
                                <div className="title-box-2">
                                    <h5 className="title-left lul-title">
                                        About me
                                    </h5>
                                </div>
 */}
                        {/* {UserDBData.About} */}
                        {/* {UserDBData.About ? (
                                    <p className="lead" >{UserDBData.About}</p>
                                ) : (
                                    <p className='lead'>This is your about 😎</p>
                                )} */}

                        {/* <div className="title-box-2">
                                    <h5 className="title-left lul-title">
                                        Pets
                                    </h5>
                                </div>
                                <div>
                                    <Link className="btn btn-info my-2" to="Pets">Add Pet</Link>

                                </div>
                                <button id="cvBtn" className="btn btn-warning text-light MyOrangeBg w-100">Download CV</button>
                                <button onClick={signOutUser} className="btn btn-warning text-light MyOrangeBg w-100 mt-4">Sign Out</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
             */}





                        {/* ******************** */}
                        <div className='position-relative'>
                            <button onClick={signOutUser} className="btn btn-outline-danger position-absolute mySignOut z-3">Sign Out</button>

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
                                    <div className='row justify-content-center'>
                                        {
                                            PetsData.map((pets, index) => (
                                                <div key={index} onClick={() => console.log(pets)} className="col-4 col-sm-4 col-md-4 col-lg-4 ">
                                                    {/* <p><b>Name:</b> {pets.Name}</p>
                                        <p><b>Age:</b> {pets.Age}</p>
                                        <p><b>Type:</b> {pets.Type}</p>
                                        <p><b>Gender:</b> {pets.Gender}</p>
                                        <p><b>Breed:</b> {pets.Breed}</p> */}
                                                    <img src={pets.image} className="profile-pic pointer" />
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
                                                    <img src={PetsData[0]?.image} className="pet-pic2" />
                                                </div>
                                                <div className=' ps-3'>
                                                    <div className=" align-items-center d-flex" >
                                                        <p className='mb-0 me-3'>{PetsData[0]?.Name}</p>
                                                        <FontAwesomeIcon className='btn btn-outline-primary p-2' icon={fa.faPenToSquare} />
                                                    </div>
                                                    {PetsData?(
                                                        <p>{PetsData[0].Type}: {PetsData[0].Breed}</p>
                                                    ):(<></>)
                                                    }
                                                </div>
                                            </div>
                                            <div className='col-md-7 '>
                                                <div className='w-100 MyLeftBorder'>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className='mb-0 text-secondary'>gender</h6>
                                                        <span className='me-5 title'>{PetsData[0]?.Gender}</span>
                                                    </div>
                                                    <hr className='my-2' />
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className='mb-0 text-secondary'>age</h6>
                                                        <span className='me-5 title'>{PetsData[0]?.Age}</span>
                                                    </div>
                                                    <hr className='my-2' />
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className='mb-0 text-secondary'>breed</h6>
                                                        <span className='me-5 title'>{PetsData[0]?.Breed}</span>
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
// samy was here