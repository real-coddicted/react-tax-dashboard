import axios from "axios";

export async function getPFRecordByOwnerRefId(id) {
  const response = await axios.get(
    `http://localhost:8002/api/pf/getByOwnerRefId/${id}`
  );
  return response.data[0];
}

export async function createPFRecord(pfDetails) {
  const response = await axios.post(
    "http://localhost:8002/api/pf/add",
    pfDetails
  );
  return response.data;
}

export async function updatePFRecord(pfDetails) {
  const response = await axios.put(
    `http://localhost:8002/api/pf/update/${pfDetails.id}`,
    pfDetails
  );
  return response.data;
}
