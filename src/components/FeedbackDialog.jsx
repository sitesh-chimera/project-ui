import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FeedbackService from "../service/FeedbackService";
import DeviceContext from "../context/DeviceContext";

const FeedbackDialog = (props) => {
  const { show, deviceToUpdate, handleClose } = props;
  const [feedback, setFeedback] = useState();
  const { loadDevice } = useContext(DeviceContext);

  const saveFeedBack = async (e) => {
    e.preventDefault();
    const response = await FeedbackService.addFeedBack(
      deviceToUpdate._id,
      feedback
    );
    if (response) {
      alert("Feedback saved.");
      loadDevice();
      handleClose();
    } else {
      alert("something went erong plase try again");
    }
  };

  const onFeedBackChange = (feedback) => {
    setFeedback(feedback);
  };

  return (
    <>
      <div>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header>
            <p>
              Feedback :
              {deviceToUpdate.feedback
                ? " " + deviceToUpdate.feedback
                : " No previous feedback available"}
            </p>
          </Modal.Header>
          <Form onSubmit={saveFeedBack}>
            <Modal.Body>
              <Form.Group controlId="formBasicfeedback">
                <Form.Label>Enter your Feedback</Form.Label>
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
                Cancel
              </Button>
              <Button
                type="submit"
                className="save-feedback_button"
                variant="primary"
              >
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default FeedbackDialog;
