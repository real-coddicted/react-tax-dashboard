import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";

const GST = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [dealerType, setDealerType] = React.useState("");

  const handleDealerTypeChange = (event) => {
    setDealerType(event.target.value);
  };

  const [returnType, setReturnType] = React.useState("");

  const handleReturnTypeChange = (event) => {
    setReturnType(event.target.value);
  };

  return (
    <Box m="20px">
      <Header title="GST" subtitle="Details" />
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
          label="Trade Name"
          name="tradeName"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="GSTIN"
          name="gstin"
          sx={{ gridColumn: "span 4" }}
        />
        <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
          <InputLabel id="dealerTypeLabel" textColor="secondary">
            Dealer Type
          </InputLabel>
          <Select
            labelId="dealerTypeSelectLabel"
            id="dealerTypeSelect"
            value={dealerType}
            onChange={handleDealerTypeChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="DEALER_TYPE_REGULAR">Regular</MenuItem>
            <MenuItem value="DEALER_TYPE_COMPOSITION">Composition</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
          <InputLabel id="returnTypeLabel" textColor="secondary">
            Return Type
          </InputLabel>
          <Select
            labelId="returnTypeSelectLabel"
            id="returnTypeSelect"
            value={returnType}
            onChange={handleReturnTypeChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="RETURN_TYPE_MONTHLY">Monthly</MenuItem>
            <MenuItem value="RETURN_TYPE_QUARTERLY">Quarterly</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Date of Reg."
          name="dateOfRef"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Current Status"
          name="currentStatus"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          required
          fullWidth
          variant="filled"
          type="text"
          label="Email"
          name="email"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          required
          fullWidth
          variant="filled"
          type="text"
          label="Contact Number"
          name="contact"
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
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
          Create New User
        </Button>
      </Box>
    </Box>
  );
};

export default GST;
