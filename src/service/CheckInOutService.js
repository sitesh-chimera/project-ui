import axios from "axios";
import { API_URL } from "../config/api-config";

class CheckInOutService {
  static async checkOutDevice(deviceId, lastCheckOutBy) {
    const data = {
      lastCheckOutBy: lastCheckOutBy,
    };
    try {
      const respone = await axios.put(
        `${API_URL}/api/check-in-out/${deviceId}`,
        data
      );
      return respone;
    } catch (error) {
      console.log(error);
    }
  }
  static async checkInDevice(deviceId) {
    try {
      const respone = await axios.patch(
        `${API_URL}/api/check-in-out/${deviceId}`
      );
      return respone;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CheckInOutService;
