
import React, { useContext, useEffect,useState } from 'react'
import { MyContext } from './ContextProvider';
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'
import { db } from '../Firebase/firebase';
//----
import { doc, updateDoc, getDoc,setDoc } from "firebase/firestore"; 
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
  return (
    
    <div className="col-sm-12">
    <div className="box-shadow-full">
        <div className="row">
            <div className="col-md-5 wow BounceInLeft" data-wow-offset={200} style={{ visibility: 'visible', animationName: 'bounceInLeft' }}>
                <div className="row">
                    <div className="col-sm-6 col-md-5 About ">
                        <div>
                            <img id="img" src={UserDBData.userPFP} className="img-fluid rounded b-shadow-a w-100" alt />
                            {/* {console.log(UserDBData.pets[0].petRef._key.path.segments[6])} */}
                            {/* {console.log(UserDBData.pets[0])} */}
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
                    <p className="title-s lul-title">Skills</p>
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
                    </div>
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
                    <p className="lead">
                        Highly motivated and detail-oriented computer science student seeking
                        opportunities to apply and enhance my skills in JavaScript, ASP.NET, C#, MS
                        SQL, HTML, CSS, Bootstrap, and React (In progress). I am eager to contribute
                        to a dynamic team and gain real-world experience in the field of software
                        development.
                    </p>
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
    {/* <p>User is authenticated:</p>
                                <p>Name: {user.displayName}</p>
                                <p>Email: {user.email}</p>
                                {user.photoURL && (
                                    <img src={user.photoURL} alt="Profile" />
                                )} */}
</div>
  )
}
