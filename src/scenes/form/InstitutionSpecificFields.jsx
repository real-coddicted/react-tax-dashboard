import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React from "react";
import { getUserById, createUser, updateUser } from "../../service/userService";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const InstitutionSpecificFields = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [companyName, setCompanyName] = React.useState("");
  const [authorizedPerson, setAuthorizedPerson] = React.useState("");
  const [registrationNumber, setRegistrationNumber] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const isAddMode = !props.id;

  function setUser(user) {
    setCompanyName(user["firstName"]);
    setAuthorizedPerson(user["lastName"]);
    setRegistrationNumber(user["aadharId"]);
  }

  React.useEffect(() => {
    if (!isAddMode) {
      // get user and set form fields
      getUserById(props.id).then((user) => {
        setUser(user);
      });
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onsubmit");
    if (isAddMode) {
      let entity = {
        companyName: companyName,
        authorizedPerson: authorizedPerson,
        registrationNumber: registrationNumber,
      };
      createUser(entity).then((user) => {
        props.onAdd(user.id);
        setUser(user);
        setMessage("User created successfully");
        setOpenSnackbar(true);
      });
    } else {
      let user = {
        id: props.id,
        companyName: companyName,
        authorizedPerson: authorizedPerson,
        registrationNumber: registrationNumber,
      };
      updateUser(user).then((user) => {
        setUser(user);
        setMessage("User updated successfully");
        setOpenSnackbar(true);
      });
    }
  };

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
          label="Company/Firm Name"
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          name="companyName"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          value={authorizedPerson}
          onChange={(event) => setAuthorizedPerson(event.target.value)}
          label="Authorized Person"
          name="authorizedPerson"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          value={registrationNumber}
          onChange={(event) => setRegistrationNumber(event.target.value)}
          label="Registration Number"
          name="registrationNumber"
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

export default InstitutionSpecificFields;
