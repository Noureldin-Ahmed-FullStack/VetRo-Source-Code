import React from 'react'
import Logo from '../images/Blue Logo.svg'
import Facebook from '../images/Facebook_logo.png'
import Google from '../images/googlelogo.png'
import '../MyCss/SignIn.css'
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

export default function SignUp() {
    const { signInWithGoogle } = UseFirebaseAuth();
    const token = localStorage.getItem('token');

    let navigate = useNavigate()
    const headers = {
        'token': token,
    };
    const handleSubmit = async (e) => {
        const body = {
            name: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value,
            repassword: e.target[3].value
        }
        let res = await axios.post(`http://localhost:3000/signUp`, body, { headers: headers }).catch((err) => {
            console.log(err.response);
        })
        toast.success(`Sign in!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigate('/login');
    }
    return (

        <div className="container  justify-content-center align-items-center">
            <div className='row featured-image mx-auto ' style={{ width: "10rem" }}>
                <img src={Logo} className="img-fluid mt-2" alt="" />
            </div>
            <h1 className="my-4 text-center">Sign Up</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control form-control-lg bg-light fs-6"
                                placeholder='user name'
                            />
                        </div>
                        <div className="input-group mb-2">
                            <input
                                type="email"
                                className="form-control form-control-lg bg-light fs-6"
                                placeholder='Your email'
                            />
                        </div>
                        <div className="input-group mb-2">
                            <input
                                type="password"
                                className="form-control form-control-lg bg-light fs-6"
                                placeholder='password'
                            />
                        </div>
                        <div className="input-group mb-2">
                            <input
                                type="password"
                                className="form-control form-control-lg bg-light fs-6"
                                placeholder='confirm password'
                            />
                        </div>

                        <div className='input-group '>
                            <button className='btn btn-lg btn-primary w-100 fs-6'>
                                Sign up
                            </button>
                        </div>
                        {/* <div id="emailHelp" className="form-text text-center m-0 py-3">
                            Or use one of these options.
                        </div>
                        <div className='input-group mb-3'>
                            <div onClick={() => signInWithGoogle()} className="btn btn-lg btn-light w-100 fs-6 ">
                                <img src={Google} className='me-2' style={{ width: '20px' }} />
                                <small>Continue With Gmail</small>
                            </div>
                        </div>
                        <div className='input-group mb-3'>
                            <button className='btn btn-lg btn-primary w-100 fs-6'>
                                <img src={Facebook} className='me-2' style={{ width: '20px' }} />
                                Continue With Facebook
                            </button>
                        </div> */}
                        <div id="emailHelp" className="form-text text-center ">
                            Already have an account ?
                            <small className='ps-1'>
                                <Link to="/login"> Sign in</Link>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
