import axios from "axios";

export async function getUserById(id) {
  const response = await axios.get(
    `http://localhost:8001/api/user/getById/${id}`
  );
  return response.data;
}

export async function createUser(user) {
  const response = await axios.post("http://localhost:8001/api/user/add", user);
  return response.data;
}

export async function getUsers() {
  const response = await axios.get("http://localhost:8001/api/user/getAll");
  return response.data;
}
