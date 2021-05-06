import axios from "axios";
import { API_URL } from "../config/api-config";

class FeedbackService {
  static async addFeedBack(deviceId, feedback) {
    const data = {
      feedback: feedback,
    };
    try {
      const respone = await axios.put(
        `${API_URL}/api/feedback/${deviceId}`,
        data
      );
      return respone;
    } catch (error) {
      console.log(error);
    }
  }
}

export default FeedbackService;
