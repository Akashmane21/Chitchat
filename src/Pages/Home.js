import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../Css/Home.scss";
import { useCounter } from "../Context/CartContext";
import firebase from "../DB/firebasedb";
import Chatroom from "../Components/Chatrooms/Chatroom";
import Block from "../Components/Block/Block";

export default function Home() {
  let history = useHistory();
  const { UserId, UserName } = useCounter();
  const [Img, setImg] = useState("");
  const [Phone, setPhone] = useState("");
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

      const Room_List = [];
      const Rooms = Products_List[1];

      for (let id in Rooms) {
        Room_List.push({ id, ...Rooms[id] });
      }
      const reversed = Room_List.reverse();

      setRoomlist(reversed);
    });

    //   eslint-disable-next-line
  }, []);

  function logout() {
    localStorage.removeItem("auth");
    history.push("/Auth");
  }

  return (
    <div>
      <div className="menu">
        <h1>ChitCh@tz_
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="orangered" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </h1>
        <div className="log">
          <button onClick={logout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 3h6v18h-6M10 17l5-5-5-5M13.8 12H3" />
            </svg>
          </button>
        </div>

        <div className="btns">
      
        <button onClick={logout} className="hidden">
          Logout_
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
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

          <div className="Chatrooms">
            <h2>
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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              _Your Chat-rooms{" "}
            </h2>
            <hr />
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
    </div>
  );
}
