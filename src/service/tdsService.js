import axios from "axios";

export function getTDSRecordByOwnerRefId(id) {
  const response = axios.get(
    `http://192.168.1.44:8002/api/tds/getByOwnerRefId/${id}`
  );
  return response;
}

export function createTDSRecord(tdsDetails) {
  const response = axios.post(
    "http://192.168.1.44:8002/api/tds/add",
    tdsDetails
  );
  return response;
}

export function updateTDSRecord(tdsDetails) {
  const response = axios.put(
    `http://192.168.1.44:8002/api/tds/update/${tdsDetails.id}`,
    tdsDetails
  );
  return response;
}
