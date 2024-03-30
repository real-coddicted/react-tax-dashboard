import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React from "react";
import {
  getTDSRecordByOwnerRefId,
  createTDSRecord,
  updateTDSRecord,
} from "../../service/tdsService";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const TDS = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [id, setId] = React.useState("");
  const [ownerRef, setOwnerRef] = React.useState(props.id);
  const [companyName, setCompanyName] = React.useState("");
  const [tanNumber, setTanNumber] = React.useState("");
  const [panNumber, setPanNumber] = React.useState("");
  const [authorizedSignatory, setAuthorizedSignatory] = React.useState();
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isCoveredUnderAudit, setIsCoveredUnderAudit] = React.useState(false);
  const [status, setStatus] = React.useState();
  const [createdDateTime, setCreatedDateTime] = React.useState("");
  const [modifiedDateTime, setModifiedDateTime] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const isAddMode = !id;
  //----
  function setTDSDetails(tdsDetails) {
    setId(tdsDetails["id"]);
    // setOwnerRef(gstDetails["ownerRef"]);
    setCompanyName(tdsDetails["companyName"]);
    setTanNumber(tdsDetails["tanNumber"]);
    setPanNumber(tdsDetails["panNumber"]);
    setAuthorizedSignatory(tdsDetails["authorizedSignatory"]);
    setMobileNumber(tdsDetails["mobileNumber"]);
    setEmail(tdsDetails["email"]);
    setPassword(tdsDetails["password"]);
    setIsCoveredUnderAudit(tdsDetails["isCoveredUnderAudit"]);
    setStatus(tdsDetails["status"]);
    setCreatedDateTime(tdsDetails["createdDateTime"]);
    setModifiedDateTime(tdsDetails["modifiedDateTime"]);
  }

  React.useEffect(() => {
    console.log(isAddMode);

    // get user and set form fields
    getTDSRecordByOwnerRefId(ownerRef).then((tdsDetails) => {
      setTDSDetails(tdsDetails);
    });
  }, []);

  const onSubmit = (e) => {
    console.log(ownerRef);
    e.preventDefault();
    console.log("onsubmit");
    if (isAddMode) {
      let tdsRecord = {
        ownerRef: ownerRef,
        companyName: companyName,
        coveredUnderAudit: isCoveredUnderAudit,
        tanNumber: tanNumber,
        panNumber: panNumber,
        authorizedSignatory: authorizedSignatory,
        mobileNumber: mobileNumber,
        email: email,
        password: password,
        status: status,
      };
      createTDSRecord(tdsRecord).then((tdsRecord) => {
        setTDSDetails(tdsRecord);
        setMessage("TDS Record created successfully");
        setOpenSnackbar(true);
      });
    } else {
      let tdsRecord = {
        id: id,
        ownerRef: ownerRef,
        companyName: companyName,
        coveredUnderAudit: isCoveredUnderAudit,
        tanNumber: tanNumber,
        panNumber: panNumber,
        authorizedSignatory: authorizedSignatory,
        mobileNumber: mobileNumber,
        email: email,
        password: password,
        status: status,
      };
      updateTDSRecord(tdsRecord).then((tdsRecord) => {
        setTDSDetails(tdsRecord);
        setMessage("TDS Record updated successfully");
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
        <Header title="TDS" subtitle="Details" />
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
          label="TAN NO"
          name="tanNo"
          value={tanNumber}
          onChange={(event) => setTanNumber(event.target.value)}
          sx={{ gridColumn: "span 2" }}
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
        <TextField
          required
          fullWidth
          variant="filled"
          type="text"
          label="Contact Number"
          name="contact"
          value={mobileNumber}
          onChange={(event) => setMobileNumber(event.target.value)}
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

export default TDS;
