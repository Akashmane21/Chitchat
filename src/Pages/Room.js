import React , {useState , useEffect} from 'react'
import '../Css/Room.scss'
import {useParams} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import firebase from "../DB/firebasedb";
import Roommenu from '../Components/Roommenu/Roommenu';


export default function Room() {
    let history = useHistory();
    const { name } =useParams();
    // eslint-disable-next-line
    const [Data, setData] = useState([ ])

    useEffect(() => {
        if (localStorage.getItem("auth") == null) {
            history.push("/GuestAuth");
          }

        firebase.database()
        .ref(`Chitchatz/Rooms/${name}/Members`)
        .on("value", (snapshot) => {
          const todos = snapshot.val();
          const Products_List = [];
  
          for (let id in todos) {
            Products_List.push({ ...todos[id] });
          }
          setData(Products_List);
          console.log(Products_List);
         
        });
        // eslint-disable-next-line
    }, [])

   


  
    return (
        <div className="room">
        <Roommenu   />
           


        </div>
    )
}
