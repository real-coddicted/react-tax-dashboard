import axios from "axios";

export function getMCARecordByOwnerRefId(id) {
  const response = axios.get(
    `http://192.168.1.44:8002/api/mca/getByOwnerRefId/${id}`
  );
  return response;
}

export function createMCARecord(mcaDetails) {
  const response = axios.post(
    "http://192.168.1.44:8002/api/mca/add",
    mcaDetails
  );
  return response;
}

export function updateMCARecord(mcaDetails) {
  const response = axios.put(
    `http://192.168.1.44:8002/api/mca/update/${mcaDetails.id}`,
    mcaDetails
  );
  return response;
}
