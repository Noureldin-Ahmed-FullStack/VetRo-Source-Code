
import { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'
import { collection, getDoc, getDocs ,setDoc} from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

//----
import { doc, updateDoc } from "firebase/firestore"; 
import { getAuth ,updateProfile,onAuthStateChanged} from "firebase/auth";


 
export default function DoctorProfile() {
  
    
    const { signOutUser } = UseFirebaseAuth(); 
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const [newName, setNewName] = useState('');
    const storage=getStorage();
   
    const [user, setUser] = useState();
    const [isFormOpen, setIsFormOpen] = useState(false);
   const [newphone, setphone] = useState('');

    //--------------------------------------------------------------------------
 /*
const db = getFirestore();
const auth = getAuth()
 
 const handleUpdate = () => {
  ;
     const user = auth.currentUser;

  const userRef = doc(db, "Users", user.uid);
  updateDoc(userRef, {
    phoneNumber: ,
    // Add other fields you want to update
  }).then(() => {
    console.log("User profile updated successfully");
  }).catch((error) => {
    console.error("Update user profile error:", error);
  });
};
    */
    //--------image-----------------
    const [imgUrl, setImgUrl] = useState();
   const [progresspercent, setProgresspercent] = useState(0);
  
   const handleSubmit = (e) => {
     e.preventDefault()
     const file = e.target[0]?.files[0]
     if (!file) return;  
     const storage=getStorage();
     //reference where the file will be stored in Storage.
     const storageRef = ref(storage, `profilImage/${file.name}`);
     //uploading the file to Storage.
     const uploadTask = uploadBytesResumable(storageRef, file);
  
     uploadTask.on("state_changed",
     //--
 (snapshot) => {
     //calculated as a percentage of the total bytes transferred
  const progress =
    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  setProgresspercent(progress);
 },
 (error) => {
  console.error("Upload error:", error);
 },
 () => {
 
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log("Download URL:", downloadURL);
    setImgUrl(downloadURL);
    //-------
    const auth = getAuth();
    const user = auth.currentUser;
    const userRef = doc(db, "Users", user.uid);
 //update profile picture in the Firestore.
  updateDoc(userRef, {userPFP: downloadURL })
    updateProfile(auth.currentUser, {  photoURL: `${imgUrl}` })
      .then(() => {
        console.log("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Update profile error:", error);
      });
  });
 }
);
   }

 
    //---------UserName_edit--------------------------
   const handleNameChange = (event) => {
    
    setNewName(event.target.value);
  };

 const handleUpdateClick = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    //display in profil
    onAuthStateChanged(auth, (user) => {
     if (user) {
       // User is signed in
       const uid = user.uid;
       // ...
     } else {
       // User is signed out
       // ...
     }
   });

     updateProfile(auth.currentUser, {
       displayName: newName,
     });
   

 //save in firestore
    if (user) {
        const userRef = doc(db, "Users", user.uid);
       
        updateDoc(userRef, { DoctorName: newName })
        .then(() => {
          console.log("Name updated in Firestore");
        })
        .catch((error) => {
          console.log(error);
        });
    }
 };
 //----------About---------
 const [About, setNewAbout] = useState('');

 const handleAboutChange = (event) => {
  setNewAbout(event.target.value);
 };

 const abouthandleSubmit = async (event) => {
  event.preventDefault();

  const docRef = doc(db, "Users",  userObj.uid);
  await updateDoc(docRef, { About: About });
 };

 const [newAboutData, setNewAboutData] = useState(null);
   useEffect(() => {
   const fetchData = async () => {
    const docRef = doc(db, "Users",  userObj.uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      setNewAboutData(docSnap.data());
    } else {
      console.log("No such document!");
    }
   };
  
   fetchData();
   }, []);

   
 //---------------
 
 const handlephoneChange = (event) => {
    setphone(event.target.value);
  };

 const handlleUpdateClick = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    //display in profil
    onAuthStateChanged(auth, (user) => {
     if (user) {
       // User is signed in
       const uid = user.uid;
       // ...
     } else {
       // User is signed out
       // ...
     }
   });

     updateProfile(auth.currentUser, {
        phone: newphone,
     });
   
    
 //save in firestore
    if (user) {
        const userRef = doc(db, "Users", userObj.uid);
       
        updateDoc(userRef, {phoneNumber: newphone })
        .then(() => {
          console.log("Name updated in Firestore");
        })
        .catch((error) => {
          console.log(error);
        });
    }
 };

 //===================

 /*For Clinic data */
    const [clinicData, setClinicData] = useState([]);
        useEffect(() => {
            const fetchClinicData = async () => {
            const response = collection(db, 'Clinics');
            const data = await getDocs(response);
            const clinicDataArray = data.docs.map(doc => doc.data());
            setClinicData(clinicDataArray);
            };
            fetchClinicData();
        }, []);
    

      // <input type="text" value={about} onChange={handleaboutChange} placeholder="About" />

  return (
    
    <div className="col-sm-12">
    <div className="box-shadow-full">
        <div className="row">
            <div className="col-md-5 wow BounceInLeft" data-wow-offset={200} style={{ visibility: 'visible', animationName: 'bounceInLeft' }}>
                <div className="row">
                    <div className="col-sm-6 col-md-5 About ">
                        <div>
                            <img id="img" src={UserDBData.userPFP} className="img-fluid rounded b-shadow-a w-100" alt />
                        </div>
                    
         
         {/* -----------update image-----------     <div className="App">
      <form onSubmit={handleSubmit} className='form'>
        <input type='file' />
        <button type='submit'>Upload</button>
      </form>
      {
        !imgUrl &&
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
        </div>
    
      }
        </div>*/}
         <div className="App">
             <form onSubmit={handleSubmit} className='form'>
              <input type='file' />
             <button type='submit'>Upload</button>
              </form>
          
    
              </div>
                    </div>
         {/*------------- update name-------------*/}
                 <div>
                     <input type="text" value={newName} onChange={handleNameChange} />
                     <button onClick={handleUpdateClick}>Update Name</button>
        
                  </div>
   {/* ---------------------------------------- */}
                    <div className="col-sm-6 col-md-7 About">
                        <div className="about-info my-2">
                            <p><span style={{ fontWeight: 'bolder' }} className="title-s">Doctor Name: </span> <span>{userObj.displayName}</span></p>
<p className="lol"><span style={{ fontWeight: 'bolder' }} className="title-s">Email: </span>
                                <a className href="mailto: noureldin2662002@gmail.com">{userObj.email}</a>
                            </p>
                        
                            <p><span style={{ fontWeight: 'bolder' }} className="title-s">Phone: </span> <a href="tel:+201116074576">{userObj.phonNumber}</a></p>
                        </div>
                    </div>
                </div>
                
 {/* update phone*
 <div>
     <button onClick={() => setIsFormOpen(true)}>Edit Profile</button>
     {isFormOpen && (
       <form onSubmit={handleSubmit}>
         <input type="text" value={newName} onChange={handleNameChange} placeholder="Name" />
        
         <button type="submit">Update Profile</button>
       </form>
     )}
   </div>
           {/* ...  */}
             
                <div className="skill-mf my-2 wow bounceInUp" data-wow-offset={150} style={{ visibility: 'visible', animationName: 'bounceInUp' }}>
                    <h4>clinic details:</h4>
                    {
                    clinicData.map((Clinics, index) => (
                            <div key={index}>
                            <p>Name:{Clinics.name}</p>
                            <p>Phone: {Clinics.phone}</p>
                            <p>Location: {Clinics.location}</p>
                            <p>Price: {Clinics.price}</p>
                            <p>Day: {Clinics.Day}</p>
                            <p>Available From: {Clinics.availableFrom}</p>
                            <p>Available To: {Clinics.availableTo}</p>
                            </div>
                        ))
                        }

                    {/* <p className="title-s lul-title">Skills</p>
                    <ul>
                        <li>Programming Languages: JavaScript, C#</li>
                        <li>Web Technologies: ASP.NET, HTML, CSS, Bootstrap, React (in progress)</li>
                        <li>Databases: MS SQL</li>
                        <li>Version Control: Git</li>
                        <li>Problem Solving and Analytical Skills</li>
                        <li>Strong Communication and Teamwork Skills</li>
                        <li>Attention to Detail and Time Management</li>
                        <li>Languages : Arabic (Native speaker)
                            <div className="progress">
                                <div className="progress-bar MyOrangeBg" role="progressbar" style={{ width: '100%' }} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}>100%</div>
                            </div>
                            and English (Fluent Speaker)
                        </li>
                        <div className="progress">
                            <div className="progress-bar MyOrangeBg" role="progressbar" style={{ width: '100%' }} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}>100%</div>
                        </div>
                    </ul> 
                    <span>ReactJS [Inprogress]</span> <span className="pull-right" />
                    <div className="progress">
                        <div className="progress-bar MyOrangeBg" role="progressbar" style={{ width: '9%' }} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}>9%</div>
                    </div>*/}
                </div>
            </div>
            <div className="col-md-1" />
            <div className="col-md-6 wow BounceInRight" data-wow-offset={200} style={{ visibility: 'visible', animationName: 'bounceInRight' }}>
                <div className="about-me pt-4 pt-md-0">
                    <div className="title-box-2">
                        
                    </div>

                    {/*---------About-----*/}
                    <form onSubmit={ abouthandleSubmit}>
                        <input type="text" value={About} onChange={handleAboutChange} placeholder="About" />
                        <button type="submit">Update About</button>
                    </form>
                    <p className="lead">
                    <div>
                       {newAboutData && (
                        <div>
                           <h2>About:</h2><h5> {newAboutData.About}</h5>
                        </div>
                         )}
                    </div>
                    </p>
                    {/*--------------*/}

                    <div className="title-box-2">
                        <h5 className="title-left lul-title">
                            Pets
                        </h5>
                    </div>
                    <div>
                        <Link className="btn btn-info my-2" to="Clinic">Add Clinic</Link>

                    </div>
                    <button id="cvBtn" className="btn btn-warning text-light MyOrangeBg w-100">Download CV</button>
                    <button onClick={signOutUser} className="btn btn-warning text-light MyOrangeBg w-100 mt-4">Sign Out</button>
                </div>
            </div>
        </div>
    </div>
    {/* <p>User is authenticated:</p>
                                <p>Name: {user.displayName}</p>
                                <p>Email: {user.email}</p>
                                {user.photoURL && (
                                    <img src={user.photoURL} alt="Profile" />
                                )} */}
 </div>
 );
}
  
   