
import React, { useContext, useEffect , useState } from 'react'
import firebase from 'firebase';
import { MyContext } from './ContextProvider';
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'

export default function UserProfile() {
    const { signOutUser } = UseFirebaseAuth();
    const  { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const [profile, setProfile] = useState(null);
    const [pets, setPets] = useState([]);
    useEffect(()=> {
        const fetchData = async () => {
            const db = firebase.database();
            const profileSnapshot = await db.ref('userProfile').once('value');
            const petsSnapshot = await db.ref('pets').once('value');
            setProfile(profileSnapshot.val());
            setPets(petsSnapshot.val());
        };
        fetchData();
    }, [] ); 
    if (!profile || !pets){
        return <div>Loading.....</div>;
    }

    
  return (
    <div className="row">
        
           <h1>Profile</h1>
           <div>
            <img src={UserDBData.UserProfile}/>
           </div>
           <p>Name: {userObj.name}</p>
           <p>Email: {userObj.email}</p>
           <h2>pets</h2>
           <ul>
            {pets.map((pet, indexedDB) => (<li key = {indexedDB}>
                <p>Name: {pet.name}</p>
                <p>Type: {pet.type}</p>
                <p>Gender: {pet.gender}</p>
                <p>Birthday: {pet.birthday}</p>
                <p>Weight: {pet.weight}</p>

            </li>))}
           </ul>
                    <button onClick={signOutUser} className="btn btn-warning text-light MyOrangeBg w-100 mt-4">Sign Out</button>
        </div>
  )
}
