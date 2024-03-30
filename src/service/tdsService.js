import axios from "axios";

export async function getTDSRecordByOwnerRefId(id) {
  const response = await axios.get(
    `http://localhost:8002/api/tds/getByOwnerRefId/${id}`
  );
  return response.data[0];
}

export async function createTDSRecord(tdsDetails) {
  const response = await axios.post(
    "http://localhost:8002/api/tds/add",
    tdsDetails
  );
  return response.data;
}

export async function updateTDSRecord(tdsDetails) {
  const response = await axios.put(
    `http://localhost:8002/api/tds/update/${tdsDetails.id}`,
    tdsDetails
  );
  return response.data;
}
