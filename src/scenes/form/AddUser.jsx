import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SelectCustomerType from "./SelectCustomerType";
import EntityInformation from "./EntityInformation";
import AdditionalInformation from "./AdditionalInformation";
import { useReducer } from "react";

const steps = [
  "Select Customer Type",
  "Entity Information",
  "Additional Information",
];

export function addUserReducer(state, action) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case "CHANGE_INPUT":
      return { ...state, [payload.field]: payload.value };
    case "ADD_PARTICIPANT":
      state.participantDetails = [...state.participantDetails, payload.value];
      return state;
    default:
      return state;
  }
}

export const initialState = {
  customerType: "",
  firstName: "",
  lastName: "",
  aadhar: "",
  //---
  companyName: "",
  authorizedPerson: "",
  registrationNumber: "",
  //--
  email: "",
  contactNumber: "",
  city: "",
  address: "",
  state: "",
  country: "",
  pinCode: "",
  panId: "",
  //--
  numberOfMembers: "",
  tan: "",
  //--
  numberOfDirectors: "",
  participantDetails: [],
};

export default function AddUser() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [state, dispatch] = useReducer(addUserReducer, initialState);

  const getElement = () => {
    switch (activeStep) {
      case 0:
        return <SelectCustomerType state={state} dispatch={dispatch} />;
      case 1:
        return <EntityInformation state={state} dispatch={dispatch} />;
      case 2:
        return <AdditionalInformation state={state} dispatch={dispatch} />;
      default:
        return <h2>default step</h2>;
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "90%" }} m="40px">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getElement()}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} color="secondary">
                {activeStep === steps.length - 1 ? "Save" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
