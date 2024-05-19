import * as React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

function EditToolbar(props) {
  const { setRows, setRowModesModel, state } = props;

  const handleClick = () => {
    const id = state.participantDetails.length + 1;
    setRows((oldRows) => [...oldRows, { id, name: "", isNew: true }]);
    state.participantDetails = [
      ...state.participantDetails,
      { id, name: "", isNew: true },
    ];
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="secondary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function ParticipantDetails({ state, dispatch }) {
  const [rows, setRows] = React.useState(state.participantDetails);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    state.participantDetails = state.participantDetails.filter(
      (row) => row.id !== id
    );
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
      state.participantDetails = state.participantDetails.filter(
        (row) => row.id !== id
      );
    }
  };

  const processRowUpdate = (newRow, oldRow) => {
    console.log("7778");
    console.log(newRow);
    console.log("-----");
    console.log(oldRow);
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    state.participantDetails = state.participantDetails.map((row) =>
      row.id === newRow.id ? updatedRow : row
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "panId",
      headerName: "PAN",
      width: 120,
      editable: true,
    },
    {
      field: "aadharId",
      headerName: "Aadhar",
      width: 120,
      editable: true,
    },
    {
      field: "dinId",
      headerName: "DIN/DPIN",
      width: 120,
      editable: true,
    },
    {
      field: "profitSharingPercentage",
      headerName: "Shareholding/Partcipants profit sharing percentage",
      width: 120,
      editable: true,
    },
    {
      field: "contactNumber",
      headerName: "Contact",
      width: 120,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      editable: true,
    },
    {
      field: "addressLine1",
      headerName: "Address Line 1",
      width: 180,
      editable: true,
    },
    {
      field: "city",
      headerName: "City",
      width: 120,
      editable: true,
    },
    {
      field: "state",
      headerName: "State",
      width: 120,
      editable: true,
    },
    {
      field: "country",
      headerName: "Country",
      width: 120,
      editable: true,
    },
    {
      field: "pinCode",
      headerName: "Pin Code",
      width: 120,
      editable: true,
    },
  ];

  return (
    <Box>
      <Box m="20px">
        <h3>Participant Details</h3>
      </Box>
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel, state },
          }}
        />
      </Box>
    </Box>
  );
}
