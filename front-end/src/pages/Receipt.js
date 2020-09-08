import React from "react";
import {
  Container,
  Box,
  Paper,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from "../styles/main";

const textMap = {
  one_way: "One Way",
  round: "Round",
};

export default function Receipt() {
  const history = useHistory();
  const classes = useStyles();
  const reciptClasses = useStylesReceipt();
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    setState(history.location.state);
  }, []);

  return (
    <Container fixed>
      <Box className={classes.btn_container}>
        <Paper className={reciptClasses.paper}>
          <Typography variant="h4" align="center">
            Toll Receipt
          </Typography>
          <Typography variant="h6">
            No: <strong>{state.receipt_display_id}</strong>
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Trip Type: {textMap[state.type]}
          </Typography>
          <Typography variant="body2">
            Vehicle Reg No: {state.license_plate}{" "}
          </Typography>

          <Typography variant="body2">
            Trip Type Charge: &#8377; {state.trip_type_charge}{" "}
          </Typography>

          <Typography variant="body2">
            Vehicle type Charge: &#8377; {state.vehicle_type_charges}{" "}
          </Typography>
          <Typography variant="body2">
            Total Amount: &#8377; {state.total}{" "}
          </Typography>

          <Typography variant="body2">
            Date: {state.formatted_created_at}
          </Typography>
        </Paper>
        <Button onClick={() => history.push("/user-dashboard")}>
          Go Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
}

const useStylesReceipt = makeStyles({
  paper: {
    padding: 50,
    width: 500,
  },
});
