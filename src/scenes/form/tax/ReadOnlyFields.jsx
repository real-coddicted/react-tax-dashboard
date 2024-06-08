import { Box, TextField, InputAdornment } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ReadOnlyFields = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const isIncomeTax = (props) => {
    return props.service === "incomeTax";
  };

  const isGST = (props) => {
    return props.service === "gst";
  };

  const isMCA = (props) => {
    return props.service === "mca";
  };

  const isECIS = (props) => {
    return props.service === "ecis";
  };

  const isPF = (props) => {
    return props.service === "pf";
  };

  const isTDS = (props) => {
    return props.service === "tds";
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
        {/* Income Tax  | GST */}
        {(isIncomeTax() || isGST()) && (
          <TextField
            disabled
            fullWidth
            variant="filled"
            value={props.state.name}
            type="text"
            label="Individual/Firm Name"
            name="name"
            sx={{ gridColumn: "span 2" }}
          />
        )}
        {/* MCA | TDS */}
        {(isMCA() || isTDS()) && (
          <TextField
            disabled
            fullWidth
            variant="filled"
            value={props.state.companyName}
            type="text"
            label="Company/LLP Name"
            name="companyName"
            sx={{ gridColumn: "span 2" }}
          />
        )}
        {/* Income Tax | MCA | TDS*/}
        {(isIncomeTax() || isMCA() || isTDS()) && (
          <TextField
            disabled
            fullWidth
            variant="filled"
            type="text"
            value={props.state.panNumber}
            label="Pan No"
            name="panNumber"
            sx={{ gridColumn: "span 4" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      navigator.clipboard.writeText(props.state.panNumber)
                    }
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        {/* Income Tax */}
        {isIncomeTax() && (
          <TextField
            disabled
            fullWidth
            variant="filled"
            type="text"
            value={props.state.aadharNumber}
            label="Aadhar"
            name="aadharNumber"
            sx={{ gridColumn: "span 4" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      navigator.clipboard.writeText(props.state.aadharNumber)
                    }
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        {/* Income Tax | GST | MCA | PF | TDS*/}
        {(isIncomeTax() || isGST() || isMCA() || isPF() || isTDS()) && (
          <TextField
            disabled
            fullWidth
            variant="filled"
            value={props.state.email}
            type="text"
            label="Email"
            name="email"
            sx={{ gridColumn: "span 2" }}
          />
        )}
        {/* Income Tax | GST | MCA | PF | TDS*/}
        {(isIncomeTax() || isGST() || isMCA() || isPF() || isTDS()) && (
          <TextField
            disabled
            fullWidth
            variant="filled"
            type="text"
            value={props.state.contactNumber}
            label="Contact Number"
            name="contactNumber"
            sx={{ gridColumn: "span 2" }}
          />
        )}
        {/* Income Tax  | GST | MCA | TDS*/}
        {(isIncomeTax() || isGST() || isMCA() || isTDS()) && (
          <TextField
            disabled
            fullWidth
            variant="filled"
            value={props.state.authorisedPerson}
            type="text"
            label="Authorised Person"
            name="authorisedPerson"
            sx={{ gridColumn: "span 2" }}
          />
        )}
        {/* Income Tax | MCA*/}
        {(isIncomeTax() || isMCA()) && (
          <TextField
            disabled
            fullWidth
            variant="filled"
            type="text"
            value={props.state.address.addressLine1}
            label="Address"
            name="addressLine1"
            sx={{ gridColumn: "span 4" }}
          />
        )}
        {/* Income Tax | MCA*/}
        {(isIncomeTax() || isMCA()) && (
          <TextField
            disabled
            fullWidth
            variant="filled"
            type="text"
            value={props.state.address.city}
            label="City"
            name="city"
            sx={{ gridColumn: "span 2" }}
          />
        )}
        {/* Income Tax | MCA*/}
        {(isIncomeTax() || isMCA()) && (
          <TextField
            disabled
            fullWidth
            variant="filled"
            value={props.state.address.state}
            type="text"
            label="State"
            name="state"
            sx={{ gridColumn: "span 2" }}
          />
        )}
        {/* Income Tax | MCA*/}
        {(isIncomeTax() || isMCA()) && (
          <TextField
            disabled
            fullWidth
            variant="filled"
            value={props.state.address.country}
            type="text"
            label="Country"
            name="country"
            sx={{ gridColumn: "span 2" }}
          />
        )}
        {/* Income Tax | MCA*/}
        {(isIncomeTax() || isMCA()) && (
          <TextField
            disabled
            fullWidth
            variant="filled"
            value={props.state.address.pinCode}
            type="text"
            label="Pin Code"
            name="pinCode"
            sx={{ gridColumn: "span 2" }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ReadOnlyFields;
