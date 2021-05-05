import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch } from "react-router-dom";
import { DASHBOARD, HOME } from "./config/ROUTES_NAME";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

function App() {
  return (
    <div id="page-content">
      <Switch>
        <Route exact path={HOME}>
          <Home />
        </Route>
        <Route path={DASHBOARD}>
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
