import React , {useState , useEffect} from 'react'
import '../Css/Room.scss'
import {useParams} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import firebase from "../DB/firebasedb";


export default function Room() {
    let history = useHistory();
    const { name } =useParams();
    const [Data, setData] = useState([ ])
    const [Sharelink, setSharelink] = useState('')

    useEffect(() => {
        firebase.database()
        .ref(`Chitchatz/Rooms/${name}/Admin`)
        .on("value", (snapshot) => {
          const todos = snapshot.val();
          setData(todos)
          setSharelink(`http://localhost:3000/isChatRoom/${todos.Roomname}`)
         
        });
    }, [name])

    function Share(){
        navigator.clipboard.writeText(Sharelink);
        alert("Copied")

    }

    function Home(){

        history.push(`/`);

}
  
    return (
        <div>
            <h1>{Data.Roomname}</h1>

            <h1 onClick={Share}>{Sharelink}</h1>
            <h1 onClick={Home}>Home</h1>

        </div>
    )
}
