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
  useEffect(() => {
    // Code to run after the DOM elements have loaded
    // Code to run after the component mounts
    // This is similar to componentDidMount
    // console.log("update");
    // const inputBtn = document.getElementById('CamBtn');
    // const inputElement = document.querySelector('#Cam');
    // const imageDisplay = document.getElementById('imageDisplay');
    // console.log(inputElement);
    // inputBtn.addEventListener('click', function() {
    //   inputElement.click();
    // });


    return () => {
      // Code to run when the component unmounts
      // This is similar to componentWillUnmount
      // inputBtn.addEventListener('click', function () {
      //   inputElement.click();
      // });
      // inputElement.addEventListener('change', function (event) {
      //   const selectedFile = event.target.files[0];
      //   console.log(selectedFile)
      //   if (selectedFile) {
      //     const reader = new FileReader();

      //     reader.onload = function (e) {
      //       const imageDataUrl = e.target.result;

      //       // Set the src attribute of the img element to the selected image
      //       imageDisplay.src = imageDataUrl;
      //     };

      //     reader.readAsDataURL(selectedFile);
      //   }
      // })

    };
  }, []); // The empty dependency array ensures the code runs after the component has rendered




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
