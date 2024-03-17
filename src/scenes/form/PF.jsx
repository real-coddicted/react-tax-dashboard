import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const PF = ({ id }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

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
          label="Firm Name"
          name="firmName"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="ESIC REGISTRATION  NO"
          name="esicRegistrationNo"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Covered Under Audit"
          name="covered_under_audit"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Pan No"
          name="pan"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="AUTHO SIGN"
          name="authoSign"
          sx={{ gridColumn: "span 2" }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="DOR"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            sx={{ gridColumn: "span 2" }}
          />
        </LocalizationProvider>
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
          fullWidth
          variant="filled"
          type="text"
          label="Login Password"
          name="login_password"
          sx={{ gridColumn: "span 4" }}
        />
      </Box>
    </Box>
  );
};

export default PF;
