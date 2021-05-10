import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch } from "react-router-dom";
import { DASHBOARD, HOME } from "./config/ROUTES_NAME";
import Dashboard from "./components/Dashboard";
import DeviceContext from "./context/DeviceContext";
import { useEffect, useState } from "react";
import DeviceService from "./service/DeviceService";

function App() {
  const [devices, setDevice] = useState([]);

  const loadDevice = async () => {
    const response = await DeviceService.getAllDevice();
    if (response) {
      setDevice(response);
    }
  };

  useEffect(() => {
    loadDevice();
  }, []);

  return (
    <DeviceContext.Provider value={{ devices, loadDevice }}>
      <div id="page-content">
        <Switch>
          <Route path={DASHBOARD}>
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </DeviceContext.Provider>
  );
}

export default App;
