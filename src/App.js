import "./App.css";
import Navigation from "./Navigation/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import AddBankForm from "./AddBankForm/AddBankForm";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/banks">
          <AddBankForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
