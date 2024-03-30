import axios from "axios";

export async function getGSTRecordByOwnerRefId(id) {
  const response = await axios.get(
    `http://localhost:8002/api/gst/getByOwnerRefId/${id}`
  );
  return response.data[0];
}

export async function createGSTRecord(gstDetails) {
  const response = await axios.post(
    "http://localhost:8002/api/gst/add",
    gstDetails
  );
  return response.data;
}

export async function updateGSTRecord(gstDetails) {
  const response = await axios.put(
    `http://localhost:8002/api/gst/update/${gstDetails.id}`,
    gstDetails
  );
  return response.data;
}
