import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import DeviceService from "../service/DeviceService";

const Initialdata = {
  device: "",
  os: "",
  manufacturer: "",
};

const DeviceModalDialog = (props) => {
  const { show, handleClose, onDone } = props;
  const [deviceData, setDeviceData] = useState(Initialdata);

  const onInputChange = (value, name) => {
    setDeviceData({ ...deviceData, [name]: value });
  };

  const saveDevice = (e) => {
    e.preventDefault();
    DeviceService.createDevice(deviceData).then((res) => {
      if (res.data.error) {
        alert(res.data.message);
      } else {
        if (onDone) {
          alert("device saved.");
          onDone();
        }
      }
    });
  };

  return (
    <>
      <div>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header>
            <Modal.Title>Add Device</Modal.Title>
          </Modal.Header>
          <Form onSubmit={saveDevice}>
            <Modal.Body>
              <Form.Group controlId="formBasicDeviceName">
                <Form.Label>Device Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter device name"
                  onChange={(e) => onInputChange(e.target.value, "device")}
                />
              </Form.Group>

              <Form.Group controlId="formBasicOS">
                <Form.Label>Operating System</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Operating System	"
                  onChange={(e) => onInputChange(e.target.value, "os")}
                />
              </Form.Group>
              <Form.Group controlId="formBasicManufacturer">
                <Form.Label>Manufacturer</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Manufacturer"
                  onChange={(e) =>
                    onInputChange(e.target.value, "manufacturer")
                  }
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="save-device_button"
                variant="primary"
              >
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default DeviceModalDialog;
