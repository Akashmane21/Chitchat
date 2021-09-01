import React from 'react'
import './Chatroom.scss'

export default function Chatroom(props) {
    return (
        <div className="chatbx">
            <div className="imgdiv">
                <img src={props.Img} alt=" " />
            </div>

            <div className="Chat_info">
                <h5>Placements</h5>

                <h6>prepare for getPlaced</h6>
            </div>
        </div>
    )
}
