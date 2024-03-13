import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const IncomeTax = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="20px">
      <Header title="Income Tax" subtitle="Details" />
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Pan No"
                name="Pan No."
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Aadhar"
                    name="aadhar"
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="DOB/DOI"
                    name="dob_doi"
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Login Password"
                  name="login_password"
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Covered Under Audit"
                  name="covered_under_audit"
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

export default IncomeTax;