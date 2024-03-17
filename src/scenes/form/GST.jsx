import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const GST = ({ id }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [dealerType, setDealerType] = React.useState("");

  const handleDealerTypeChange = (event) => {
    setDealerType(event.target.value);
  };

  const [returnType, setReturnType] = React.useState("");

  const handleReturnTypeChange = (event) => {
    setReturnType(event.target.value);
  };

  const [value, setValue] = React.useState(dayjs("2022-04-17"));

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
          <Button type="submit" color="secondary" variant="contained">
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Reg."
            value={value}
            onChange={(newValue) => setValue(newValue)}
            sx={{ gridColumn: "span 2" }}
          />
        </LocalizationProvider>
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
    </Box>
  );
};

export default GST;
