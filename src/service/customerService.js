import axios from "axios";

export function createCustomer(customerDetails) {
  const response = axios.post(
    `${process.env.REACT_APP_API_URL}/api/customer/add`,
    customerDetails
  );
  // .catch((error) => {
  //   console.log("error:44444 " + error);
  //   return error;
  // });
  return response;
}

export function getCustomers() {
  const response = axios
    .get(`${process.env.REACT_APP_API_URL}/api/customer/getAll`)
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  return response;
}

export function getCustomerById(id) {
  const response = axios
    .get(`${process.env.REACT_APP_API_URL}/api/customer/getById/${id}`)
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  return response;
}

export function updateCustomer(customerDetails) {
  const response = axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/customer/update/${customerDetails.id}`,
      customerDetails
    )
    .catch((error) => {
      console.log(error);
      return undefined;
    });
  return response;
}
