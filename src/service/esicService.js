import axios from "axios";

export function getESICRecordByOwnerRefId(id) {
  const response = axios
    .get(`http://192.168.1.44:8002/api/esic/getByOwnerRefId/${id}`)
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  return response;
}

export function createESICRecord(esicDetails) {
  const response = axios
    .post("http://192.168.1.44:8002/api/esic/add", esicDetails)
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  return response;
}

export function updateESICRecord(esicDetails) {
  const response = axios
    .put(
      `http://192.168.1.44:8002/api/esic/update/${esicDetails.id}`,
      esicDetails
    )
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  return response;
}
