import React, { useState , useEffect } from "react";
// import {NavLink} from 'react-router-dom'
import firebase from '../../DB/firebasedb'
import "./Authform.scss";

function GuestAuth() {
  var  ImgUrl ;
  var file = [];
  const [files, setfiles] = useState([])
  const [isselect, setisselect] = useState(false)
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [Phone, setPhone] = useState(" ");
  const [isLogin, setisLogin] = useState(false);
  const [isuser, setisuser] = useState(false);

useEffect(() => {

  if(files.length=== 0){
    console.log("Lenth is 0");

  }
  else{
    console.log("image selected");

  }
         //   eslint-disable-next-line 
}, [])
  function Login() {
    setisLogin(true);
  }
  function Register() {
    setisLogin(false);
  }



  
  const Chooseimg = (e) => {
    var input = document.createElement("input");
    input.type = "file";
    input.id = "fileInput"

    input.onchange = (e) => {
      file = e.target.files;
     setfiles(file[0])

      var reader = new FileReader();
      reader.onload = function () {
        document.getElementById("img").src = reader.result;
      };
      reader.readAsDataURL(file[0]);
    };
    input.click();
  };









  

  const Upload = () => {
console.log("clicked");

    if(files.length=== 0){
      setisselect(true)
  
    }
    else{
  
  
    const name = username + "_" + password;
    console.log(file[0]);
console.log(files);

    console.log(" upload clicked");
    var uploadTask = firebase
      .storage()
      .ref("Image/" + username )
      .put(files);
    

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById("upprogress").innerHTML =
          "Uploading" + progress + "%";
      },

      // --------Error Handling-------------------------------

      function (err) {
        alert("Error to Saving the Image");
      },

      // ------------Submit image into Database---------------
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
            console.log(url);
          ImgUrl = url;


    firebase
    .database()
    .ref(`Chitchatz/Users/${name}/`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        const email = snapshot.val();
        console.log("exists!", email);
      } else {
        console.log("The User is Not exists");
        firebase
          .database()
          .ref(`Chitchatz/Users/${name}/Auth`)
          .set({
            Name: username,
            Password: password,
            Phone: Phone,
            
            DPLink: ImgUrl,

          })
          .then((res) => {
            localStorage.setItem("auth", "True");
            localStorage.setItem("id", name);
            localStorage.setItem("Name", username);

            window.history.back();


          });
      }
    });
    

        });
      }
    );

    }
  };





  function Signin() {
    const name = username + "_" + password;
    console.log(name);

    firebase
      .database()
      .ref(`Chitchatz/Users/${name}/`)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
        
              localStorage.setItem("auth", "True");
              localStorage.setItem("id", name);
              localStorage.setItem("Name", username);

              window.history.back();
              console.log("Account Created");

          
        } else {
          console.log("The User is Not exists");
          setisuser(true);
        }
      });
  }


 

  return (
    <div className="Auth_page">
      <div className="Auth">
    
          <div className="form">
            <div className="poster">

            </div>

           

            
            {isLogin ? (
              <center>
                {" "}
                {/* eslint-disable-next-line */}
                <h4></h4>

                <h2>-- Sign in --</h2>
              </center>
            ) : (
              <center>
                {" "}
                {/* eslint-disable-next-line */}
                <h4></h4>
                <h2>-- Sign up --</h2>
              </center>
            )}


            <div className="formdata">
            {isLogin ? ( " ") : ( 
              <>
              <img onClick={Chooseimg} src="https://icon-library.com/images/add-person-icon/add-person-icon-17.jpg" id="img" alt="" />

{isselect ? ( 
<h6>* Please Select The Image</h6>

) : ( " ")}
</>
            ) }
             <label id="upprogress"></label>




            <h2>Name : </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="gray"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input
              placeholder="Enter Name"
              onChange={(name) => setusername(name.target.value)}
              required
            />

            {isLogin ? (
              ""
            ) : (
              <>
                <h2>Phone Number :</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="gray"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <input
                  placeholder="Enter Phone Number :"
                  onChange={(number) => setPhone(number.target.value)}
                  required
                />
              </>
            )}

            <h2>Password : </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="gray"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              password={true}
              placeholder="Enter Password"
              onChange={(pass) => setpassword(pass.target.value)}
              required
            />
            <br />
            <hr />
            {isuser ? (
              <h4>User Not Found , Check Name or Password Again </h4>
            ) : (
              " "
            )}

            {isLogin ? (
              <button onClick={Signin}  className="register">
                Login
              </button>
            ) : (
              
              <button onClick={Upload} className="register">
                Register
              </button>
            )}

            <hr />

            {isLogin ? (
              <h6>
                Don't Have a Account ? <span onClick={Register}>Register</span>
              </h6>
            ) : (
              <h6>
                Already Have a Account ? <span onClick={Login}>Login</span>
              </h6>
            )}
            </div>
          </div>
        {/* </Fade> */}
      </div>
    </div>
  );
}

export default GuestAuth;
