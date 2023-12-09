import React, { useEffect, useRef, useState } from 'react';
import '../MyCss/MyCustomStylesheet.css'
import Main from './Main';

function CameraComponent({ sendDataToParent }) {

  const sendData = (param) => {
    // Call the function passed from the parent and send the data
    sendDataToParent(param);
  };



  const fileInputRef = useRef(null);

  const triggerInputClick = () => {
    fileInputRef.current.click();
  };


  const [selectedFile, setSelectedFile] = useState(null);
  const [imageDisplay, setimageDisplay] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {

        setSelectedFile(e.target.result);
        
      };
      reader.readAsDataURL(file);
      console.log(file);
      const imageUrl = URL.createObjectURL(file);
      sendData(imageUrl)
    }
  };




  return (
    <div className=' '>
      <input ref={fileInputRef}
        onChange={handleFileChange} className='Camera d-none'
        accept="image/*" id="Cam" type="file" capture="environment" />
      <button onClick={triggerInputClick} className='btn btn-primary' id='CamBtn'>Upload Image</button>
    </div>
  );
}

export default CameraComponent;
