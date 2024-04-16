import { Box, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { getUserById } from "../../service/userService";

const LocalAuthoritySpecificFields = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [tan, setTan] = React.useState("");
  const isAddMode = !props.id;

  function setUser(user) {
    setTan(user["tan"]);
  }

  React.useEffect(() => {
    if (!isAddMode) {
      // get user and set form fields
      getUserById(props.id).then((user) => {
        setUser(user);
      });
    }
  }, []);

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
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="TAN"
          value={tan}
          onChange={(event) => setTan(event.target.value)}
          name="tan"
          sx={{ gridColumn: "span 2" }}
        />
      </Box>
    </Box>
  );
};

export default LocalAuthoritySpecificFields;