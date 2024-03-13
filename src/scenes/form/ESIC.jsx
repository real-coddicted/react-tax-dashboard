import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const ESIC = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="20px">
      <Header title="ESIC" subtitle="Details" />
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
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="DOR"
                    name="dor"
                    sx={{ gridColumn: "span 2" }}
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
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
    </Box>
  );
};

export default ESIC;
