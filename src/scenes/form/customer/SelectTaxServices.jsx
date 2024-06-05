import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const SelectTaxServices = ({ state, dispatch }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleServiceChange = (event) => {
    const field = event.target.name;
    const value = event.target.checked;
    dispatch({
      type: "CHANGE_SERVICES",
      payload: {
        value,
        field,
      },
    });
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
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="incomeTax"
                checked={state.services.incomeTax ?? false}
                onChange={handleServiceChange}
                color="secondary"
              />
            }
            label="Income Tax"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="gst"
                checked={state.services.gst ?? false}
                onChange={handleServiceChange}
                color="secondary"
              />
            }
            label="GST"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="mca"
                checked={state.services.mca ?? false}
                onChange={handleServiceChange}
                color="secondary"
              />
            }
            label="MCA"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="pf"
                checked={state.services.pf ?? false}
                onChange={handleServiceChange}
                color="secondary"
              />
            }
            label="PF"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="esic"
                checked={state.services.esic ?? false}
                onChange={handleServiceChange}
                color="secondary"
              />
            }
            label="ESIC"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="tds"
                checked={state.services.tds ?? false}
                onChange={handleServiceChange}
                color="secondary"
              />
            }
            label="TDS"
          />
        </FormGroup>
      </Box>
    </Box>
  );
};

export default SelectTaxServices;
