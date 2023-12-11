
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

export default function UserProfile() {
    
    const { signOutUser } = UseFirebaseAuth();
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);

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
    useEffect(() => {
        console.log("user component updated");
        fetchPetsData();
    }, [usersRef.id]);







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
                    <div className="col-sm-6 col-md-7 About">
                        <div className="about-info my-2">
                            <p><span style={{ fontWeight: 'bolder' }} className="title-s">Name: </span> <span>{userObj.displayName}</span></p>

                            <p className="lol"><span style={{ fontWeight: 'bolder' }} className="title-s">Email: </span>
                                <a  href="mailto: noureldin2662002@gmail.com">{userObj.email}</a>
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
    
</div>
  )
}
