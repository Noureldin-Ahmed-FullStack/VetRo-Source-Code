import React, { Component } from 'react'
import '../MyCss/MyCustomStylesheet.css'
import avatarImg from '../images/avatars.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import * as fab from '@fortawesome/free-brands-svg-icons';

export default class Footer extends Component {
  render() {
    return (
      <footer className='w-100 tealBG text-light '>
        <div className="container py-4">
          <div className="row py-5">
            <div className="col-md-4 text-center">
              <h2>Location</h2>
              <p>2215 John Daniel Drive</p>
              <p>Clark, MO 65243</p>
            </div>
            <div className="col-md-4 text-center">
              <h2 >AROUND THE WEB</h2>
              <ul className='d-flex list-unstyled justify-content-center align-items-center FooterList mt-3'>
                <li><FontAwesomeIcon className='' icon={fab.faFacebook} /></li>
                <li><FontAwesomeIcon className='' icon={fab.faTwitter} /></li>
                <li><FontAwesomeIcon className='' icon={fab.faLinkedin} /></li>
                <li><FontAwesomeIcon className='' icon={fa.faGlobe} /></li>
              </ul>
            </div>
            <div className="col-md-4 text-center">
              <h2>ABOUT FREELANCER</h2>
              <p>Freelance is free to use</p>
            </div>
          </div>
        </div>
        <div className="DarktealBG text-center py-3">
          Copyright © VetRo 2023
        </div>

      </footer>
    )
  }
}
