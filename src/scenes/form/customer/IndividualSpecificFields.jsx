import { Box, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const IndividualSpecificFields = ({ mode, state, dispatch }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [message, setMessage] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

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

  const handleInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    dispatch({
      type: "CHANGE_INPUT",
      payload: {
        value,
        field,
      },
    });
  };

  return (
    <Box m="20px">
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="First Name"
          value={state.firstName}
          onChange={(e) => {
            handleInputChange(e);
          }}
          name="firstName"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          value={state.lastName}
          onChange={(e) => {
            handleInputChange(e);
          }}
          label="Last Name"
          name="lastName"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          value={state.aadhar}
          onChange={(e) => {
            handleInputChange(e);
          }}
          label="Aadhar"
          name="aadhar"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          value={state.tradeName}
          onChange={(e) => {
            handleInputChange(e);
          }}
          label="Trade/Firm Name"
          name="tradeName"
          sx={{ gridColumn: "span 2" }}
        />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        action={snackbarAction}
      />
    </Box>
  );
};

export default IndividualSpecificFields;
