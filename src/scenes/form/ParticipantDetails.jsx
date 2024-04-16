import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React from "react";
import { getUserById, createUser, updateUser } from "../../service/userService";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ParticipantDetails = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [tan, setTan] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const isAddMode = !props.id;

  function setUser(user) {
    setTan(user["tan"]);
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
        tan: tan,
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
        tan: tan,
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
      <h3>Participant Details</h3>
    </Box>
  );
};

export default ParticipantDetails;
