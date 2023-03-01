import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Title",
    sortable: true,
  },
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "Description",
    sortable: true,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
    sortable: true,
  },
  {
    id: "dueDate",
    numeric: false,
    disablePadding: true,
    label: "Due Date",
    sortable: true,
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "Created On",
    sortable: true,
  },
  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "Actions",
    sortable: false,
  },
];

const TaskHeading = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={
              orderBy === headCell.id && headCell.sortable ? order : false
            }
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              `${headCell.label}`
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TaskHeading.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default TaskHeading;
