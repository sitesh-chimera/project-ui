import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import moment from "moment";
import CheckOut from "./CheckOut";
import FeedbackDialog from "./FeedbackDialog";
import DeviceService from "../service/DeviceService";
import CheckInOutService from "../service/CheckInOutService";
import DeviceContext from "../context/DeviceContext";

const ListDevice = (props) => {
  const { onDone } = props;
  const { devices, loadDevice } = useContext(DeviceContext);
  const [showCheckOut, setshowCheckOutModal] = useState(false);
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [deviceToUpdate, setDeviceToUpdate] = useState({});
  const [lastWeekData, setlastWeeKData] = useState([]);

  const handleClose = () => setshowCheckOutModal(false);

  const handleCloseFeedback = () => setFeedbackDialog(false);

  const deleteDevice = (deviceId) => {
    if (window.confirm("Are you sure want to delete this device?")) {
      try {
        DeviceService.removeDevice(deviceId).then((response) => {
          if (response) {
            loadDevice();
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getWeekDate = () => {
    const weekDate = moment().subtract(8, "days").format("YYYY/MM/DD");
    setlastWeeKData(weekDate);
  };

  useEffect(() => {
    getWeekDate();
  }, []);

  // handling open modal for checkout device
  const CheckOutDevice = (device) => {
    setDeviceToUpdate(device);
    setshowCheckOutModal(true);
  };

  // handling open modal for feedback
  const addFeedback = (device) => {
    setDeviceToUpdate(device);
    setFeedbackDialog(true);
  };

  // checking date validation if more than a week
  const validationDeviceForMoreThanWeek = (device) => {
    if (moment(device.lastCheckedOutDate).format("YYYY/MM/DD") < lastWeekData) {
      return "device-table-tr";
    } else {
      return 0;
    }
  };

  // handling checkin operation
  const CheckInDevice = (deviceId) => {
    CheckInOutService.checkInDevice(deviceId).then((response) => {
      if (response) {
        alert(response.data.message);
        onDone();
        loadDevice();
      }
    });
  };

  return (
    <>
      <p className="ml-5">
        colored row has been checked out for more than a week or older than{" "}
        {lastWeekData}
      </p>
      <Table striped bordered hover className="device-table">
        <thead>
          <tr>
            <th>Device</th>
            <th>OS</th>
            <th>Manufacturer</th>
            <th>lastCheckedOutDate</th>
            <th>lastCheckedOutBy</th>
            <th>CheckedOut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="device-table-header">
          {devices.map((device, index) => (
            <tr
              key={device._id}
              className={validationDeviceForMoreThanWeek(device)}
            >
              <td>{device.device}</td>
              <td>{device.os}</td>
              <td>{device.manufacturer}</td>
              <td>
                {device.lastCheckedOutDate
                  ? device.lastCheckedOutDate
                  : "Not available"}
              </td>
              <td>
                {device.lastCheckedOutBy
                  ? device.lastCheckedOutBy
                  : "Not Availble"}
              </td>
              <td>
                {device.isCheckedOut == 2 ? (
                  <Badge variant="success">Yes</Badge>
                ) : (
                  <Badge variant="warning">No</Badge>
                )}
              </td>

              <td>
                <Button
                  variant="link"
                  className={`delete-device_button-${index}`}
                  onClick={() => deleteDevice(device._id)}
                >
                  Remove
                </Button>
                {device.isCheckedOut == 1 && (
                  <Form.Group controlId="checkout">
                    <Form.Control
                      required
                      as="select"
                      onChange={() => CheckOutDevice(device)}
                    >
                      <option value="">Select to proceed</option>
                      <option key={1} value="check-out">
                        check out
                      </option>
                    </Form.Control>
                  </Form.Group>
                )}

                {(device.isCheckedOut == 2 || device.isCheckedOut == 0) && (
                  <Form.Group controlId="checkin">
                    <Form.Control
                      name="check-in"
                      required
                      as="select"
                      onChange={() => CheckInDevice(device._id)}
                    >
                      <option value="">Select to proceed</option>
                      <option key={1} value="check-in">
                        check In
                      </option>
                    </Form.Control>
                  </Form.Group>
                )}

                <Button
                  className={`add-feedback_button-${index}`}
                  variant="link"
                  onClick={() => addFeedback(device)}
                >
                  Add Feedback
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CheckOut
        showCheckOut={showCheckOut}
        deviceToUpdate={deviceToUpdate}
        handleClose={handleClose}
        allDevices={devices}
      />
      <FeedbackDialog
        show={feedbackDialog}
        deviceToUpdate={deviceToUpdate}
        handleClose={handleCloseFeedback}
      />
    </>
  );
};

export default ListDevice;
