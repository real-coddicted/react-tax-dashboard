import { Box } from "@mui/material";
import React from "react";
import Divider from "@mui/material/Divider";
import InstitutionSpecificFields from "./InstitutionSpecificFields";
import AssociationSpecificFields from "./AssociationSpecificFields";
import LocalAuthoritySpecificFields from "./LocalAuthoritySpecificFields";
import PartnershipSpecificFields from "./PartnershipSpecificFields";
import ParticipantDetails from "./ParticipantDetails";

const AdditionalInformation = (props) => {
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
        return <h3>No Additional Information is required.</h3>;
      case "HUF":
      case "AOP":
      case "AOP_TRUST":
      case "BOI":
        return (
          <Box m="20px">
            <AssociationSpecificFields />
            <Divider />
            <ParticipantDetails />
          </Box>
        );
      case "LOCAL_AUTHORITY":
        return <LocalAuthoritySpecificFields />;
      case "PARTNERSHIP_FIRM":
      case "LLP":
      case "COMPANY":
        return (
          <Box m="20px">
            <PartnershipSpecificFields />
            <Divider />
            <ParticipantDetails />
          </Box>
        );
      default:
        return (
          <Box m="20px">
            <InstitutionSpecificFields />
            <Divider />
            <ParticipantDetails />
          </Box>
        );
    }
  };

  return <Box m="20px">{getElement()}</Box>;
};

export default AdditionalInformation;
