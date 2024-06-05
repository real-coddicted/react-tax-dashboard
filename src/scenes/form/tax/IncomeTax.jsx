import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
// import { DatePicker } from "@mui/x-date-pickers";
// import dayjs from "dayjs";
import React from "react";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  getIncomeTaxRecordByOwnerRefId,
  createIncomeTaxRecord,
  updateIncomeTaxRecord,
} from "../../../service/incomeTaxService";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const IncomeTax = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [id, setId] = React.useState("");
  const [ownerRef, setOwnerRef] = React.useState(props.id);
  const [panNumber, setPanNumber] = React.useState("");
  const [aadharNumber, setAadharNumber] = React.useState("");
  // const [dateOfInit, setDateOfInit] = React.useState(dayjs("2022-04-17"));
  const [fatherName, setFatherName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [isCoveredUnderAudit, setIsCoveredUnderAudit] = React.useState(false);
  const [contactNumber, setcontactNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");
  //----
  function setIncomeTaxDetails(incomeTaxDetails) {
    if (incomeTaxDetails) {
      setId(incomeTaxDetails["id"]);
      setOwnerRef(incomeTaxDetails["ownerRef"]);
      setPanNumber(incomeTaxDetails["panNumber"]);
      setAadharNumber(incomeTaxDetails["aadharNumber"]);
      setFatherName(incomeTaxDetails["fatherName"]);
      setIsCoveredUnderAudit(incomeTaxDetails["isCoveredUnderAudit"]);
      setAddress(incomeTaxDetails["address"]);
      setcontactNumber(incomeTaxDetails["contactNumber"]);
      setEmail(incomeTaxDetails["email"]);
      setPassword(incomeTaxDetails["password"]);
      setStatus(incomeTaxDetails["status"]);
    }
  }

  React.useEffect(() => {
    console.log("incomeTax: " + ownerRef);
    if (ownerRef) {
      // get user and set form fields
      getIncomeTaxRecordByOwnerRefId(ownerRef).then((res) => {
        if (res && res.data) setIncomeTaxDetails(res.data[0]);
      });
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onsubmit");
    if (!id) {
      let incomeTaxRecord = {
        ownerRef: ownerRef,
        panNumber: panNumber,
        aadharNumber: aadharNumber,
        // dateOfInit: dateOfInit,
        fatherName: fatherName,
        isCoveredUnderAudit: isCoveredUnderAudit,
        address: address,
        contactNumber: contactNumber,
        email: email,
        password: password,
        status: status,
      };
      createIncomeTaxRecord(incomeTaxRecord)
        .then((res) => {
          if (res && res.data) {
            setIncomeTaxDetails(res.data);
            setMessage("Income Tax Record created successfully");
            setOpenSnackbar(true);
          }
        })
        .catch((error) => {
          console.log(error.message);
          setMessage(error.message);
          setOpenSnackbar(true);
        });
    } else {
      let incomeTaxRecord = {
        id: id,
        ownerRef: ownerRef,
        panNumber: panNumber,
        aadharNumber: aadharNumber,
        // dateOfInit: dateOfInit,
        fatherName: fatherName,
        isCoveredUnderAudit: isCoveredUnderAudit,
        address: address,
        contactNumber: contactNumber,
        email: email,
        password: password,
        status: status,
      };
      updateIncomeTaxRecord(incomeTaxRecord)
        .then((res) => {
          if (res && res.data) {
            setIncomeTaxDetails(incomeTaxRecord);
            setMessage("Income Tax Record updated successfully");
            setOpenSnackbar(true);
          }
        })
        .catch((error) => {
          console.log(error.message);
          setMessage(error.message);
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

  const handleCoveredUnderAuditChange = (event) => {
    setIsCoveredUnderAudit(event.target.value);
  };

  //----
  return (
    <Box m="20px">
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
      >
        <Header title="Income Tax" subtitle="Details" />
        <Box
          sx={{ gridColumn: "span 3" }}
          height="35px"
          display="flex"
          justifyContent="end"
          mt="10px"
        >
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={onSubmit}
          >
            Save
          </Button>
        </Box>
      </Box>
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
          name="firstName"
          // value={firstName}
          // onChange={(event) => setFirstName(event.target.value)}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Last Name"
          name="lastName"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Category"
          name="category"
          // value={category}
          // onChange={(event) => setCategory(event.target.value)}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Pan No"
          name="Pan No."
          value={panNumber}
          onChange={(event) => setPanNumber(event.target.value)}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Aadhar"
          name="aadhar"
          value={aadharNumber}
          onChange={(event) => setAadharNumber(event.target.value)}
          sx={{ gridColumn: "span 2" }}
        />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="DOB/DOI"
            value={dateOfInit}
            onChange={(newValue) => setDateOfInit(newValue)}
            sx={{ gridColumn: "span 2" }}
          />
        </LocalizationProvider> */}

        <TextField
          required
          fullWidth
          variant="filled"
          type="text"
          label="Email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          required
          fullWidth
          variant="filled"
          type="text"
          label="Contact Number"
          name="contact"
          value={contactNumber}
          onChange={(event) => setcontactNumber(event.target.value)}
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Address 1"
          name="address1"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Address 2"
          name="address2"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Login Password"
          name="login_password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          sx={{ gridColumn: "span 4" }}
        />
        <FormControl sx={{ gridColumn: "span 4" }}>
          <FormLabel id="coveredUnderAuditRadioGroupLabel">
            Covered Under Audit
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="coveredUnderAuditRadioGroupLabel"
            name="coveredUnderAuditRadioGroup"
            value={isCoveredUnderAudit}
            onChange={handleCoveredUnderAuditChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
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

export default IncomeTax;
