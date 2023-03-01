import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getAllTasks, deleteTask } from "../../store/actions/taskActions";
import CircularProgress from "@mui/material/CircularProgress";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import "./style.css";
import { showDialog, setFilter } from "../../store/slices/taskSlice";
import TaskForm from "../TaskForm";
import { FORM_BUTTON_TYPE } from "../../constants";
import TaskHeading from "../TaskHeading";
import TaskToolbar from "../TaskToolBar";

const TaskList = () => {
  const [selected, setSelected] = React.useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.tasks?.isLoading);
  const tasksList = useSelector((state) => state.tasks?.data);
  const { sortBy, sortOrder } = useSelector((state) => state.tasks.filter);

  React.useEffect(() => {
    dispatch(getAllTasks({}));
  }, []);

  const handleDeleteMany = () => {
    dispatch(deleteTask(selected));
    setSelected([]);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = sortBy === property && sortOrder === "asc";
    const sortOptions = { sortBy: property, sortOrder: isAsc ? "desc" : "asc" };
    dispatch(setFilter(sortOptions));
    dispatch(getAllTasks(sortOptions));
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = tasksList.map((task) => task._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const isSelected = (_id) => selected.indexOf(_id) !== -1;
  const handleEdit = (task, e) => {
    e.stopPropagation();
    dispatch(showDialog({ task, type: FORM_BUTTON_TYPE.EDIT }));
  };
  const handleDeleteOne = (id, e) => {
    e.stopPropagation();
    dispatch(deleteTask([id]));
  };
  return (
    <Box sx={{ width: "100%", marginTop: 5, marginBottom: 20 }}>
      <TaskForm />
      <Box
        sx={{
          zIndex: 10,
          position: "fixed",
          bottom: "5%",
          right: "5%",
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: "sticky" }}
          icon={<SpeedDialIcon />}
          open={false}
          onClick={() => {
            dispatch(showDialog({ type: FORM_BUTTON_TYPE.ADD }));
          }}
        />
      </Box>
      {isLoading ? (
        <Box className="progress-wrapper">
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TaskToolbar
            numSelected={selected.length}
            onDeleteMany={handleDeleteMany}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <TaskHeading
                numSelected={selected.length}
                order={sortOrder}
                orderBy={sortBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={tasksList.length}
              />

              <TableBody>
                {tasksList.map((task, index) => {
                  const isItemSelected = isSelected(task._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, task._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={task._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">{task.title}</TableCell>
                      <TableCell align="left">{task.description}</TableCell>
                      <TableCell align="left">{task.status}</TableCell>
                      <TableCell align="left">
                        {moment(task.dueDate).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell align="left">
                        {moment(task.createdAt).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell align="left">
                        <IconButton
                          aria-label="edit"
                          onClick={(e) => handleEdit(task, e)}
                        >
                          <EditIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => handleDeleteOne(task._id, e)}
                        >
                          <DeleteIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};
export default TaskList;
