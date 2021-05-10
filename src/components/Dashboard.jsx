import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import DeviceModalDialog from "./DeviceModalDialog";
import ListDevice from "./ListDevice";

const Dashboard = () => {
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const resetDevice = () => {
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
        <ListDevice onDone={resetDevice} />

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
