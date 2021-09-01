import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../Css/Home.scss";
import { useCounter } from "../Context/CartContext";
import firebase from "../DB/firebasedb";

export default function Home() {
  let history = useHistory();
  const { UserId, UserName } = useCounter();
  const [Img, setImg] = useState("");
  const [Phone, setPhone] = useState("");

  useEffect(() => {
    if (localStorage.getItem("auth") == null) {
      history.push("/Auth");
    }
    const Products = firebase.database().ref(`Users/${UserId}/`);
    Products.on("value", (snapshot) => {
      const Products_List = [];
      const todos = snapshot.val();

      for (let id in todos) {
        Products_List.push({ ...todos[id] });
      }
      console.log(Products_List);

      setImg(Products_List[0].Link);
      setPhone(Products_List[0].Phone);
    });

    //   eslint-disable-next-line
  }, []);

  function logout() {
    localStorage.removeItem("authentication");
    history.push("/Auth");
  }

  return (
    <div>
    
    <div className="menu">
    <h1>Welcome {UserName} </h1>

      <button onClick={logout}>Logout_<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v18h-6M10 17l5-5-5-5M13.8 12H3"/></svg></button>
    </div>

      <div className="main">
        <div className="left">

        <div className="profile">

        
            <img src={Img} alt={UserName} />

            <div className="info">

            
            <h3>Name : </h3>
            <h4>{UserName}</h4>
            <h3>Phone : </h3>
            <h4>{Phone}</h4>
            </div>
            
</div>

        </div>

        <div className="right">
          <div className="box"></div>
        </div>
      </div>
    </div>
  );
}
