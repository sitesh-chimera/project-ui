import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FeedbackService from "../service/FeedbackService";

const FeedbackDialog = (props) => {
  const { show, deviceDetails, handleClose } = props;
  const [feedback, setFeedback] = useState();
  console.log("deviceDetails");
  console.log(deviceDetails);
  const saveFeedBack = async (e) => {
    e.preventDefault();
    const response = await FeedbackService.addFeedBack(
      deviceDetails._id,
      feedback
    );
    if (response) {
      window.location.reload();
    } else {
      alert("something went erong plase try again");
    }
  };

  const onFeedBackChange = (feedback) => {
    setFeedback(feedback);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            <p>
              previous Feedback :
              {deviceDetails.feedback
                ? " " + deviceDetails.feedback
                : " No previous feedback available"}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={saveFeedBack}>
          <Modal.Body>
            <Form.Group controlId="formBasicfeedback">
              <Form.Label>Feedback Form</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => onFeedBackChange(e.target.value)}
                placeholder="Enter feedback"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              type="submit"
              className="save-feedback_button"
              variant="primary"
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default FeedbackDialog;
