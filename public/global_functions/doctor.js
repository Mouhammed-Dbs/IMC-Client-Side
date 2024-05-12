import axios from "axios";

const getDoctors = async () => {
  try {
    const res = await axios.get(`${process.env.BASE_API_URL}/doctors`, {});
    return res.data;
  } catch (error) {
    return { error: true };
  }
};

export { getDoctors };
