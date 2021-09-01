import React from "react";
import '../Css/Auth.scss'
// import firebase from '../Config/Config'
import Authform from "../Components/Authform/Authform";

export default function Auth() {
    // console.log(firebase);
  return (
    <div>
 
      <div className="main">
        <div className="left_area">
          <h1>Welcome to ChitChatz</h1>
          <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_cdvdgap1.json"  background="transparent"  speed="1" style={{ height: "250px"}}  loop  autoplay />

        </div>

        <div className="right_area">
        {/* <div className="box"> */}
<Authform />
        {/* </div> */}
        </div>

      </div>
    </div>
  );
}
