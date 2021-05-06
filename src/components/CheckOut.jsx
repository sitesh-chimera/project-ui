import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import DeviceService from "../service/DeviceService";
import { endTime, startTime } from "../config/api-config";

const CheckOut = (props) => {
  const { showCheckOut, deviceDetails, handleClose } = props;
  const [lastCheckOutBy, setlastCheckOutBy] = useState();
  const checkCheckoutTime = (e) => {
    let currentDate = new Date();
    let startDate;
    startDate = new Date(currentDate.getTime());
    startDate.setHours(startTime.split(":")[0]);
    startDate.setMinutes(startTime.split(":")[1]);
    startDate.setSeconds(startTime.split(":")[2]);
    let endDate;
    endDate = new Date(currentDate.getTime());
    endDate.setHours(endTime.split(":")[0]);
    endDate.setMinutes(endTime.split(":")[1]);
    endDate.setSeconds(endTime.split(":")[2]);
    let valid = startDate < currentDate && endDate > currentDate;
    return valid;
  };

  const checkOutByName = (lastCheckOutBy) => {
    setlastCheckOutBy(lastCheckOutBy);
  };

  const saveCheckOut = async (e) => {
    e.preventDefault();

    if (checkCheckoutTime()) {
      const response = await DeviceService.checkOutDevice(
        deviceDetails._id,
        lastCheckOutBy
      );
      console.log(response);
      if (response) {
        window.location.reload();
      } else {
        alert("checkout is done with the same name try another");
      }
    } else {
      alert("check out can performed between 9:00 AM to 17:00 AM");
    }
  };

  return (
    <Modal show={showCheckOut} onHide={handleClose} animation={false}>
      <Badge variant="danger">
        check out can performed between 9:00 AM to 17:00 AM
      </Badge>{" "}
      <Modal.Header>
        <Modal.Title>check out form</Modal.Title>
      </Modal.Header>
      <Form onSubmit={saveCheckOut}>
        <Modal.Body>
          <Form.Group controlId="formBasicCheckOutBy">
            <Form.Label>Check Out By</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => checkOutByName(e.target.value)}
              placeholder="Check out user name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="save-checkout_button"
            variant="primary"
          >
            Check Out
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CheckOut;
