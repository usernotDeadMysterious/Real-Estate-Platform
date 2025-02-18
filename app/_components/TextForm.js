import React from 'react'

export default function TextForm(props) {
  return (
    <div>  
        <h1>{props.heading}</h1>
        <div className="mybox">

        <textarea className="form-control" id="mybox" rows="8"></textarea>
        <button className="btn btn-primary">Convert to Uppercase</button>
        </div>
    </div>
  )
}
