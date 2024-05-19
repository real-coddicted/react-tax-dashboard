import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Form from "../form";
import { getUsers } from "../../service/userService";
import { Navigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Team = () => {
  const [rows, setRows] = React.useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState();
  const [firstName, setFirstName] = React.useState();
  const [authenticated, setauthenticated] = React.useState(null);

  React.useMemo(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    console.log("loggedInUser: " + loggedInUser);
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);

  //on page load - fetch users
  React.useEffect(() => {
    // get user and set form fields
    try {
      console.log("1111");
      const response = getUsers().then((res) => res);
      console.log("22221" + response);
      console.log("22222" + response.data);
      if (response && response.data) setRows(response.data);
      else setRows([]);
    } catch (error) {
      console.log("3333");
      console.error("Error fetching users:", error);
      setRows([]);
    }
  }, []);

  //on modal close - fetch users
  React.useEffect(() => {
    // get user and set form fields
    try {
      const response = getUsers().then((res) => res);
      setRows(response.data);
      if (response && response.data) setRows(response.data);
      else setRows([]);
    } catch (error) {
      console.error("Error fetching users:", error);
      setRows([]);
    }
  }, [open]);

  const handleClickOpen = () => {
    setId();
    setFirstName();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "mobileNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          setId(currentRow.id);
          setFirstName(currentRow.firstName);
          setOpen(true);
          //return alert(JSON.stringify(currentRow, null, 4));
        };

        return (
          <Box display="grid" gap="20px">
            <Button
              variant="outlined"
              color="warning"
              size="small"
              onClick={onClick}
            >
              View / Edit
            </Button>
          </Box>
        );
      },
    },
  ];

  if (!authenticated) {
    console.log("redirecting to login page");
    return <Navigate replace to="/login" />;
  } else {
    return (
      <Box m="20px">
        <Header title="Users" subtitle="Manage Users" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="left"
            mt="5px"
            marginBottom="10px"
          >
            <Button
              type="button"
              color="secondary"
              variant="contained"
              onClick={handleClickOpen}
            >
              Add User
            </Button>
            <Dialog
              fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <AppBar sx={{ position: "relative" }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                  >
                    {!id ? "Add User" : firstName && `${firstName}'s Details`}
                  </Typography>
                </Toolbar>
              </AppBar>
              <Form id={id} firstName={firstName} onAdd={setId} />
            </Dialog>
          </Box>
          <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id} />
        </Box>
      </Box>
    );
  }
};

export default Team;
