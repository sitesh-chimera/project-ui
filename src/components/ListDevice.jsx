import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import moment from "moment";
import DeviceService from "../service/DeviceService";
import CheckIn from "./CheckOut";
import FeedbackDialog from "./FeedbackDialog";

const ListDevice = (props) => {
  const { data, onDone } = props;
  const [showCheckOut, setshowCheckOutModal] = useState(false);
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState({});
  const [lastWeekData, setlastWeeKData] = useState([]);

  const deleteDevice = (deviceId) => {
    try {
      DeviceService.removeDevice(deviceId).then((response) => {
        if (response) {
          onDone();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getWeekDate = () => {
    var weekDate = moment().subtract(8, "days").format("YYYY/MM/DD");
    setlastWeeKData(weekDate);
  };

  useEffect(() => {
    getWeekDate();
  }, []);

  const handleClose = () => setshowCheckOutModal(false);

  const handleCloseFeedback = () => setFeedbackDialog(false);
  const CheckOutDevice = (deviceDetails) => {
    setDeviceDetails(deviceDetails);
    setshowCheckOutModal(true);
  };

  const addFeedback = (deviceDetails) => {
    setDeviceDetails(deviceDetails);
    setFeedbackDialog(true);
  };

  const checkoutMoreThanWeek = (device) => {
    if (moment(device.lastCheckedOutDate).format("YYYY/MM/DD") < lastWeekData) {
      return "device-table-tr";
    } else {
      return 0;
    }
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
          {data.map((device, index) => (
            <tr key={device._id} className={checkoutMoreThanWeek(device)}>
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
                {device.isCheckedOut ? (
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
                <Button
                  variant="link"
                  className={`checkout-device_button-${index}`}
                  onClick={() => CheckOutDevice(device)}
                >
                  Check Out
                </Button>
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
      <CheckIn
        showCheckOut={showCheckOut}
        deviceDetails={deviceDetails}
        handleClose={handleClose}
        allDevices={data}
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
