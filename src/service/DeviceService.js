import axios from "axios";
import { API_URL } from "../config/api-config";

class DeviceService {
  static async getAllDevice() {
    try {
      const response = await axios.get(`${API_URL}/api/devices`);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async createDevice(deviceData) {
    try {
      const respone = await axios.post(`${API_URL}/api/devices`, deviceData);
      return respone;
    } catch (error) {
      console.log(error);
    }
  }
}

export default DeviceService;
