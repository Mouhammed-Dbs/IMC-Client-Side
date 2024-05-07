import axios from "axios";
const isUserLogged = async () => {
  let token = localStorage.getItem("user-token");
  if (token) {
    try {
      const res = await axios.get(
        `${process.env.BASE_API_URL}/user/info-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      if (error?.response.data.msg === "Unauthorized Error")
        localStorage.removeItem("user-token");
      throw error;
    }
  }
  return { error: true };
};

const loginUser = async (email, password) => {
  try {
    const res = await axios.get(
      `${process.env.BASE_API_URL}/user/login?email=${email}&password=${password}`
    );
    console.log(res.data.token);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const registerUser = async (name, email, username, password, age, gender) => {
  try {
    const res = await axios.post(`${process.env.BASE_API_URL}/user/register`, {
      email,
      password,
      age,
      username,
      gender,
      name,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { loginUser, registerUser, isUserLogged };
