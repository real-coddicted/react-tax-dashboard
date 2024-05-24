import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Form from "../form";
import Tax from "../form/Tax";
import { getCustomers } from "../../service/customerService";
import { Navigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Customers = () => {
  const [rows, setRows] = React.useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState();
  const [title, setTitle] = React.useState();
  const [authenticated, setauthenticated] = React.useState(null);
  const [openTaxDialog, setOpenTaxDialog] = React.useState(false);
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] =
    React.useState(false);

  React.useMemo(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);

  //on page load - fetch users
  React.useEffect(() => {
    // get user and set form fields
    try {
      getCustomers()
        .then((res) => {
          if (res) setRows(res.data);
          else setRows([]);
        })
        .catch((error) => {
          console.error(error.request);
          setRows([]);
        });
    } catch (error) {
      console.error("Error fetching users:", error);
      setRows([]);
    }
  }, []);

  //on modal close - fetch users
  React.useEffect(() => {
    // get user and set form fields
    try {
      getCustomers()
        .then((res) => {
          if (res) setRows(res.data);
          else setRows([]);
        })
        .catch((error) => {
          console.error(error.request);
          setRows([]);
        });
    } catch (error) {
      console.error("Error fetching users:", error);
      setRows([]);
    }
  }, [open]);

  const handleClickOpen = () => {
    setId();
    setTitle();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenTaxDialog = () => {
    setId();
    setTitle();
    setOpenTaxDialog(true);
  };

  const handleCloseTaxDialog = () => {
    setOpenTaxDialog(false);
  };

  const handleCloseDeleteConfirmationDialog = () => {
    setOpenDeleteConfirmationDialog(false);
  };

  const getTitle = (row) => {
    if (row.category === "INDIVIDUAL") {
      return `${row.category}: ${row.firstName} ${row.lastName}`;
    } else {
      return `${row.category}: ${row.companyName}`;
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      valueGetter: (value, row) => {
        if (row.category === "INDIVIDUAL")
          return `${row.firstName || ""} ${row.lastName || ""}`;
        else return `${row.companyName}`;
      },
      flex: 1,
    },
    {
      field: "contactNumber",
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
          setTitle(getTitle(currentRow));
          setOpen(true);
          //return alert(JSON.stringify(currentRow, null, 4));
        };

        const onClickTax = (e) => {
          const currentRow = params.row;
          console.log("66666666" + JSON.stringify(currentRow));
          setId(currentRow.id);
          setTitle(getTitle(currentRow));
          setOpenTaxDialog(true);

          //return alert(JSON.stringify(currentRow, null, 4));
        };

        const onDelete = (e) => {
          const currentRow = params.row;
          setId(currentRow.id);
          setTitle(getTitle(currentRow));
          setOpenDeleteConfirmationDialog(true);
        };

        return (
          <Box display="flex">
            <Box marginRight="10px">
              <Button
                variant="outlined"
                color="info"
                size="small"
                onClick={onClick}
              >
                View / Edit
              </Button>
            </Box>
            <Box marginRight="10px">
              <Button
                variant="outlined"
                color="warning"
                size="small"
                onClick={onClickTax}
              >
                Tax
              </Button>
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={onDelete}
              >
                Delete
              </Button>
            </Box>
          </Box>
        );
      },
    },
  ];

  if (!authenticated) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <Box m="20px">
        <Header title="Customers" subtitle="Manage Customers" />
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
              Add
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
                    {!id ? "Add Customer" : title}
                  </Typography>
                </Toolbar>
              </AppBar>
              <Form id={id} name={title} onAdd={setId} setOpen={setOpen} />
            </Dialog>
            <Dialog
              fullScreen
              open={openTaxDialog}
              onClose={handleCloseTaxDialog}
              TransitionComponent={Transition}
            >
              <AppBar sx={{ position: "relative" }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleCloseTaxDialog}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                  >
                    {!id ? "Add Customer" : title}
                  </Typography>
                </Toolbar>
              </AppBar>
              <Tax
                id={id}
                name={title}
                onAdd={setId}
                setOpen={setOpenTaxDialog}
              />
            </Dialog>
            <Dialog
              open={openDeleteConfirmationDialog}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDeleteConfirmationDialog}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Confirm Deletion"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Do you really want to delete the following record?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseDeleteConfirmationDialog}
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCloseDeleteConfirmationDialog}
                  color="error"
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id} />
        </Box>
      </Box>
    );
  }
};

export default Customers;
