import axios from "axios";

export function getPFRecordByOwnerRefId(id) {
  const response = axios
    .get(`http://192.168.1.44:8002/api/pf/getByOwnerRefId/${id}`)
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  return response;
}

export function createPFRecord(pfDetails) {
  const response = axios
    .post("http://192.168.1.44:8002/api/pf/add", pfDetails)
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  return response;
}

export function updatePFRecord(pfDetails) {
  const response = axios
    .put(`http://192.168.1.44:8002/api/pf/update/${pfDetails.id}`, pfDetails)
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  return response;
}
