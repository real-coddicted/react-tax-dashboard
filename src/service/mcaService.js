import axios from "axios";

export async function getMCARecordByOwnerRefId(id) {
  const response = await axios.get(
    `http://localhost:8002/api/mca/getByOwnerRefId/${id}`
  );
  return response.data[0];
}

export async function createMCARecord(mcaDetails) {
  const response = await axios.post(
    "http://localhost:8002/api/mca/add",
    mcaDetails
  );
  return response.data;
}

export async function updateMCARecord(mcaDetails) {
  const response = await axios.put(
    `http://localhost:8002/api/mca/update/${mcaDetails.id}`,
    mcaDetails
  );
  return response.data;
}
