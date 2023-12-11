
import React, { useContext, useEffect } from 'react'
import { MyContext } from './ContextProvider';
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'
import '../MyCss/MyCustomStylesheet.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import tomatto from '../images/tomatto.jpg'
import shoes from '../images/shoes.jpg'


export default function UserProfile() {
    
    const { signOutUser } = UseFirebaseAuth();
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
  return (
    <di>
      <div className='display'>
<div className="card">
        <div className = "row2r"  >
        <div className="image"><img id="img" src={UserDBData.userPFP} className="profile-pic" alt />
                            {/* {console.log(UserDBData.pets[0].petRef._key.path.segments[6])} */}
                            {/* {console.log(UserDBData.pets[0])} */}</div>
       <div className="about-info my-2">
       <h4><span style={{ fontWeight: 'bolder' }} className="title-s"> </span> <span>{userObj.displayName}</span></h4>
       <p className="lol"><span style={{ fontWeight: 'bolder' }} className="title-s"></span>
                                <a className href="mailto: ahmeda@gmail.com">{userObj.email}</a>
                            </p>
       </div>
       <div className="icon">
       <button className='icon'>
       <FontAwesomeIcon className='iconss' icon={fa.faPenToSquare} />
       </button>

       </div>
       <hr/>
       <div>
        
       <h4>
       Your Pets
       </h4>
       </div>
    </div>
    <br/>
    <div className='row3ef' >
    <div className="image1"><img id="img1" src={shoes} className="profile-pic" alt />
                            {/* {console.log(UserDBData.pets[0].petRef._key.path.segments[6])} */}
                            {/* {console.log(UserDBData.pets[0])} */}</div>
    
    <div className="image2">
      <img id="img2" src={tomatto} className="profile-pic" alt />
                            {/* {console.log(UserDBData.pets[0].petRef._key.path.segments[6])} */}
                            {/* {console.log(UserDBData.pets[0])} */}
                            </div>

     <div className='profile-pic'>
     <FontAwesomeIcon className='i23' icon={fa.faAdd} />
                            {/* {console.log(UserDBData.pets[0].petRef._key.path.segments[6])} */}
                            {/* {console.log(UserDBData.pets[0])} */}</div>
   </div>
   </div>
    <div class="card1">
        <div  ><h3 >Pet Profile</h3></div>
        <div className='cota'>
        <div className="ima"><img id="img4" src={tomatto} className="pet-pic" alt />
                            {/* {console.log(UserDBData.pets[0].petRef._key.path.segments[6])} */}
                            {/* {console.log(UserDBData.pets[0])} */}
                            
                            </div>
                            <div style={{marginTop: '25px'}}>
                            <div style={{display: 'flex'}}>
                            <h4 >Maxi</h4>
                            <div className="icon">
       <button className='icon' >
       <FontAwesomeIcon className='iconss' icon={fa.faPenToSquare} />
       </button>

       </div>
                            </div>
                            <p>Dog Border Collie</p>
                            </div>
                            
            
        </div>
        <div class="pet-info" style={{display: "grid"}}>

          <div><p style={{float: "left"}}>Gender</p> <p style={{float: "right"}}>Male</p></div>
          <hr/>
          <div ><p style={{float: "left"}}>Size</p> <p style={{float: "right"}}>Medium</p></div>
          <hr/>
          <div ><p style={{float: "left"}}>Wieght</p> <p style={{float: "right"}}>22,2kg</p></div>
          
        
                
            </div>
            <div  ><h5 >Important Dates</h5></div>
            <div style={{display:'flex'}}>
            <div className="icon">
       <button className='icon' >
       <FontAwesomeIcon className='iconss' icon={fa.faCake} />
       </button>

       </div>
       Birthday
            </div>
       <hr/>
       <div style={{display:'flex'}}>
       <div className="icon">
       <button className='icon' >
       <FontAwesomeIcon className='iconss' icon={fa.faHome} />
       </button>

       </div>
       Adobtion Day
       </div>


        </div>
        
        
       
    </div>
    <button onClick={signOutUser} className="btn btn-warning text-light MyOrangeBg w-100 mt-4">Sign Out</button>
    </di>


    
    
  )
}
