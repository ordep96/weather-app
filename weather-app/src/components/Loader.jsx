import React from 'react';

let loader = {
 textAlign:"center",
 width:200,
 margin:"auto",
 color:"#fff"
}

let styleImg = {
  width:100,
  margin:"auto",
}

const Loader = (props) => (

  <div style={loader} className="loader">
    <img style={ styleImg }  src={props.logo} alt=""/>
    <p>{props.title}</p>
  </div>

)

export default Loader;