import React from "react";
import Table from "react-bootstrap/Table";

const ListDevice = (props) => {
  const { data } = props;
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
          </tr>
        </thead>
        <tbody>
          {data.map((device) => (
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
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ListDevice;
