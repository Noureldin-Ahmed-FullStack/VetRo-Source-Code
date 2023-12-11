import React, { useRef, useState } from 'react'
import CameraComponent from './CameraComponent';
import { storage, ref, uploadBytes, getDownloadURL } from '../Firebase/firebase';
import firebase from 'firebase/app';
import 'firebase/storage';
export default function SpeciesIdentifier() {
    const [Result, setResult] = useState("result")
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const warframUrl = 'https://www.wolframcloud.com/obj/407c7a68-d5d0-4a90-b115-e4d143b56338'




    const btnRef = useRef(null);
    const inputRef = useRef(null);
    const IdentRef = useRef(null);

    const triggerInputBrowse = () => {
        inputRef.current.click(); //handleImageChange
    };
    const triggerInputClick = () => {
        btnRef.current.click(); //handleUpload
    };
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setTimeout(() => {
                console.log("handleUP");
                triggerInputClick()
            }, 10); // Delay of 0.5 seconds (500 milliseconds)
        }
    };

    const handleUpload = () => {
        console.log("handling");
        if (image) {
            console.log(image);
            const storageRef = ref(storage, `images/${image.name}`);
            uploadBytes(storageRef, image)
                .then((snapshot) => {
                    // Image uploaded successfully, get download URL
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        setImageUrl(downloadURL);
                        console.log('File available at', downloadURL);
                        // You can use downloadURL here or set it to state for later use
                    });
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error('Error uploading image: ', error);
                });
        }
    };


    function identifyImage(imageUrl) {
        // Make a fetch request to the Wolfram Cloud API
        return fetch(`${warframUrl}?url=` + encodeURIComponent(imageUrl))
            .then(response => response.json()) // Assume the API returns JSON
            .then(data => data)
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

    // Example usage
    function call() {
        identifyImage(imageUrl)
            .then(result => setResult(result))
            .catch(error => console.error('Error:', error));
    }
    const [dataFromChild, setDataFromChild] = useState();
    const handleDataFromChild = (data) => {
        // Update the state with data received from the child component
        setDataFromChild(data);
        console.log(dataFromChild);

    };
    return (
        <div>
            <h1>SpeciesIdentifier</h1>
            <h2>{Result}</h2>
            <input ref={inputRef} className='d-none' type="file" onChange={handleImageChange} />
            <button ref={btnRef} className='d-none' onClick={handleUpload}>handleUpload</button>
            <button className='btn btn-warning mx-3' onClick={triggerInputBrowse}>handleUpload</button>
            <button className='btn btn-warning  mx-3' onClick={call}>Identify</button>
            <img id='imageDisplay' className=' my-3' src={imageUrl} />
            <p>Image URL: {imageUrl}</p>
            {/* <CameraComponent sendDataToParent={handleDataFromChild} /> */}

        </div>
    )

}