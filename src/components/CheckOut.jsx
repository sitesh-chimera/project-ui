import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import CheckInOutService from "../service/CheckInOutService";
import DeviceContext from "../context/DeviceContext";

const CheckOut = (props) => {
  const { showCheckOut, deviceToUpdate, handleClose } = props;
  const { loadDevice } = useContext(DeviceContext);

  const [lastCheckOutBy, setlastCheckOutBy] = useState();

  const checkOutByName = (lastCheckOutBy) => {
    setlastCheckOutBy(lastCheckOutBy);
  };

  const saveCheckOut = async (e) => {
    e.preventDefault();

    const response = await CheckInOutService.checkOutDevice(
      deviceToUpdate._id,
      lastCheckOutBy
    );

    if (response.data.error) {
      alert(response.data.message);
    } else {
      alert(response.data.message);
      loadDevice();
      handleClose();
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
