import axios from "axios";

export async function getESICRecordByOwnerRefId(id) {
  const response = await axios.get(
    `http://localhost:8002/api/esic/getByOwnerRefId/${id}`
  );
  return response.data[0];
}

export async function createESICRecord(esicDetails) {
  const response = await axios.post(
    "http://localhost:8002/api/esic/add",
    esicDetails
  );
  return response.data;
}

export async function updateESICRecord(esicDetails) {
  const response = await axios.put(
    `http://localhost:8002/api/esic/update/${esicDetails.id}`,
    esicDetails
  );
  return response.data;
}
