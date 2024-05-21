import axios from "axios";

export function createCustomer(customerDetails) {
  const response = axios
    .post("http://192.168.1.44:8002/api/customer/add", customerDetails)
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  return response;
}

export function getCustomers() {
  const response = axios
    .get("http://192.168.1.44:8002/api/customer/getAll")
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  return response;
}
