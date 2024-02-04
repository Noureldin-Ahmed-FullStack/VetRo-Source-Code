import avatarImg from '../images/avatars.svg'
import React, { useRef, useState } from 'react'
import CameraComponent from './CameraComponent';
import { storage, ref, uploadBytes, getDownloadURL } from '../Firebase/firebase';
import firebase from 'firebase/app';
import 'firebase/storage';
import Loading from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons'
export default function SpeciesIdentifier() {
    const [Result, setResult] = useState("result")
    const [image, setImage] = useState(null);
    const [pending, setPending] = useState(false);
    const [imageUrl, setImageUrl] = useState(avatarImg);
    const warframUrl = 'https://www.wolframcloud.com/obj/407c7a68-d5d0-4a90-b115-e4d143b56338'




    const btnRef = useRef(null);
    const inputRef = useRef(null);
    const IdentRef = useRef(null);

    const triggerInputBrowse = () => {
        setPending(true)
        inputRef.current.click(); //handleImageChange
    };
    const triggerInputClick = () => {
        btnRef.current.click(); //handleUpload
    };
    const handleImageChange = async (e) => {

        if (e.target.files[0]) {
            await setImage(e.target.files[0]);
            // setTimeout(() => {
            //     console.log("handleUP");
            await triggerInputClick()

            // }, 200); // Delay of 0.1 seconds (500 milliseconds)
        } else {
            setPending(false)
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
                        setPending(false)

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
        setPending(true)
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
            .then(result => {
                setResult(result)
                setPending(false)
            })
            .catch(error => console.error('Error:', error));
    }
    const [dataFromChild, setDataFromChild] = useState();
    const handleDataFromChild = (data) => {
        // Update the state with data received from the child component
        setDataFromChild(data);
        console.log(dataFromChild);

    };
    return (
        <div id="samyDIV">
            <div className='container '>
                <div>
                    <h1 className='pt-2'>Species Identifier</h1>
                    <input ref={inputRef} accept="image/*" capture="environment" className='d-none' type="file" onChange={handleImageChange} />
                    <button ref={btnRef} className='d-none' onClick={handleUpload}>handleUpload</button>
                    <div id="uploadContainer" className='w-100'>
                        <button id="uploadBTN" className='btn btn-warning mx-3' onClick={triggerInputBrowse}>handleUpload</button>
                        <h2 className='text-light pt-2'><i>{Result}</i></h2>
                        {/* <h2><i>{pending.toString()}</i></h2> */}
                    </div>
                    {pending ? (
                        <div className=''>
                            <FontAwesomeIcon className='heartbeat' icon={fa.faPaw} />
                        </div>
                    ) : (
                        <div>
                            <button id="identifyBTN" className='btn btn-warning  mx-3' onClick={call}>Identify</button>
                        </div >
                    )
                    }
                    <img id='imageDisplay' className=' my-3 mb-5' src={imageUrl} />
                </div>
            </div>
        </div >
    )

}