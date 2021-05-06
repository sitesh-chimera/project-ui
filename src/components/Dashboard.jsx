import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import DeviceService from "../service/DeviceService";
import DeviceModalDialog from "./DeviceModalDialog";
import ListDevice from "./ListDevice";

const Dashboard = () => {
  const [devices, setDevice] = useState([]);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);

  const loadDevice = async () => {
    const response = await DeviceService.getAllDevice();
    if (response) {
      setDevice(response);
    }
  };

  const handleShow = () => {
    if (devices.length >= 10) {
      alert("max 10 entry allowed");
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    loadDevice();
  }, []);

  const resetDevice = () => {
    loadDevice();
    setShow(false);
  };

  return (
    <>
      <div>
        <Button
          variant="primary"
          className="add-device_button"
          onClick={handleShow}
        >
          Add device
        </Button>
        <ListDevice data={devices} onDone={resetDevice} />
        <DeviceModalDialog
          show={show}
          handleClose={handleClose}
          onDone={resetDevice}
        />
      </div>
    </>
  );
};

export default Dashboard;
