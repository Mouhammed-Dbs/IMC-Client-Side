import axios from "axios";

const getSessions = async () => {
  let token = localStorage.getItem("user-token");
  if (token) {
    try {
      const res = await axios.get(`${process.env.BASE_API_URL}/session`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error?.response.data.msg === "Unauthorized Error")
        localStorage.removeItem("user-token");
      throw error;
    }
  }
  return { error: true };
};

export { getSessions };
