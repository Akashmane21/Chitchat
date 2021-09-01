import { useState, createContext, useContext } from "react";

const Globaldata = createContext();

export const useCounter = () => useContext(Globaldata);

function GlobaldataProider(props) {

  const Username = localStorage.getItem("Name");
  // eslint-disable-next-line
  const [UserName, setUserName] = useState(Username);

  const userid = localStorage.getItem("id");
  // eslint-disable-next-line
  const [UserId, setUserId] = useState(userid);



  const value = { UserId, UserName};

  return (
    <Globaldata.Provider value={value}>{props.children}</Globaldata.Provider>
  );
}

export default GlobaldataProider;
