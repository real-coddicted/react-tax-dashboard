import axios from "axios";

export function getESICRecordByOwnerRefId(id) {
  const response = axios.get(
    `http://192.168.1.44:8002/api/esic/getByOwnerRefId/${id}`
  );
  return response;
}

export function createESICRecord(esicDetails) {
  const response = axios.post(
    "http://192.168.1.44:8002/api/esic/add",
    esicDetails
  );
  return response;
}

export function updateESICRecord(esicDetails) {
  const response = axios.put(
    `http://192.168.1.44:8002/api/esic/update/${esicDetails.id}`,
    esicDetails
  );
  return response;
}
