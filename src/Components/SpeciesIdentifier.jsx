import React, { useState } from 'react'
import CameraComponent from './CameraComponent';

export default function SpeciesIdentifier() {
    const [Result, setResult] = useState("result")
    const warframUrl = 'https://www.wolframcloud.com/obj/407c7a68-d5d0-4a90-b115-e4d143b56338'
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
    const imageUrl = 'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg';
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
            <button onClick={call}>Identify</button>
            <img src="" alt="" />
            <img id='imageDisplay' className='AvatarMainPic my-3' src={dataFromChild} alt='avatar' />
            <CameraComponent sendDataToParent={handleDataFromChild} />
        </div>
    )
}
        