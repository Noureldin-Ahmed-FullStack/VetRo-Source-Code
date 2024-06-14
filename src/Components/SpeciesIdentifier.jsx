import avatarImg from '../images/qm.png'
import React, { useRef, useState } from 'react'
import CameraComponent from './CameraComponent';
import { storage, ref, uploadBytes, getDownloadURL } from '../Firebase/firebase';
import firebase from 'firebase/app';
import { toast } from 'react-toastify';
import 'firebase/storage';
import Loading from './Loading';
import '../MyCss/SpeciesIdentifier.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
export default function SpeciesIdentifier() {
    const [Result, setResult] = useState("Try it!")
    const [image, setImage] = useState(null);
    const [pending, setPending] = useState(false);
    const [imageUrl, setImageUrl] = useState('https://iili.io/JEijWG4.png');
    const warframUrl = 'https://www.wolframcloud.com/obj/407c7a68-d5d0-4a90-b115-e4d143b56338'


    const formData = new FormData();

    const handleImageChange = async (e) => {
        setPending(true)

        if (e.target.files[0]) {
            await setImage(e.target.files[0]);
            await formData.append('file', e.target.files[0])
            try {

                var res = await axios.post('https://vetro-server.onrender.com/speciesIdentifier', formData)
                if (res) {
                    console.log(res);
                    toast.success(res.data.identification, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setResult(res.data.identification)
                    setPending(false)
                }
            } catch (error) {
                console.log(error);
                setPending(false)
            }
        } else {
            setPending(false)
        }
    };

    const handleUpload = () => {
        console.log("handling");
        if (image) {

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
    const warnUser = () => {
        toast.warning("You need to upload an image first", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    // Example usage
    function call() {
        identifyImage(imageUrl)
            .then(result => {
                setResult(result)
                toast.success(result, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setPending(false)
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <div className='background tall vh100'>
            <div>
                <h1 className='start'>Animal <span style={{ color: '#B95F00 ' }} > <b>Breed </b></span> Identification Program</h1>
                <div className='other'>
                    <h2 className='bold container mt-1 mb-3'>Upload a picture and press Identify to show the result!</h2>
                    {pending ? (
                        <div className='py-3'>
                            <FontAwesomeIcon className='heartbeat' icon={fa.faPaw} />
                        </div>
                    ):(
                        Result == "Try it!" ? (
                            <h3 className='pt-1 mb-3'>{Result}</h3>
                        ) : (
                            <h3 className='pt-1 mb-3 colorful'>{Result}</h3>
                        )
                    )}
                    
                </div>
                <div id="" className='three'>
                    <div className=''>

                        {image ? <img id='imageDisplay' className="" src={URL.createObjectURL(image)} alt="" /> : <img id='imageDisplay' className=' attention-grabber ' src='https://iili.io/JEijWG4.png' alt="" />}


                    </div>
                    <div className='mt-3'>
                        <label htmlFor='fileInput' className='btn btn-outline-orange'>  Upload photo  </label>
                        <input accept="image/*" id='fileInput' className='d-none' type="file" onChange={handleImageChange} />
                    </div>
                    {/* <h2><i>{pending.toString()}</i></h2> */}
                </div>



                <div className='phone'>
                    <h2 className='bold container mt-1'>Upload a picture and press Identify to show the result!</h2>
                    {pending ? (
                        <div className='py-3'>
                            <FontAwesomeIcon className='heartbeat' icon={fa.faPaw} />
                        </div>
                    ):(
                        Result == "Try it!" ? (
                            <h3 className='pt-1 mb-3'>{Result}</h3>
                        ) : (
                            <h3 className='pt-1 mb-3 colorful'>{Result}</h3>
                        )
                    )}
                </div>
            </div>

        </div>
    )

}