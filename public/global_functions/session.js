import axios from "axios";

const getUserSessions = async () => {
  let token = localStorage.getItem("user-token");
  if (token) {
    try {
      const res = await axios.get(`${process.env.BASE_API_URL}/sessions`, {
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

const createSession = async (doctorId, typeQues) => {
  let token = localStorage.getItem("user-token");
  if (token) {
    try {
      const res = await axios.post(
        `${process.env.BASE_API_URL}/sessions/create`,
        {
          doctorId,
          typeQues,
        },
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

const getUserSession = async (sessionId) => {
  let token = localStorage.getItem("user-token");
  if (token) {
    try {
      const res = await axios.get(
        `${process.env.BASE_API_URL}/sessions/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      // if (error?.response.data.msg === "Unauthorized Error")
      //   localStorage.removeItem("user-token");
      throw error;
    }
  }
  return { error: true };
};

const addMessage = async (sessionId, message) => {
  let token = localStorage.getItem("user-token");
  if (token) {
    try {
      const res = await axios.post(
        `${process.env.BASE_API_URL}/sessions/${sessionId}/add-message`,
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  return { error: true };
};

const updateAssociationSymptoms = async (sessionId, symptoms) => {
  let token = localStorage.getItem("user-token");
  if (token) {
    try {
      const res = await axios.post(
        `${process.env.BASE_API_URL}/sessions/${sessionId}/update-association-symptoms`,
        {
          symptoms,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  return { error: true };
};

export {
  getUserSessions,
  getUserSession,
  createSession,
  addMessage,
  updateAssociationSymptoms,
};
