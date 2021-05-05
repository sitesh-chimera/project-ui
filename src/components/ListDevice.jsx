import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import DeviceService from "../service/DeviceService";
import CheckIn from "./CheckIn";

const ListDevice = (props) => {
  const { data, onDone } = props;
  const [showCheckIn, setShowCheckInModal] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState({});

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

  const handleClose = () => setShowCheckInModal(false);

  const CheckInDevice = (deviceDetails) => {
    setDeviceDetails(deviceDetails);
    setShowCheckInModal(true);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Device</th>
            <th>OS</th>
            <th>Manufacturer</th>
            <th>lastCheckedOutDate</th>
            <th>lastCheckedOutBy</th>
            <th>isCheckedOut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((device, index) => (
            <tr key={device._id}>
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
              <td>{device.isCheckedOut ? "Yes" : "No"}</td>
              <td>
                <Button
                  style={{ marginRight: "16px" }}
                  variant="danger"
                  className={`delete-device_button-${index}`}
                  onClick={() => deleteDevice(device._id)}
                >
                  Remove
                </Button>
                <Button variant="danger" onClick={() => CheckInDevice(device)}>
                  Check In
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CheckIn
        showCheckIn={showCheckIn}
        deviceDetails={deviceDetails}
        handleClose={handleClose}
      />
    </>
  );
};

export default ListDevice;
