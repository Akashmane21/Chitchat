import React , {useState , useEffect} from 'react'
import './Chatroom.scss'
import firebase from '../../DB/firebasedb'
// import { useCounter } from "../../Context/CartContext";
// import {NavLink} from 'react-router-dom'
import { useHistory } from "react-router-dom";

export default function Chatroom({Rooms}) {
    let history = useHistory();
    // const { Roomdata, setRoomdata } = useCounter();
    const [Lastmsg, setLastmsg] = useState([])
    const [Members, setMembers] = useState([])
    const [moremem, setmoremem] = useState("")
    console.log(Rooms.id);

    const [Room, setRoom] = useState([])
    useEffect(() => {
        firebase.database()
        .ref(`Chitchatz/Rooms/${Rooms.RoomName}/Admin`)
        .on("value", ( snapshot) => {
          const todos = snapshot.val(); 
          console.log(Rooms.RoomName , todos);
          setRoom(todos)

         
        });
        firebase.database()
        .ref(`Chitchatz/Rooms/${Rooms.RoomName}/Members`)
        .on("value", (snapshot) => {
          const Products_List = [];
          const todos = snapshot.val(); 
       
    
          for (let id in todos) {
            Products_List.push({ ...todos[id] });
          }
      
          const lastmsg = Products_List.reverse()
          lastmsg.length=3
          setMembers(lastmsg)
         
   
        });


        firebase.database()
        .ref(`Chitchatz/Rooms/${Rooms.RoomName}/Members`)
        .on("value", (snapshot) => {
          const Products_List = [];
          const todos = snapshot.val(); 
       
    
          for (let id in todos) {
            Products_List.push({ ...todos[id] });
          }
          var memlength = Products_List.length
          if(memlength>3){
           
            setmoremem(`${memlength-3}+`)
          }
          else{
            setmoremem('')
          }
   
        });

        firebase
      .database()
      .ref(`Chitchatz/Rooms/${Rooms.RoomName}/Messages`)
      .on("value", (snapshot) => {
        const todos = snapshot.val();
        const Products_List = [];

        for (let id in todos) {
          Products_List.push({ ...todos[id] });
        }
        const lastmsg = Products_List.reverse()
        lastmsg.length=1
        console.log(lastmsg);
        setLastmsg(lastmsg)

      });



      }, [Rooms.RoomName]);


      function GO(){
        const room = Room.Roomname + "_" + Room.Password;

        history.push(`/ChatRoom/${room}`);
        localStorage.setItem("roomid" , Rooms.id)

      }
    return (
       
        <div className="overlay">
        <div className="chatbx" onClick={GO}>
     

        <div className="flex">

        
            <div className="imgdiv">
                <img src={Room.Grpimg} alt=" " />
               
            </div>

            <div className="members">
            <h6>Members</h6>
            <div className="memberno">

          
                {Members
                ? Members.map((member, index) => (
                  <>
                    <img src={member.DPLink} alt=" " />

                    </>
                  ))
                : " "}
                <div className="mem">

                <h6>{moremem}</h6>
                </div>
                </div>
                </div>
                </div>

            <div className="Chat_info">
                <h5>{Room.Roomname}</h5>

                {Lastmsg ?   Lastmsg.map((member, index) => (
                  <>
                  <h6>{member.Message}</h6>


                    </>
                  ))
                : " "}

            </div>
            <div className="date">
            {Lastmsg ?   Lastmsg.map((member, index) => (
                  <>
                  <h6>{member.date}</h6>
                <h6>{member.Time}</h6>

                    </>
                  ))
                : " "}
             
            </div>
            </div>
        </div>
    )
}
