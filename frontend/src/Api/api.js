import axios from "axios";

const API_URL = "http://localhost:8080/api/mocks";

export const fetchData = async (endpoint) => {
  try {
    const res = await axios.get(`${API_URL}/${endpoint}`);
    return res.data.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};

export const fetchGetUserById = async (userId) => {
  try {
    // console.log(userId);
    const res = await axios.get(`${API_URL}/getUserById/${userId}`);
    // console.log(res);
    return res.data.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
}
