import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import DeviceService from "../service/DeviceService";
import DeviceModalDialog from "./DeviceModalDialog";
import ListDevice from "./ListDevice";

const Dashboard = () => {
  const [devices, setDevice] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const loadDevice = async () => {
    const response = await DeviceService.getAllDevice();
    if (response) {
      setDevice(response);
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
        <ListDevice data={devices} />
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
