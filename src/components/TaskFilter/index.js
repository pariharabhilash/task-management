import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getAllTasks } from "../../store/actions/taskActions";
import { STATUS, STATUS_FILTER } from "../../constants";
import { setFilter } from "../../store/slices/taskSlice";

const TaskFilter = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.tasks.filter.status);
  const handleFilterSelect = (e) => {
    const { value } = e.target;
    dispatch(setFilter({ status: value }));
    const filter = {};
    if (STATUS.includes(value)) {
      filter.status = value;
    }
    dispatch(getAllTasks(filter));
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel htmlFor="grouped-select">Filter by:</InputLabel>
      <Select
        id="grouped-select"
        label="Filter by: "
        value={status}
        onChange={handleFilterSelect}
      >
        <ListSubheader>Status</ListSubheader>
        <MenuItem
          value={STATUS_FILTER.NONE}
          selected={status === STATUS_FILTER.NONE}
        >
          None
        </MenuItem>
        <MenuItem
          value={STATUS_FILTER.PENDING}
          selected={status === STATUS_FILTER.PENDING}
        >
          Pending
        </MenuItem>
        <MenuItem
          value={STATUS_FILTER.COMPLETE}
          selected={status === STATUS_FILTER.COMPLETE}
        >
          Complete
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default TaskFilter;
