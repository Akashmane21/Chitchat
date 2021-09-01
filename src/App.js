import "./App.css";
import GlobaldataProider from "./Context/CartContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import Auth from "./Pages/Auth";

function App() {
  return (
    <GlobaldataProider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Chat" component={Chat} />
          <Route exact path="/Auth" component={Auth} />
        </Switch>
      </BrowserRouter>
    </GlobaldataProider>
  );
}

export default App;
