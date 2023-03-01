import { useSelector, useDispatch } from "react-redux";
import EnhancedTable from "./components/TaskList";
import "./App.css";
import SnackbarAlert from "./components/Alert";
import { handleAlert } from "./store/slices/taskSlice";

function App() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.tasks.alert);
  return (
    <div>
      <EnhancedTable />
      {alert?.show && (
        <SnackbarAlert
          {...alert}
          handleClose={() => dispatch(handleAlert({ show: false }))}
        />
      )}
    </div>
  );
}

export default App;
