import React from 'react'

export default function Loading() {
  return (

    <div className='loading'>
      <div id="loading">
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1" />
          <div className="sk-cube sk-cube2" />
          <div className="sk-cube sk-cube3" />
          <div className="sk-cube sk-cube4" />
          <div className="sk-cube sk-cube5" />
          <div className="sk-cube sk-cube6" />
          <div className="sk-cube sk-cube7" />
          <div className="sk-cube sk-cube8" />
          <div className="sk-cube sk-cube9" />
        </div>
      <h5 className='text-light w-50 text-center loadText'>If this takes longer than 1 minute; that means servers are waking up, Shhh!</h5>
      </div>
    </div>
  )
}
