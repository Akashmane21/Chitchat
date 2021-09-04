import React, { useState, useEffect } from "react";
import "../../Css/Home.scss";
import "./Create.scss";
// import { useHistory } from "react-router-dom";
import firebase from "../../DB/firebasedb";
import { useCounter } from "../../Context/CartContext";

export default function Create() {
  // let history = useHistory();
  const { UserId } = useCounter();

  var  roomimgurl ;
  var file = [];
  const [files, setfiles] = useState([])
  const [isselect, setisselect] = useState(false)
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [isuser, setisuser] = useState(false);
  const [userinfo, setuserinfo] = useState([])
  const [isJoin, setisJoin] = useState(false)

  useEffect(() => {
    firebase.database().ref(`Chitchatz/Users/${UserId}/`)
    .on("value", (snapshot) => {
      const Products_List = [];
      const todos = snapshot.val();

      for (let id in todos) {
        Products_List.push({ ...todos[id] });
      }
      setuserinfo(Products_List[0])
    });
// eslint-disable-next-line
  }, []);





  
  
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

    const name = username + "_" + password;

    firebase
    .database()
    .ref(`Chitchatz/Rooms/${name}/`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        const email = snapshot.val();
        console.log("exists!", email);
      } else {

console.log("clicked");

    if(files.length=== 0){
      setisselect(true)
  
    }
    else{
  
  
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
          roomimgurl = url;


        console.log("The User is Not exists");
        const d = new Date();
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
        var month = months[d.getMonth()];
        const date =  d.getDate();
        // const year = d.getFullYear();

        const fulldate = date+" "+month
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        


        firebase
          .database()
          .ref(`Chitchatz/Rooms/${name}/Admin`)
          .set({
           ...userinfo ,
           Grpimg : roomimgurl,
           Date : fulldate,
           Time : strTime,
           Roomname:username


          })
          .then((res) => {
           alert("Successfuly Created")

          });

          firebase
          .database()
          .ref(`Chitchatz/Users/${UserId}/Rooms`)
          .push({
           RoomName : name
          })
       


          firebase
          .database()
          .ref(`Chitchatz/Rooms/${name}/Members`)
          .push({
           ...userinfo
          })
    


   
  
    

        });
      }
    );

    }
         
}
});
  };


  function JoinRoom(){
    const name = username + "_" + password;

    firebase
    .database()
    .ref(`Chitchatz/Rooms/${name}/`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        firebase
          .database()
          .ref(`Chitchatz/Users/${UserId}/Rooms`)
          .push({
           RoomName : name
          })
          firebase
          .database()
          .ref(`Chitchatz/Rooms/${name}/Members`)
          .push({
           ...userinfo
          })
    

      } else {
setisuser(true)
      }})
  }


  function Create() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  function Join() {
    setisJoin(true)
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  function onclose() {
    var modal = document.getElementById("myModal");
    var mode = document.getElementById("join");
    modal.style.display = "none";
    mode.style.display = "none";
  }

  window.onclick = function (event) {
    // eslint-disable-next-line
    if (event.target == modal) {
      var modal = document.getElementById("myModal");
      var mod = document.getElementById("join");
      modal.style.display = "none";
      mod.style.display = "none";
    }
  };

  return (
    <div>
      <div className="Create_Join">
        <button onClick={Create} className="hidden">
          Crete Room_
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="orangered" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>        </button>

        <button onClick={Join} className="hidden">
          Join Room_
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="orangered" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>
        </button>

    
      </div>

      <div id="myModal" class="modal">
        <div class="modal-content">
          <span onClick={onclose} class="close">
            {" "}
            &times;
          </span>

          {isJoin ? (
            <h1>Join Chat Room</h1>

          ):(
            <h1>Create Chat Room</h1>

          )}


          <div className="Create">
          
          {isJoin ? (
            " "

          ):(
            <img
                  onClick={Chooseimg}
                  src="https://icon-library.com/images/add-person-icon/add-person-icon-17.jpg"
                  id="img"
                  alt=""
                />
          )}
               

                {isselect ? <h6>* Please Select The Image</h6> : " "}
             
            <label id="upprogress"></label>
<div className="Create_form">

         <h2>Room Name : </h2>
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

            <h2> Create Password : </h2>
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
              Password
              placeholder="Enter Password"
              onChange={(pass) => setpassword(pass.target.value)}
              required
            />
            <br />

            {isuser ? (
              <h4>Chat Room Not Found , Check Name or Password Again </h4>
            ) : (
              " "
            )}

            </div>
            
            {isJoin? (
              <button onClick={JoinRoom} className="register">
              Join Room
            </button>
            ) : (
              <button onClick={Upload} className="register">
              Create Room
            </button>
            )}
            

         
          </div>
        </div>
      </div>

      <div id="join" class="modal">
        <div class="modal-content">
          <span onClick={onclose} class="close">
            {" "}
            &times;
          </span>
          <h1>Join</h1>

        </div>
      </div>
    </div>
  );
}
