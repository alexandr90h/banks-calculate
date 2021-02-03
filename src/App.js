import "./App.css";
import Navigation from "./Navigation/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import AddBankForm from "./AddBankForm/AddBankForm";
import Home from "./Home/Home";
import Calculate from "./Calculate/Calculate";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/banks">
          <AddBankForm />
        </Route>
        <Route path="/calculate">
          <Calculate />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
