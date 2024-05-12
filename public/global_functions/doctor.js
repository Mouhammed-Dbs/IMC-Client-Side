import axios from "axios";

const getDoctors = async () => {
  try {
    const res = await axios.get(`${process.env.BASE_API_URL}/doctor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error?.response.data.msg === "Unauthorized Error")
      localStorage.removeItem("user-token");
    return { error: true };
  }
};

export { getDoctors };
