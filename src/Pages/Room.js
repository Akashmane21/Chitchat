import React, { useState, useEffect } from "react";
import "../Css/Room.scss";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import firebase from "../DB/firebasedb";
import Roommenu from "../Components/Roommenu/Roommenu";
import { useCounter } from "../Context/CartContext";
import Messagebox from "../Components/Message/Messagebox";

export default function Room() {
  const { UserId } = useCounter();

  let history = useHistory();
  const { name } = useParams();
  // eslint-disable-next-line
  const [Data, setData] = useState([]);
  const [Admin, setAdmin] = useState(' ')
  const [Message, setMessage] = useState(" ")
  const [Userdata, setUserdata] = useState([])
  const [allMessages, setallMessages] = useState([ ])

  useEffect(() => {

  
    if (localStorage.getItem("auth") == null) {
      history.push("/GuestAuth");
    }


    firebase.database().ref(`Chitchatz/Users/${UserId}/Auth`)
   .on("value", (snapshot) => {
      const todos = snapshot.val();
      console.log(todos);
      setUserdata(todos)
    });

    firebase
    .database()
    .ref(`Chitchatz/Rooms/${name}/Admin`)
    .on("value", (snapshot) => {
      const todos = snapshot.val();
      setAdmin(todos.Name);
     
    });

    firebase
      .database()
      .ref(`Chitchatz/Rooms/${name}/Members`)
      .on("value", (snapshot) => {
        const todos = snapshot.val();
        const Products_List = [];

        for (let id in todos) {
          Products_List.push({ ...todos[id] });
        }
        setData(Products_List);
      });


      firebase
      .database()
      .ref(`Chitchatz/Rooms/${name}/Messages`)
      .on("value", (snapshot) => {
        const todos = snapshot.val();
        const Products_List = [];
        for (let id in todos) {
          Products_List.push({ ...todos[id] });
        }
        setallMessages(Products_List);
        console.log(Products_List);
        STB()
      });

      
    // eslint-disable-next-line
  }, []);

  function STB(){
    var myDiv = document.getElementById("msgs");
    myDiv.scrollTop = myDiv.scrollHeight;
    console.log("called");


  }

  function Send(){
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

    const Msg = {
      ...Userdata,
      Message : Message,
      Time:strTime,
      date:fulldate
    }

    console.log(Msg);
    firebase
    .database()
    .ref(`Chitchatz/Rooms/${name}/Messages`)
    .push(Msg);

    document.getElementById("msg").value="";
    
 
    var myDiv = document.getElementById("msgs");
    myDiv.scrollTop = myDiv.scrollHeight+100;


  }

  function handle(e){
    if(e.keyCode === 13){
      Send()
   }
  }


  return (
    <div className="room">
      <Roommenu />
      <div className="chatblock">
        <div className="Chatbox">
        <div className="msgs" id="msgs">
        {allMessages ? allMessages.map((MSG, index) => 
           <Messagebox Msg={MSG} />
            ) :" "}

        </div>
        <div className="send">
            <input id="msg" onKeyUp={handle} placeholder="Enter the Message here" onChange={e => setMessage(e.target.value)} />
          
            <button onClick={Send}>
            <i class="fas fa-paper-plane"></i>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg> */}
            </button>
        </div>
        </div>

        <div className="Chatmembers">
          <h1>Group Members</h1>

            {Data ? Data.map((member, index) => 
            <>
            <div className="Admin">

          
                {Admin===`${member.Name}` ? ( <h1>Admin</h1> ) : ( "")}
            <div className="Memberblock">
            
            <div className="imgdiv">
                <img src={member.DPLink} alt={member.Name}  />
                </div>
                <div className="mem_info">
                
            <h6> {member.Name}  </h6>
            <h2>{member.Phone}</h2>
                </div>
            </div>
            </div>
       </>
            ) : " "}

        </div>
      </div>
    </div>
  );
}
