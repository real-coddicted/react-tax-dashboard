import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React from "react";
import { getUserById, createUser, updateUser } from "../../service/userService";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const IndividualSpecificFields = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [aadharId, setAadharId] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const isAddMode = !props.id;

  function setUser(user) {
    setFirstName(user["firstName"]);
    setLastName(user["lastName"]);
    setAadharId(user["aadharId"]);
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
        firstName: firstName,
        lastName: lastName,
        aadharId: aadharId,
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
        firstName: firstName,
        lastName: lastName,
        aadharId: aadharId,
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
          label="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          name="firstName"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          label="Last Name"
          name="lastName"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          value={aadharId}
          onChange={(event) => setAadharId(event.target.value)}
          label="Aadhar"
          name="aadhar"
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
