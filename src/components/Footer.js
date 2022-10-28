import { switchTodoViewType, todoViewType } from "../redux/appSlice";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { useState } from "react";

const Footer = () => {
    const [todoType, setTodoType] = useState("all")
    const dispatch = useDispatch();

    function switchTodoView(type) {
        dispatch(switchTodoViewType({ type }))
        setTodoType(type);
    }

    return (
        <section className="summary-section">
            <Grid container width={100+"%"} marginTop={4} direction="row"
                  alignItems="center"
                  >
                <Grid className="title" item xs={2}>
                    Show:
                </Grid>
                <Grid item xs={1}>
                    <button type="button" className={todoType === todoViewType.ALL && 'active'} onClick={() => switchTodoView(todoViewType.ALL)}>All</button>
                </Grid>
                <Grid item xs={3}>
                    <button type="button" className={todoType === todoViewType.COMPLETED && 'active'} onClick={() => switchTodoView(todoViewType.COMPLETED)}>Completed</button>
                </Grid>
                <Grid item xs={2}>
                    <button type="button" className={todoType === todoViewType.INCOMPLETED && 'active'} onClick={() => switchTodoView(todoViewType.INCOMPLETED)}>Incompleted</button>
                </Grid>
            </Grid>
        </section>
    );
};

export default Footer;
