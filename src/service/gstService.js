import axios from "axios";

export function getGSTRecordByOwnerRefId(id) {
  const response = axios.get(
    `http://192.168.1.44:8002/api/gst/getByOwnerRefId/${id}`
  );
  return response;
}

export function createGSTRecord(gstDetails) {
  const response = axios.post(
    "http://192.168.1.44:8002/api/gst/add",
    gstDetails
  );
  return response;
}

export function updateGSTRecord(gstDetails) {
  const response = axios.put(
    `http://192.168.1.44:8002/api/gst/update/${gstDetails.id}`,
    gstDetails
  );
  return response;
}
