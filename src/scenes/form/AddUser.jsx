import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
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
  const [completed, setCompleted] = React.useState({});
  const [state, dispatch] = useReducer(addUserReducer, initialState);

  const totalSteps = () => {
    return steps.length;
  };

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

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "90%" }} m="40px">
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
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
              <Button color="secondary" onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button color="secondary" onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
