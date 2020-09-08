import React from "react";
import { Button, Container, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

export default function UserDashboard() {
  const classes = useStyles();
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("tollPlazaToken");
    history.push("/");
  };
  return (
    <Container fixed className={classes.container}>
      <Box className={classes.titleBox}>
        <Typography variant="h4">User Dashboard</Typography>
      </Box>
      <Box className={classes.btn_container}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => history.push("/add-vechicle")}
        >
          Register Vechicle
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => history.push("/check-into-toll")}
        >
          Check Into Toll
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => history.push("/check-out-toll")}
        >
          Checkout Out Toll
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => history.push("/")}
        >
          Home Page
        </Button>

        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => handleLogout()}
        >
          Log Out
        </Button>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles({
  container: {
    padding: 50,
  },
  button: {
    margin: 20,
    width: 200,
    height: 70,
  },
  btn_container: {
    margin: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  titleBox: {
    textAlign: "center",
  },
});
