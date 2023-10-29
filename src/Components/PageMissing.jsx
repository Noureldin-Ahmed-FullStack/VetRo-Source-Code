import React from 'react'

export default function PageMissing() {
    return (
        <div className='py-5'>
            <div className="container text-center">
      <div className="row ">
        <div className="col d-flex justify-content-center">
          <div className=' w-25'>
          <img
            src={require('../images/404.jpg')}
            alt="Cute Kitten"
            className="img-fluid rounded-bottom-circle rounded-top-5"
          />
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <h1 className="display-3">404 - Page Not Found</h1>
          <p className="lead">
            Uh-oh! It looks like you've stumbled upon an empty fishbowl.
          </p>
          <p>
            The page you're looking for may have swum away. Please check your
            URL or return to safety.
          </p>
          <a href="/" className="btn btn-primary btn-lg">
            <i className="fa fa-home"></i> Go Back Home
          </a>
        </div>
      </div>
    </div>
        </div>
    )
}
