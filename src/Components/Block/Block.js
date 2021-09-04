import React from 'react'
// import { useCounter } from "../../Context/CartContext";
import Create from '../Create/Create';
import './Block.scss'
export default function Block() {
    // const { Roomdata, setRoomdata } = useCounter();

    return (
        <div className="Chatblock">
          <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_pon5lxe5.json"  background="transparent"  speed="1" style={{ height: "400px"}}  loop  autoplay />
        <div className="Buttons">
            <Create />
        </div>
        </div>
    )
}
