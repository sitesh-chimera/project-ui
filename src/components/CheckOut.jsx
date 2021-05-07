import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import DeviceService from "../service/DeviceService";
import { endTime, startTime } from "../config/constant";
import moment from "moment";

const CheckOut = (props) => {
  const { showCheckOut, deviceDetails, handleClose } = props;
  const [lastCheckOutBy, setlastCheckOutBy] = useState();

  const checkCheckoutTime = (e) => {
    const format = "hh:mm:ss";
    // var time = moment() gives you current time. no format required.
    const time = moment(moment(), format),
      checkOutstartTime = moment(startTime, format),
      checkOutEndTime = moment(endTime, format);

    if (time.isBetween(checkOutstartTime, checkOutEndTime)) {
      return true;
    } else {
      return false;
    }
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
