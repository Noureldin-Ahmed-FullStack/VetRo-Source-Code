
import { MyContext } from './ContextProvider'
import { UseFirebaseAuth } from './UseFirebaseAuth'
import React, { useContext } from 'react'
import '../MyCss/SignIn.css'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/Blue Logo.svg'
import axios from 'axios'
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
export default function Login() {
  const { userObj, setUserObj } = useContext(MyContext);
  const { UserDBData, setUserDBData } = useContext(MyContext);
  const { signInWithGoogle } = UseFirebaseAuth();
  var token = localStorage.getItem('token');
  const headers = {
    'token': token,
  };


  const fetchUserData = async (userId) => {
    console.log(userId);
    try {
      await axios.get(`https://vetro-server.onrender.com/getSingleUser/${userId}`)
        .then(response => {
          console.log(response.data.message);
          setUserDBData(response.data.message)
        })
        .catch(error => {
          console.error('Error:', error);
        });



      // setUserDBData(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    
  };
  }
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: e.target[0].value,
      password: e.target[1].value,
    }
    try {
      var res = await axios.post(`https://vetro-server.onrender.com/signIn`, body, { headers: headers })
    } catch (err) {
      console.log(err.response);
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    return; // Throw the error to stop further execution
    }
    
      
    console.log(res);
   
    // console.log(res.data.token);
    await localStorage.setItem('token', res.data.token)
    toast.success(`logged in!`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token, 'key');
      console.log(decoded)
      setUserObj(decoded);
      fetchUserData(decoded.uid)
  
    } else {
      console.log("no token");
    }
    navigate('/signIn');
  }
  return (
    <div className='w-100 align-items-center d-flex justify-content-center flex-grow-1 Log-vh-100'>
      <div className="container justify-content-center align-items-center">
        <div className='row featured-image mx-auto ' style={{ width: "150px" }}>
          <img src={Logo} className="img-fluid " alt="" />

        </div>
        <h1 className="my-4 text-center">Log In</h1>
        <div className="row justify-content-center">
          <div className="col-md-6 ">

            <form onSubmit={handleSubmit} className=''>
              <div className="input-group mb-3">

                <input
                  type="email"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder='Your email'
                  id="email"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="input-group mb-3">

                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder='password'
                  id="password"
                  aria-describedby="passwordHelp"
                />
              </div>

              <div className='input-group mb-3'>
                <button className='btn btn-lg btn-primary w-100 fs-6'>
                  Continue With Email
                </button>
              </div>
              <div className='input-group mb5 d-flex justify-content-between'>
                {/* <div className='form-check'>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="formCheck"
                    aria-describedby="passwordHelp"
                  />
                  <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Keep me Singed in</small></label>


                </div> */}
                <div>
                  <small>
                    <a href='#'>Forgot Password</a>
                  </small>
                </div>
              </div>
              {/* <div id="emailHelp" className="form-text text-center mb-3">
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
              <div id="emailHelp" className="form-text text-center">
                don't have an account?
                <small className='ms-2 pb-4'>
                  <Link to="/SignIn"> Sign Up</Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};