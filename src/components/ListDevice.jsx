import React, { useContext, useEffect, useState } from "react";

import moment from "moment";
import CheckOut from "./CheckOut";
import FeedbackDialog from "./FeedbackDialog";
import DeviceService from "../service/DeviceService";
import CheckInOutService from "../service/CheckInOutService";
import DeviceContext from "../context/DeviceContext";
import ListDeviceTable from "./ListDeviceTable";

const ListDevice = (props) => {
  const { onDone } = props;
  const { devices, loadDevice } = useContext(DeviceContext);
  const [showCheckOut, setshowCheckOutModal] = useState(false);
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [deviceToUpdate, setDeviceToUpdate] = useState({});
  const [lastWeekData, setlastWeeKData] = useState([]);

  const handleClose = () => setshowCheckOutModal(false);

  const handleCloseFeedback = () => setFeedbackDialog(false);

  const handleDelete = (deviceId) => {
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
  const handleCheckOutDevice = (device) => {
    setDeviceToUpdate(device);
    setshowCheckOutModal(true);
  };

  // handling open modal for feedback
  const handleAddFeedback = (device) => {
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
  const handleCheckIn = (deviceId) => {
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

      <ListDeviceTable
        devices={devices}
        validationDeviceForMoreThanWeek={validationDeviceForMoreThanWeek}
        deleteDevice={handleDelete}
        CheckOutDevice={handleCheckOutDevice}
        CheckInDevice={handleCheckIn}
        addFeedback={handleAddFeedback}
      />

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
