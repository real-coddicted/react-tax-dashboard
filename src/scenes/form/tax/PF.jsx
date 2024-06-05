import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
// import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  getPFRecordByOwnerRefId,
  createPFRecord,
  updatePFRecord,
} from "../../../service/pfService";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const PF = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [id, setId] = React.useState("");
  const [ownerRef, setOwnerRef] = React.useState(props.id);
  const [companyName, setCompanyName] = React.useState("");
  const [coveredUnderAudit, setCoveredUnderAudit] = React.useState(false);
  const [pfRegistrationNumber, setPFRegistrationNumber] = React.useState();
  const [panNumber, setPanNumber] = React.useState("");
  // const [dateOfRegistration, setDateOfRegistration] = React.useState(
  //   dayjs("2022-04-17")
  // );
  const [authorizedSignatory, setAuthorizedSignatory] = React.useState();

  const [contactNumber, setcontactNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [status, setStatus] = React.useState();

  const [createdDateTime, setCreatedDateTime] = React.useState("");
  const [modifiedDateTime, setModifiedDateTime] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");
  //----
  function setPFDetails(pfDetails) {
    if (pfDetails) {
      setId(pfDetails["id"]);
      // setOwnerRef(gstDetails["ownerRef"]);
      setCompanyName(pfDetails["companyName"]);
      setCoveredUnderAudit(pfDetails["coveredUnderAudit"]);
      setPFRegistrationNumber(pfDetails["pfRegistrationNumber"]);
      setPanNumber(pfDetails["panNumber"]);
      // setDateOfRegistration(pfDetails["dateOfRegistration"]);
      setAuthorizedSignatory(pfDetails["authorizedSignatory"]);
      setcontactNumber(pfDetails["contactNumber"]);
      setEmail(pfDetails["email"]);
      setPassword(pfDetails["password"]);
      setStatus(pfDetails["status"]);
      setCreatedDateTime(pfDetails["createdDateTime"]);
      setModifiedDateTime(pfDetails["modifiedDateTime"]);
    }
  }

  React.useEffect(() => {
    console.log(ownerRef);
    if (ownerRef) {
      // get user and set form fields
      getPFRecordByOwnerRefId(ownerRef).then((res) => {
        if (res && res.data) setPFDetails(res.data[0]);
      });
    }
  }, []);

  const onSubmit = (e) => {
    console.log(ownerRef);
    e.preventDefault();
    console.log("onsubmit");
    if (!id) {
      let pfRecord = {
        id: "",
        ownerRef: ownerRef,
        companyName: companyName,
        coveredUnderAudit: coveredUnderAudit,
        esicRegistrationNumber: pfRegistrationNumber,
        panNumber: panNumber,
        // dateOfRegistration: dateOfRegistration,
        authorizedSignatory: authorizedSignatory,
        contactNumber: contactNumber,
        email: email,
        password: password,
        status: status,
      };
      createPFRecord(pfRecord)
        .then((res) => {
          if (res && res.data) {
            setPFDetails(res.data);
            setMessage("PF Record created successfully");
            setOpenSnackbar(true);
          }
        })
        .catch((error) => {
          console.error(error.message);
          setMessage(error.message);
          setOpenSnackbar(true);
        });
    } else {
      let pfRecord = {
        id: id,
        ownerRef: ownerRef,
        companyName: companyName,
        coveredUnderAudit: coveredUnderAudit,
        esicRegistrationNumber: pfRegistrationNumber,
        panNumber: panNumber,
        // dateOfRegistration: dateOfRegistration,
        authorizedSignatory: authorizedSignatory,
        contactNumber: contactNumber,
        email: email,
        password: password,
        status: status,
      };
      updatePFRecord(pfRecord)
        .then((res) => {
          if (res && res.data) {
            setPFDetails(pfRecord);
            setMessage("PF Record updated successfully");
            setOpenSnackbar(true);
          }
        })
        .catch((error) => {
          console.error(error.message);
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
    setCoveredUnderAudit(event.target.value);
  };
  //----

  return (
    <Box m="20px">
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
      >
        <Header title="PF" subtitle="Details" />
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
          label="Firm Name"
          name="firmName"
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="PF REGISTRATION NO"
          name="pfRegistrationNo"
          value={pfRegistrationNumber}
          onChange={(event) => setPFRegistrationNumber(event.target.value)}
          sx={{ gridColumn: "span 2" }}
        />
        <FormControl sx={{ gridColumn: "span 4" }}>
          <FormLabel id="coveredUnderAuditRadioGroupLabel">
            Covered Under Audit
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="coveredUnderAuditRadioGroupLabel"
            name="coveredUnderAudit"
            value={coveredUnderAudit}
            onChange={handleCoveredUnderAuditChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Pan No"
          name="pan"
          value={panNumber}
          onChange={(event) => setPanNumber(event.target.value)}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="AUTHO SIGN"
          name="authoSign"
          value={authorizedSignatory}
          onChange={(event) => setAuthorizedSignatory(event.target.value)}
          sx={{ gridColumn: "span 2" }}
        />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="DOR"
            value={dateOfRegistration}
            onChange={(newValue) => setDateOfRegistration(newValue)}
            sx={{ gridColumn: "span 2" }}
          />
        </LocalizationProvider> */}
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
          fullWidth
          variant="filled"
          type="text"
          label="Login Password"
          name="login_password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          sx={{ gridColumn: "span 4" }}
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

export default PF;
