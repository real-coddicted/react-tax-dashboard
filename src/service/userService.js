import axios from "axios";

export async function getUserById(id) {
  const response = await axios.get(
    "https://4dbfb87d-d5ec-40cc-a868-3a9dac329472.mock.pstmn.io/users/1"
  );
  return response.data;
}

export async function createUser(user) {
  const response = await axios.post(
    "https://4dbfb87d-d5ec-40cc-a868-3a9dac329472.mock.pstmn.io/users"
  );
  return response.data;
}

export async function getUsers() {
  const response = await axios.get(
    "https://4dbfb87d-d5ec-40cc-a868-3a9dac329472.mock.pstmn.io/users"
  );
  return response.data;
}
