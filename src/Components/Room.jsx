import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Chat from './Chat';
import { MyContext } from './ContextProvider';

export default function Room() {
    const [room, setRoom] = useState(null)
    const [reciverPFP, setReciverPFP] = useState(null)
    const { userObj, setUserObj } = useContext(MyContext);
    const location = useLocation();
    const roomInputRef = useRef(null)
    const handleSubmit = (e) => {
        // e.preventDefault();
    }
    {/*chat */ }
    useEffect(() => {
        if (location.state && location.state.RID) {
            setRoom(location.state.RID)
            setReciverPFP(location.state.reciverPFP)
        }
    }, [location])
    
    return (
        <div className='tall d-flex align-items-center'>
            <div className='container d-flex justify-content-center'>
                {userObj ? (
                    <div className='w-100 d-flex justify-content-center '>
                        {room ?
                            <Chat room={room} reciverPFP={reciverPFP} />
                            :
                            <form className='bg-warning p-4 rounded-4 w-100 ' onSubmit={handleSubmit}>
                                <div className="row w-100 gx-1">
                                    <div className="col-9">
                                        <input ref={roomInputRef} placeholder='Enter room name' className='form-control w-100' type="text" />
                                    </div>
                                    <div className="col-3">
                                        <button type='submit' onClick={() => setRoom(roomInputRef.current.value)} className='btn btn-primary w-100'>send</button>

                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                ) : (
                    <h1>not logged in</h1>
                )}
            </div>
        </div>
    )
}
