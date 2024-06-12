import { Box, Button, Divider, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
// import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  getMCARecordByOwnerRefId,
  createMCARecord,
  updateMCARecord,
} from "../../../service/mcaService";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import ReadOnlyFields from "./ReadOnlyFields";

const MCA = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [id, setId] = React.useState("");
  const [ownerRef, setOwnerRef] = React.useState(props.id);
  const [companyName, setCompanyName] = React.useState("");
  const [companyType, setCompanyType] = React.useState("");
  const [cin, setCin] = React.useState("");
  const [panNumber, setPanNumber] = React.useState("");
  // const [dateOfInit, setDateOfInit] = React.useState(dayjs("2022-04-17"));
  const [countOfDirector, setCountOfDirector] = React.useState();

  const [address, setAddress] = React.useState("");
  const [contactNumber, setcontactNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [coveredUnderAudit, setCoveredUnderAudit] = React.useState(false);
  const [status, setStatus] = React.useState();

  const [createdDateTime, setCreatedDateTime] = React.useState("");
  const [modifiedDateTime, setModifiedDateTime] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");
  //----
  function setMCADetails(mcaDetails) {
    if (mcaDetails) {
      setId(mcaDetails["id"]);
      // setOwnerRef(gstDetails["ownerRef"]);
      setCompanyName(mcaDetails["companyName"]);
      setCompanyType(mcaDetails["companyType"]);
      setCin(mcaDetails["cin"]);
      setPanNumber(mcaDetails["panNumber"]);
      // setDateOfInit(mcaDetails["dateOfInit"]);
      setCountOfDirector(mcaDetails["countOfDirector"]);
      setAddress(mcaDetails["address"]);
      setcontactNumber(mcaDetails["contactNumber"]);
      setEmail(mcaDetails["email"]);
      setPassword(mcaDetails["password"]);
      setCoveredUnderAudit(mcaDetails["coveredUnderAudit"]);
      setStatus(mcaDetails["status"]);
      setCreatedDateTime(mcaDetails["createdDateTime"]);
      setModifiedDateTime(mcaDetails["modifiedDateTime"]);
    }
  }

  const handleTypeOfEntityChange = (event) => {
    setCompanyType(event.target.value);
  };

  React.useEffect(() => {
    console.log(id);
    if (ownerRef) {
      // get user and set form fields
      getMCARecordByOwnerRefId(ownerRef).then((res) => {
        if (res && res.data) setMCADetails(res.data[0]);
      });
    }
  }, []);

  const onSubmit = (e) => {
    console.log(ownerRef);
    e.preventDefault();
    console.log("onsubmit");
    if (!id) {
      let mcaRecord = {
        id: "",
        ownerRef: ownerRef,
        companyName: companyName,
        companyType: companyType,
        cin: cin,
        panNumber: panNumber,
        // dateOfInit: dateOfInit,
        countOfDirector: countOfDirector,
        address: address,
        contactNumber: contactNumber,
        email: email,
        password: password,
        coveredUnderAudit: coveredUnderAudit,
        status: status,
      };
      createMCARecord(mcaRecord)
        .then((res) => {
          if (res && res.data) {
            setMCADetails(res.data);
            setMessage("MCA Record created successfully");
            setOpenSnackbar(true);
          }
        })
        .catch((error) => {
          console.error(error.message);
          setMessage(error.message);
          setOpenSnackbar(true);
        });
    } else {
      let mcaRecord = {
        id: id,
        ownerRef: ownerRef,
        companyName: companyName,
        companyType: companyType,
        cin: cin,
        panNumber: panNumber,
        // dateOfInit: dateOfInit,
        countOfDirector: countOfDirector,
        address: address,
        contactNumber: contactNumber,
        email: email,
        password: password,
        coveredUnderAudit: coveredUnderAudit,
        status: status,
      };
      updateMCARecord(mcaRecord)
        .then((res) => {
          if (res && res.data) {
            setMCADetails(res.data);
            setMessage("MCA Record updated successfully");
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
        <Header title="MCA" subtitle="Details" />
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
      <ReadOnlyFields service="mca" data={props.data} />
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
          label="Company/LLP Name"
          name="companyName"
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="PAN"
          name="pan"
          value={panNumber}
          onChange={(event) => setPanNumber(event.target.value)}
          sx={{ gridColumn: "span 2" }}
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

        <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
          <InputLabel id="typeOfEntityLabel" textColor="secondary">
            Type of Entity
          </InputLabel>
          <Select
            labelId="typeOfEntitySelectLabel"
            id="companyType"
            value={companyType}
            onChange={handleTypeOfEntityChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="LIMITED_LIABILITY_PARTNERSHIP">
              Limited Liability Partnership
            </MenuItem>
            <MenuItem value="COMPANY">Company</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="CIN/LLPIN"
          name="cin"
          value={cin}
          onChange={(event) => setCin(event.target.value)}
          sx={{ gridColumn: "span 2" }}
        />

        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="DOI"
            value={dateOfInit}
            onChange={(newValue) => setDateOfInit(newValue)}
            sx={{ gridColumn: "span 2" }}
          />
        </LocalizationProvider> */}

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
            name="coveredUnderAudit"
            value={coveredUnderAudit}
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

export default MCA;
