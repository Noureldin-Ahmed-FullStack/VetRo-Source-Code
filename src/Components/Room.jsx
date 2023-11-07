import React, { useContext, useRef, useState } from 'react'
import Chat from './Chat';
import { MyContext } from './ContextProvider';

export default function Room() {
    const [room, setRoom] = useState(null)
    const { userObj, setUserObj } = useContext(MyContext);

    const roomInputRef = useRef(null)
    const handleSubmit = (e) => {
        e.preventDefault();
    }



    return (
        <div className='tall d-flex align-items-center'>
            <div className='container d-flex justify-content-center'>
                {userObj ? (
                    <div className='w-100 d-flex justify-content-center flower'>
                        {room ?
                            <Chat room={room} />
                            :
                            <form className='bg-warning p-4 rounded-4 w-50 ' onSubmit={handleSubmit}>
                                <div className="row w-100">
                                    <div className="col-md-10">
                                        <input ref={roomInputRef} placeholder='Enter room name' className='form-control w-100' type="text" />
                                    </div>
                                    <div className="col-md-2">
                                        <button type='submit' onClick={() => setRoom(roomInputRef.current.value)} className='btn btn-primary'>send</button>

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
