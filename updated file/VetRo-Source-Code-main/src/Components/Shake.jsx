import React, { useEffect, useState } from 'react';


export default function Shake() {
    var [IsShaken, setIsShaken] = useState("false");
    function change() {
      setIsShaken((prevIsShaken) => (prevIsShaken === "true" ? "false" : "true"));
    }
useEffect(() => {
    const handleShake = (event) => {
      // Calculate the total acceleration to detect a shake
      const acceleration = event.accelerationIncludingGravity;
      const totalAcceleration = Math.sqrt(
        acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
      );

      // Define a threshold for shake detection
      const shakeThreshold = 15;

      // Check if the device has been shaken
      if (totalAcceleration > shakeThreshold) {
        // Handle the shake event here
        console.log('Device shaken!');
        change()
        // alert("Device shaken!");
      }
    };

    // Add a devicemotion event listener
    window.addEventListener('devicemotion', handleShake);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('devicemotion', handleShake);
    };
  }, []);

  return (
    <div>
      <h1>{IsShaken}</h1>
      <button className='btn btn-warning ' onClick={change}>click</button>
    </div>
  );
}
