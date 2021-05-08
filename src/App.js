import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch } from "react-router-dom";
import { DASHBOARD, HOME } from "./config/ROUTES_NAME";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div id="page-content">
      <Switch>
        <Route path={DASHBOARD}>
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
