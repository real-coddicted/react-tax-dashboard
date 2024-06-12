import { Box, Button, Divider, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import ReadOnlyFields from "./ReadOnlyFields";

import {
  getGSTRecordByOwnerRefId,
  createGSTRecord,
  updateGSTRecord,
} from "../../../service/gstService";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const GST = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [id, setId] = React.useState();
  const [ownerRef, setOwnerRef] = React.useState(props.id);
  const [firmName, setFirmName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [contactNumber, setcontactNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gstin, setGstin] = React.useState("");
  const [dealerType, setDealerType] = React.useState("");
  const [returnType, setReturnType] = React.useState("");
  // const [dateOfRegistration, setDateOfRegistration] = React.useState(
  //   dayjs("2022-04-17")
  // );
  const [currentStatus, setCurrentStatus] = React.useState();

  const [status, setStatus] = React.useState();
  const [createdDateTime, setCreatedDateTime] = React.useState("");
  const [modifiedDateTime, setModifiedDateTime] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [loginId, setLoginId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isCoveredUnderAudit, setIsCoveredUnderAudit] = React.useState(false);
  //----
  function setGSTDetails(gstDetails) {
    if (gstDetails) {
      setId(gstDetails["id"]);
      // setOwnerRef(gstDetails["ownerRef"]);
      setFirmName(gstDetails["firmName"]);
      setGstin(gstDetails["gstin"]);
      setDealerType(gstDetails["dealerType"]);
      setReturnType(gstDetails["returnType"]);
      // setDateOfRegistration(gstDetails["dateOfRegistration"]);
      setCurrentStatus(gstDetails["currentStatus"]);
      setAddress(gstDetails["address"]);
      setcontactNumber(gstDetails["contactNumber"]);
      setEmail(gstDetails["email"]);
      setStatus(gstDetails["status"]);
      setCreatedDateTime(gstDetails["createdDateTime"]);
      setModifiedDateTime(gstDetails["modifiedDateTime"]);
    }
  }

  React.useEffect(() => {
    console.log("GST: " + ownerRef);
    if (ownerRef) {
      // get user and set form fields
      getGSTRecordByOwnerRefId(ownerRef).then((res) => {
        if (res && res.data) setGSTDetails(res.data[0]);
      });
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      let gstRecord = {
        id: "",
        ownerRef: ownerRef,
        firmName: firmName,
        gstin: gstin,
        dealerType: dealerType,
        returnType: returnType,
        dateOfRegistration: "",
        currentStatus: currentStatus,
        address: address,
        contactNumber: contactNumber,
        email: email,
        status: status,
      };
      createGSTRecord(gstRecord)
        .then((res) => {
          if (res && res.data) {
            setGSTDetails(res.data);
            setMessage("GST Record created successfully");
            setOpenSnackbar(true);
          }
        })
        .catch((error) => {
          console.error(error.message);
          setMessage(error.message);
          setOpenSnackbar(true);
        });
    } else {
      let gstRecord = {
        id: id,
        ownerRef: ownerRef,
        firmName: firmName,
        address: address,
        contactNumber: contactNumber,
        email: email,
        gstin: gstin,
        dealerType: dealerType,
        returnType: returnType,
        // dateOfRegistration: dateOfRegistration,
        currentStatus: currentStatus,
        status: status,
      };
      updateGSTRecord(gstRecord)
        .then((res) => {
          if (res && res.data) {
            setGSTDetails(res.data);
            setMessage("Income Tax Record updated successfully");
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

  //----

  const handleDealerTypeChange = (event) => {
    setDealerType(event.target.value);
  };

  const handleReturnTypeChange = (event) => {
    setReturnType(event.target.value);
  };

  const handleCoveredUnderAuditChange = (event) => {
    setIsCoveredUnderAudit(event.target.value);
  };

  return (
    <Box m="20px">
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
      >
        <Header title="GST" subtitle="Details" />
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
      <ReadOnlyFields service="gst" data={props.data} />
      <Divider />
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        {/* <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Firm Name"
          name="firmName"
          value={firmName}
          onChange={(event) => setFirmName(event.target.value)}
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
        /> */}
        {/* Editable Fields */}
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Reg."
            value={dateOfRegistration}
            onChange={(newValue) => setDateOfRegistration(newValue)}
            sx={{ gridColumn: "span 2" }}
          />
        </LocalizationProvider> */}
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="GSTIN"
          name="gstin"
          value={gstin}
          onChange={(event) => setGstin(event.target.value)}
          sx={{ gridColumn: "span 4" }}
        />
        <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
          <InputLabel id="dealerTypeLabel" textColor="secondary">
            Dealer Type
          </InputLabel>
          <Select
            labelId="dealerTypeSelectLabel"
            id="dealerTypeSelect"
            value={dealerType ?? ""}
            onChange={handleDealerTypeChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="REGULAR">Regular</MenuItem>
            <MenuItem value="COMPOSITION">Composition</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
          <InputLabel id="returnTypeLabel" textColor="secondary">
            Return Type
          </InputLabel>
          <Select
            labelId="returnTypeSelectLabel"
            id="returnTypeSelect"
            value={returnType ?? ""}
            onChange={handleReturnTypeChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="MONTHLY">Monthly</MenuItem>
            <MenuItem value="QUARTERLY">Quarterly</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Current Status"
          name="currentStatus"
          value={currentStatus}
          onChange={(event) => setCurrentStatus(event.target.value)}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Login Password"
          name="loginPassword"
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

export default GST;
