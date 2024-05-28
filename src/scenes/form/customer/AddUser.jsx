import * as React from "react";
import { useReducer } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SelectCustomerType from "./SelectCustomerType";
import EntityInformation from "./EntityInformation";
import AdditionalInformation from "./AdditionalInformation";
import {
  createCustomer,
  getCustomerById,
  updateCustomer,
} from "../../../service/customerService";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const steps = [
  "Select Customer Type",
  "Entity Information",
  "Additional Information",
];

export function addUserReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "INIT":
      return { ...state, ...payload };
    case "CHANGE_INPUT":
      return { ...state, [payload.field]: payload.value };
    case "CHANGE_ADDRESS":
      var oldAddress = state.address;
      oldAddress = { ...oldAddress, [payload.field]: payload.value };
      return { ...state, address: oldAddress };
    case "SAVE_CUSTOMER":
      console.log("dispatch SAVE_CUSTOMER");
      return {
        ...state,
        isLoading: true,
      };
    case "SAVED_CUSTOMER":
      return {
        ...state,
        isLoading: false,
      };
    case "ERROR_SAVING_CUSTOMER":
      console.log("dispatch ERROR_SAVING_CUSTOMER");
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

export const initialState = {
  id: "",
  accountRef: 1,
  category: "",
  firstName: "",
  lastName: "",
  aadhar: "",
  //---
  companyName: "",
  authorisedPerson: "",
  registrationNumber: "",
  //--
  email: "",
  contactNumber: "",
  panNumber: "",
  //--
  numberOfMembers: "",
  tanNumber: "",
  address: {
    addressLine1: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  //--
  persons: [],
};

export default function AddUser(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [state, dispatch] = useReducer(addUserReducer, initialState);
  const [id, setId] = React.useState(props.id);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage("");
    setOpenSnackbar(false);
  };

  const snackbarAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  //on page load - fetch customers
  React.useEffect(() => {
    console.log("-----" + id);
    // get user and set form fields
    if (id) {
      try {
        getCustomerById(id)
          .then((res) => {
            if (res) {
              dispatch({
                type: "INIT",
                payload: res.data,
              });
            }
          })
          .catch((error) => {
            console.error(error.request);
          });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  }, [id]);

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

  const handleSave = () => {
    dispatch({
      type: "SAVE_CUSTOMER",
    });
    var response;
    try {
      if (state.id) {
        response = updateCustomer(state);
      } else {
        response = createCustomer(state);
      }
      response
        .then((res) => {
          if (res) {
            props.setOpen(false);
            dispatch({
              type: "SAVED_CUSTOMER",
              payload: res.data,
            });
          }
        })
        .catch((error) => {
          console.error("error:12222" + error.message);
          setMessage(error.message);
          setOpenSnackbar(true);
          dispatch({
            type: "ERROR_SAVING_CUSTOMER",
            payload: error.message,
          });
        });
    } catch (error) {
      console.error("error:333333" + error.message);
      setMessage(error.message);
      setOpenSnackbar(true);
      dispatch({
        type: "ERROR_SAVING_CUSTOMER",
        payload: error,
      });
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
            <Step
              key={label}
              {...stepProps}
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "secondary.dark", // circle color (COMPLETED)
                },
                "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                  {
                    color: "grey.500", // Just text label (COMPLETED)
                  },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "secondary.main", // circle color (ACTIVE)
                },
                "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                  {
                    color: "common.white", // Just text label (ACTIVE)
                  },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "black", // circle's number (ACTIVE)
                },
              }}
            >
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
              {activeStep === steps.length - 1 ? (
                <Button onClick={handleSave} color="secondary">
                  Save
                </Button>
              ) : (
                <Button onClick={handleNext} color="secondary">
                  Next
                </Button>
              )}
            </Box>
            <Snackbar
              open={openSnackbar}
              onClose={handleSnackbarClose}
              message={message}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              action={snackbarAction}
            />
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
