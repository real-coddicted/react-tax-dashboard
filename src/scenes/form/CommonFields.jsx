import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getUserById, createUser, updateUser } from "../../service/userService";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const CommonFields = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [email, setEmail] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [panId, setPanId] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [pinCode, setPinCode] = React.useState("");
  const [value, setValue] = React.useState();
  const [message, setMessage] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const isAddMode = !props.id;

  function setUser(entity) {
    setEmail(entity["email"]);
    setMobileNumber(entity["mobileNumber"]);
    setPanId(entity["panId"]);
    setAddress(entity["address"]);
    setCity(entity["city"]);
    setState(entity["state"]);
    setCountry(entity["country"]);
    setPinCode(entity["pinCode"]);
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
        email: email,
        mobileNumber: mobileNumber,
        panId: panId,
        address: address,
        city: city,
        state: state,
        country: country,
        pinCode: pinCode,
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
        email: email,
        mobileNumber: mobileNumber,
        panId: panId,
        address: address,
        city: city,
        state: state,
        country: country,
        pinCode: pinCode,
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
          value={panId}
          onChange={(event) => setPanId(event.target.value)}
          label="Pan No"
          name="Pan No."
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          required
          fullWidth
          variant="filled"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          label="Email"
          name="email"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          required
          fullWidth
          variant="filled"
          type="text"
          value={mobileNumber}
          onChange={(event) => setMobileNumber(event.target.value)}
          label="Contact Number"
          name="contact"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          label="Address"
          name="address"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          label="City"
          name="city"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          required
          fullWidth
          variant="filled"
          value={state}
          onChange={(event) => setState(event.target.value)}
          type="text"
          label="State"
          name="state"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          required
          fullWidth
          variant="filled"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          type="text"
          label="Country"
          name="country"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          required
          fullWidth
          variant="filled"
          value={pinCode}
          onChange={(event) => setPinCode(event.target.value)}
          type="text"
          label="Pin Code"
          name="pinCode"
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

export default CommonFields;
