
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons'


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

    useEffect(() => {
        console.log("user component updated");
        fetchPetsData();
    }, [usersRef.id]);







  return (
<>
    {isOpen ? (
        <div className='myOverlay d-flex justify-content-center align-items-center'>
          <div className='container bg-light rounded-5 w-100'>
            <div className="row text-center">
              <div className="col-12 d-flex justify-content-between">
                <p className='px-3'></p>
                <h2 className='py-3'><b>Edit Info</b></h2>
                <div className='d-flex justify-content-end align-items-center'>
                  <FontAwesomeIcon onClick={()=>setIsOpen(false)} className='myClose' icon={fa.faCircleXmark} />
                </div>
              </div>
              <hr />
            </div>
            <form onSubmit={HandleInfoUpdate}>
                <div className='container' style={{fontSize: '1.25rem', fontStyle: 'italic', fontFamily: 'arial'}}>
                    <div className='row py-2 align-items-center'>
                        <div className='col-sm-2'><span className=''>Name:</span></div>
                        <div className='col-sm-10'><input className='form-control' type='text' defaultValue={UserDBData.userName}/></div>
                    </div>
                    <div className='row py-2 align-items-center'>
                        <div className='col-sm-2'><span className=''>Phone:</span></div>
                        <div className='col-sm-10'><input className='form-control' type='tel' defaultValue={UserDBData.phonNumber}/></div>
                    </div>
                    <div className='row py-2 pb-2 align-items-center'>
                        <div className='col-sm-2'><span className=''>Bio:</span></div>
                        <div className='col-sm-10'><textarea className='form-control' defaultValue={UserDBData.About} style={{  resize: 'none'}} rows='4'/></div>
                    </div>
                    <div className='d-flex justify-content-center'>
                            <button type='submit' className="btn btn-outline-success w-25 py-3 m-3">submit</button>
                    </div>
                </div>
              {/* <div className="post-box container">
                <div className="user-profile row">
                  <div className='d-flex align-items-center py-2'>
                    <img className='circle-round' src={UserDBData.userPFP} alt="Profile Picture" />
                    <h3 className='usrText'>{UserDBData.userName}</h3>
                  </div>
                </div>
                <div className='input-area '>
                  <textarea onChange={(e)=>setPostText(e.target.value)} className='form-control  bg-light' rows="6" placeholder="What's on your mind?"></textarea>
                </div>
                <div className="action-buttons">
                  <button type='button' className="btn btn-danger">Add Photo</button>
                  <button type='submit' className="btn btn-danger m-3">submit</button>
                </div>
              </div> */}
            </form>
          </div>
        </div>

      ) : (
        <></>
      )

      }
    <div className="col-sm-12">
    <div className="box-shadow-full">
        <div className="row">
            <div className="col-md-5 wow BounceInLeft" data-wow-offset={200} style={{ visibility: 'visible', animationName: 'bounceInLeft' }}>
                <div className="row">
                    <div className="col-sm-6 col-md-5 About ">
                        <div>
                            <img id="img" src={UserDBData.userPFP} className="img-fluid rounded b-shadow-a w-100"  />
                        
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-7 About">
                        <div className="about-info my-2">
                            <p><span style={{ fontWeight: 'bolder' }} className="title-s">Name: </span> <span>{UserDBData.userName}</span></p>

                            <div className="d-flex align-content-center pb-3"><div style={{ fontWeight: 'bolder' } } className="">Email: </div>
                                <div className='w-100'><a className='wordBreaker'  href="mailto: noureldin2662002@gmail.com">{UserDBData.email}</a></div>
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
                    <h4>Pets Data:</h4>
                    {
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
                    
                        {/* {UserDBData.About} */}
                        {UserDBData.About? (
                            <p className="lead" >{UserDBData.About}</p>
                        ):(
                            <p className='lead'>This is your about 😎</p>
                        )}
                    
                    <div className="title-box-2">
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
</>
  )
}
