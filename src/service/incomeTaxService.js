import axios from "axios";

export async function getIncomeTaxRecordByOwnerRefId(id) {
  const response = await axios.get(
    `http://localhost:8002/api/incomeTax/getByOwnerRefId/${id}`
  );
  return response.data[0];
}

export async function createIncomeTaxRecord(incomeTaxDetails) {
  const response = await axios.post(
    "http://localhost:8002/api/incomeTax/add",
    incomeTaxDetails
  );
  return response.data;
}

export async function updateIncomeTaxRecord(incomeTaxDetails) {
  const response = await axios.put(
    `http://localhost:8002/api/incomeTax/update/${incomeTaxDetails.id}`,
    incomeTaxDetails
  );
  return response.data;
}
