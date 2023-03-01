import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Modal from "../Modal";
import { hideDialog, updateForm } from "../../store/slices/taskSlice";
import { addTask, editTask } from "../../store/actions/taskActions";
import { FORM_BUTTON_TYPE } from "../../constants";

const TaskForm = () => {
  const { type, open } = useSelector((state) => state.tasks.dialog);
  const { title, description, dueDate, status, _id } = useSelector(
    (state) => state.tasks.dialog.data
  );
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    dispatch(updateForm({ [name]: value }));
  };
  const onSubmitHandler = () => {
    switch (type) {
      case FORM_BUTTON_TYPE.EDIT:
        dispatch(editTask({ title, description, dueDate, status, _id }));
        break;
      case FORM_BUTTON_TYPE.ADD:
        dispatch(addTask({ title, description, dueDate }));
        break;
      default:
        return;
    }
  };
  const onCloseHandler = () => dispatch(hideDialog());
  return (
    <Modal
      title={`${type} Task`}
      open={open}
      onClose={() => dispatch(hideDialog())}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          padding: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="title"
          name="title"
          label="Title"
          placeholder="Add Title"
          value={title}
          onChange={onChangeHandler}
          fullWidth
        />
        <TextField
          required
          id="description"
          name="description"
          label="Description"
          placeholder="Add Description"
          value={description}
          onChange={onChangeHandler}
          maxRows={4}
          multiline
          fullWidth
        />
        <TextField
          required
          id="dueDate"
          name="dueDate"
          label="Due Date"
          type="date"
          placeholder={moment().format("YYYY-MM-DD")}
          value={moment(dueDate).format("YYYY-MM-DD")}
          onChange={onChangeHandler}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {type === FORM_BUTTON_TYPE.EDIT && (
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="status">Status</InputLabel>
            <Select
              defaultValue={status}
              value={status}
              id="status"
              label="Status"
              name="status"
              onChange={onChangeHandler}
            >
              <ListSubheader>Status</ListSubheader>
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"complete"}>Complete</MenuItem>
            </Select>
          </FormControl>
        )}
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingLeft: 1.5,
            paddingRight: 1.5,
          }}
        >
          <Button variant="outlined" onClick={onCloseHandler}>
            Close
          </Button>
          <Button variant="outlined" onClick={onSubmitHandler}>
            {type}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskForm;
