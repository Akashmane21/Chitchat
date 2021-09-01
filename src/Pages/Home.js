import React , {useEffect , useState} from 'react'
import { useHistory } from "react-router-dom";
import '../Css/Home.scss'
import {useCounter} from '../Context/CartContext'
import firebase from '../DB/firebasedb'

export default function Home() {
    let history = useHistory();
    const {UserId , UserName} = useCounter()
    const [Img, setImg] = useState("")
    const [Phone, setPhone] = useState("")


    useEffect(() => {
       if(localStorage.getItem("auth")==null){
           history.push('/Auth') 
          }
          const Products = firebase.database().ref(`Users/${UserId}/`);
          Products.on("value", (snapshot) => {
            const Products_List = [];
            const todos = snapshot.val();
           
            for (let id in todos) {
              Products_List.push({ ...todos[id] });
            }
            console.log(Products_List);

            setImg(Products_List[0].Link)
            setPhone(Products_List[0].Phone)
           
          });

        //   eslint-disable-next-line
    }, [])

    function logout(){
        localStorage.removeItem("authentication")
        history.push('/Auth')
    }

    return (
        <div>
            <h1>Home Page</h1>
            <h1>{UserId} {UserName}</h1>
            <img src={Img} alt={UserName} />
            <h1>{Phone}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
