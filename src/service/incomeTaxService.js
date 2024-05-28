import axios from "axios";

export function getIncomeTaxRecordByOwnerRefId(id) {
  const response = axios.get(
    `http://192.168.1.44:8002/api/incomeTax/getByOwnerRefId/${id}`
  );
  // .catch((error) => {
  //   console.log(error);
  //   return undefined;
  // });
  return response;
}

export function createIncomeTaxRecord(incomeTaxDetails) {
  const response = axios.post(
    "http://192.168.1.44:8002/api/incomeTax/add",
    incomeTaxDetails
  );
  // .catch((error) => {
  //   console.log(error);
  //   return undefined;
  // });
  return response;
}

export function updateIncomeTaxRecord(incomeTaxDetails) {
  const response = axios.put(
    `http://192.168.1.44:8002/api/incomeTax/update/${incomeTaxDetails.id}`,
    incomeTaxDetails
  );
  return response;
}
