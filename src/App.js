import "./App.css";
import GlobaldataProider from "./Context/CartContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import Auth from "./Pages/Auth";
import Room from "./Pages/Room";
import GuestAuth from "./Components/Authform/GuestAuth";

function App() {
  return (
    <GlobaldataProider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/Chat" component={Chat} /> */}
          <Route exact path='/isChatRoom/:name' component={Chat} />
          <Route exact path='/ChatRoom/:name' component={Room} />

          <Route exact path="/Auth" component={Auth} />
          <Route exact path="/GuestAuth" component={GuestAuth} />

        </Switch>
      </BrowserRouter>
    </GlobaldataProider>
  );
}

export default App;
