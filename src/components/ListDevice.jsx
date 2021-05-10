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
  const { data, onDone } = props;
  const [showCheckOut, setshowCheckOutModal] = useState(false);
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState({});
  const [lastWeekData, setlastWeeKData] = useState([]);
  const { devices, loadDevice } = useContext(DeviceContext);

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

  const handleClose = () => setshowCheckOutModal(false);

  const handleCloseFeedback = () => setFeedbackDialog(false);

  // handling open modal for checkout device
  const CheckOutDevice = (deviceDetails) => {
    setDeviceDetails(deviceDetails);
    setshowCheckOutModal(true);
  };

  // handling open modal for feedback
  const addFeedback = (deviceDetails) => {
    setDeviceDetails(deviceDetails);
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

                {/* 0 normal 1 check In 
                2 check out */}

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

                {/* <Dropdown id="checkInOut">
                  <Dropdown.Toggle />
                  <Dropdown.Menu>
                    {device.isCheckedOut == 1 && (
                      <Dropdown.Item key="check-out" href="#">
                        <span onClick={() => CheckOutDevice(device)}>
                          Check Out
                        </span>
                      </Dropdown.Item>
                    )}

                    {(device.isCheckedOut == 2 || device.isCheckedOut == 0) && (
                      <Dropdown.Item key="check-in" href="#">
                        <span onClick={() => CheckInDevice(device._id)}>
                          Check In{" "}
                        </span>
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown> */}
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
        deviceDetails={deviceDetails}
        handleClose={handleClose}
        allDevices={devices}
      />
      <FeedbackDialog
        show={feedbackDialog}
        deviceDetails={deviceDetails}
        handleClose={handleCloseFeedback}
      />
    </>
  );
};

export default ListDevice;
