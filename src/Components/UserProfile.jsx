
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'
import { collection, doc, getDocs, query, where, updateDoc, getDoc,setDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
//----

import { getAuth ,updateProfile,onAuthStateChanged} from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function UserProfile() {
    
    const { signOutUser } = UseFirebaseAuth();
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const [newName, setNewName] = useState('');
       

   //-----------image edit-------------
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
     updateProfile(auth.currentUser, {
       displayName: newName,
     });
   

//save in firestore
    if (user) {
        const userRef = doc(db, "Users", user.uid);
       
        updateDoc(userRef, {userName: newName })
        .then(() => {
          console.log("Name updated in Firestore");
        })
        .catch((error) => {
          console.log(error);
        });
    }
};

    /*For Pets data */
    const [PetsData, setPetsData] = useState([]);
    const usersRef = doc(db, "Users", userObj.uid);
    const fetchPetsData = async () => {
    try {
    const response = collection(db, 'Pets');
    const q = query(response, where("userID", "==", usersRef.id)); // Assuming userId property in Clinics collection
    const data = await getDocs(q);
    const PetsDataArray = data.docs.map(doc => doc.data());
    setPetsData(PetsDataArray);
    } catch (error) {
    console.error("Error fetching PETS data:", error);
    }
    };
    useEffect(() => {
        fetchPetsData();
    }, [usersRef]);







  return (
    
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
                                
                {/* update image*/}
                <div className="App">
             <form onSubmit={handleSubmit} className='form'>
              <input type='file' />
             <button type='submit'>Upload</button>
              </form>
          
    
   </div>
                    </div>


            {/* update name*/}
           <input type="text" value={newName} onChange={handleNameChange} />
           <button onClick={handleUpdateClick}>Update Name</button>
           {/* ...  */}
        

                    <div className="col-sm-6 col-md-7 About">
                        <div className="about-info my-2">
                            <p><span style={{ fontWeight: 'bolder' }} className="title-s">Name: </span> <span>{userObj.displayName}</span></p>

                            <p className="lol"><span style={{ fontWeight: 'bolder' }} className="title-s">Email: </span>
                                <a className href="mailto: noureldin2662002@gmail.com">{userObj.email}</a>
                            </p>
                            <p><span style={{ fontWeight: 'bolder' }} className="title-s">Phone: </span> <a href="tel:+201116074576">{userObj.phonNumber}</a></p>
                        </div>
                    </div>
                </div>
                <div className="skill-mf my-2 wow bounceInUp" data-wow-offset={150} style={{ visibility: 'visible', animationName: 'bounceInUp' }}>
                    {/*display data of Pets*/}
                    <h4>PETS Data:</h4>
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
  )
}
