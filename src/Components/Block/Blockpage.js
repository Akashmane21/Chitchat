import React from 'react'
import Block from './Block'
import './Block.scss'
import { useHistory } from "react-router-dom";

export const Blockpage = () => {
    let history = useHistory();

    return (
        <div>
        <div className="header" onClick={()=> history.push("/") }>
            <h3><i class="fas fa-arrow-left"></i>go Back</h3>
        </div>
            <Block />
        </div>
    )
}
