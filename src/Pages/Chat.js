import React , {useState , useEffect} from 'react'
import '../Css/Chat.scss'
import {useParams} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import firebase from "../DB/firebasedb";
import { useCounter } from "../Context/CartContext";

export default function Chat() {
    let history = useHistory();
    const { name } =useParams();
    const { UserId} = useCounter();
    const [userinfo, setuserinfo] = useState([])

    const [isroom, setisroom] = useState(false)
    const [Password, setPassword] = useState('')
useEffect(() => {
    if (localStorage.getItem("auth") == null) {
        history.push("/GuestAuth");
      }
      else{

      }

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
}, [])


function Check(){
    const Room = name + "_" + Password;

    firebase
    .database()
    .ref(`Chitchatz/Rooms/${Room}/`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
          history.push(`/ChatRoom/${Room}`);

          firebase
          .database()
          .ref(`Chitchatz/Users/${UserId}/Rooms`)
          .push({
           RoomName : Room
          })

          firebase
          .database()
          .ref(`Chitchatz/Rooms/${Room}/Members`)
          .push({
           ...userinfo
          })
    
      } else {
        setisroom(true)
      }})
}


    return (
        <div className="isChat">
        
            <div className="Pass">
            <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_xf9ppc6p.json"  background="transparent"  speed="1" style={{ height: "300px"}}  loop  autoplay />

                <input placeholder="Enter the Password" onChange= {e => setPassword(e.target.value)} />
                <button onClick={Check}>Submit</button>
                {isroom ? ( 
                    <h1>Wrong Password</h1>
                ): ( 
""
                )}
               
            </div>

       
        </div>
    )
}
