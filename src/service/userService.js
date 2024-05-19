import axios from "axios";

export async function getUserById(id) {
  const response = await axios.get(
    `http://localhost:8001/api/user/getById/${id}`
  );
  return response;
}

export async function createUser(user) {
  const response = await axios.post("http://localhost:8001/api/user/add", user);
  return response;
}

export function getUsers() {
  const response = axios
    .get("http://localhost:8001/api/user/getAll")
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  return response;
}

export async function updateUser(user) {
  const response = await axios.put(
    `http://localhost:8001/api/user/update/${user.id}`,
    user
  );
  return response;
}
