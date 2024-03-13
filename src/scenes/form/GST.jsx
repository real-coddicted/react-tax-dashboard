import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const GST = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Dealer Type"
                name="dealerType"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Return Type"
                name="returnType"
                sx={{ gridColumn: "span 2" }}
              />
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
