import React, { useState, useEffect } from "react";
import "./Roommenu.scss";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import firebase from "../../DB/firebasedb";

export default function Roommenu() {
  let history = useHistory();
  const [data, setdata] = useState([]);
    //  eslint-disable-next-line 
  const [Sharelink, setSharelink] = useState("");
  const [Members, setMembers] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    firebase
      .database()
      .ref(`Chitchatz/Rooms/${name}/Admin`)
      .on("value", (snapshot) => {
        const todos = snapshot.val();
        setdata(todos);
        console.log(todos);
        setSharelink(`http://localhost:3000/isChatRoom/${todos.Roomname}`);
      });

    firebase
      .database()
      .ref(`Chitchatz/Rooms/${name}/Members`)
      .on("value", (snapshot) => {
        const Products_List = [];
        const todos = snapshot.val();

        for (let id in todos) {
          Products_List.push({ ...todos[id] });
        }
        setMembers(Products_List);
        console.log(Products_List);
      });
  }, [name]);
  function Goback(){
    history.push(`/`);
  }
  return (
    <div className="roommenu">
    <svg onClick={Goback} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      <div className="imgdiv">
        <img src={data.Grpimg} alt="" />
      </div>

      <div className="roominfo">
        <h1>{data.Roomname}</h1>
        {/*  eslint-disable-next-line */}
        <marquee scrollamount="5">
        <div className="Members">


        {Members ? Members.map((member, index) => <h6> {member.Name}  </h6>) : " "}

        </div>
        </marquee>
      </div>

      <div className="roombtns">
      
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
      
        <button>Leave_
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v18h-6M10 17l5-5-5-5M13.8 12H3"/></svg>
        </button>

        <div className="dots">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
        </div>
      </div>

    </div>
  );
}
