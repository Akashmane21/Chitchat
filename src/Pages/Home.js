import React , {useEffect} from 'react'
import { useHistory } from "react-router-dom";
import '../Css/Home.scss'

export default function Home() {
    let history = useHistory();

    useEffect(() => {
       if(localStorage.getItem("authentication")==null){
           history.push('/Auth') 
          }

    }, [history])


    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}
