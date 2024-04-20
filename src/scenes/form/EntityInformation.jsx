import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React from "react";
import { getUserById, createUser, updateUser } from "../../service/userService";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import IndividualSpecificFields from "./IndividualSpecificFields";
import CommonFields from "./CommonFields";
import InstitutionSpecificFields from "./InstitutionSpecificFields";

const EntityInformation = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const getCustomerType = () => {
    const newCustomerString = localStorage.getItem("newCustomer");
    const newCustomer = JSON.parse(newCustomerString);

    if (newCustomer) {
      return newCustomer["customerType"];
    }
    return "UNKNOWN";
  };

  const getElement = () => {
    const customerType = getCustomerType();
    console.log("entity information customerType: " + customerType);
    switch (customerType) {
      case "INDIVIDUAL":
        return <IndividualSpecificFields />;
      default:
        return <InstitutionSpecificFields />;
    }
  };

  return (
    <Box m="20px">
      {getElement()}
      <Divider />
      <CommonFields />
    </Box>
  );
};

export default EntityInformation;
