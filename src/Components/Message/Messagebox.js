import React from 'react'
import './Message.scss'
import { useCounter } from "../../Context/CartContext";
import Fade from 'react-reveal/Fade';

export default function Messagebox({Msg}) {
    const { UserName } = useCounter();

    return (
        <Fade bottom>
<div className="fullmsg">
        <div className={UserName===`${Msg.Name}` ?  "Message_box isYou" :  "sender Message_box" }>
               

            <h1>{Msg.Message}</h1>

        </div>


        <div className="Admin">
                    <div className="imgdiv">
                        <img src={Msg.DPLink} alt="" />
                    </div>
                  
                </div>


                </div>

                <div className="timestamp">

                {UserName===`${Msg.Name}` ?  <h2>You</h2> :  <h2>{Msg.Name}</h2> }
                    <h6>{Msg.Time}</h6>

                </div>

        </Fade>
    )
}
