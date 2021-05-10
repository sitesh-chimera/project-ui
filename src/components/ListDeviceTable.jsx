import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";

const ListDeviceTable = (props) => {
  const {
    devices,
    validationDeviceForMoreThanWeek,
    deleteDevice,
    CheckOutDevice,
    CheckInDevice,
    addFeedback,
  } = props;
  return (
    <>
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
    </>
  );
};

export default ListDeviceTable;
