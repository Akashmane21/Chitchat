import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../Css/Home.scss";
import { useCounter } from "../Context/CartContext";
import firebase from "../DB/firebasedb";
import Chatroom from "../Components/Chatrooms/Chatroom";
import Block from "../Components/Block/Block";
import Dp from "../Skeleton/Dp";

export default function Home() {
  let history = useHistory();
  const { UserId, UserName } = useCounter();
  const [Img, setImg] = useState("");
  const [Phone, setPhone] = useState("");
  const [isload, setisload] = useState(true)
  const [Roomlist, setRoomlist] = useState([]);
 
  useEffect(() => {
    if (localStorage.getItem("auth") == null) {
      history.push("/Auth");
    }
    const Products = firebase.database().ref(`Chitchatz/Users/${UserId}/`);
    Products.on("value", (snapshot) => {
      const Products_List = [];
      const todos = snapshot.val();

      for (let id in todos) {
        Products_List.push({ ...todos[id] });
      }

      setImg(Products_List[0].DPLink);
      console.log(Products_List[0].DPLink);
      setPhone(Products_List[0].Phone);
      setisload(false)

      const Room_List = [];
      const Rooms = Products_List[1];

      for (let id in Rooms) {
        Room_List.push({ id, ...Rooms[id] });
      }
      const reversed = Room_List.reverse();

      setRoomlist(reversed);
      console.log(reversed);
    });

    //   eslint-disable-next-line
  }, []);

  function logout() {
    localStorage.removeItem("auth");
    history.push("/Auth");
  }

  function Add(){
    history.push("/Create");

  }

  function Profile() {
    var modal = document.getElementById("profile");
    modal.style.display = "block";
  }

  function onclose() {
    var modal = document.getElementById("profile");
  
    modal.style.display = "none";
  }

  return (
    <div>
      <div className="menu">
        <h1>ChitChatz
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="orangered" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> */}
        </h1>
        <div className="log">
        <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="orangered" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>

                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                
                {/* eslint-disable-next-line */}
                <li><i class="fas fa-user"></i><a class="dropdown-item" href="#" onClick={Profile}>Profile</a></li>
                 {/* eslint-disable-next-line */}
                  <li><i class="fas fa-comment-medical"></i><a class="dropdown-item" href="#" onClick={Add}>Create Room </a></li>
                                  {/* eslint-disable-next-line */}
                  <li><i class="fas fa-comments"></i><a class="dropdown-item" href="#" onClick={Add}>Join Room </a> </li>
                                  {/* eslint-disable-next-line */}
                  <li><i Style={{color:"red"}} class="fas fa-sign-out-alt"></i>  <a class="dropdown-item  logout" href="#" onClick={logout}>Logout  
                     </a>
                     
                     
                     </li>
                </ul>
              </div>

       

        </div>

        <div className="btns">
      
        <button onClick={logout} className="hidden">
         
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="orangered"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 3h6v18h-6M10 17l5-5-5-5M13.8 12H3" />
          </svg>
        </button>
      </div>
        
      </div>

      <div className="main">
        <div className="left">

{isload ? (
 ""
) : ( 
  <div className="profile">
            <div className="imgdiv">
              <img src={Img} alt={UserName} />
            </div>

            <div className="info">
              <h4>{UserName}</h4>
              <h4>{Phone}</h4>
            </div>
            <hr />
          </div>
)}
         

          


          <div className="Add" onClick={Add}>

          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>          </div>



          <div className="Chatrooms">
            <h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="gray"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              _Your Chat-rooms{" "}
            </h2>
        
            <hr />

            
{isload ? (
  <>
  <Dp />
  <Dp /> <Dp /> <Dp /> <Dp />
  {/* <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_8y9IYf.json"  background="transparent"  speed="1" style={{ height: "400px"}}  loop  autoplay /> */}
  </>
) : (
""
)}

            <div className="Rooms">
              {Roomlist
                ? Roomlist.map((room, index) => (
                    <Chatroom Rooms={room} key={index} />
                  ))
                : " "}
            </div>
          </div>
        </div>

        <div className="right">
          <div className="block">
           <Block />
          </div>
        </div>
      </div>




      <div id="profile" class="modal">
        <div class="modal-content">
          <span onClick={onclose} class="close">
            {" "}
            &times;
          </span>
          <h1>Profile</h1>
          <div className="profile3">
            <div className="imgdiv">
              <img src={Img} alt={UserName} />
            </div>

            <div className="info">
              <h4>{UserName}</h4>
              <h4>{Phone}</h4>
            </div>
            <hr />
          </div>
        </div>
      </div>

    


    </div>
  );
}
