import React from "react";
import { Button, Container, Typography, Box } from "@material-ui/core";
import { Person, Dashboard, Receipt } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

export default function Index(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
      <Container className={classes.container} fixed>
        <Box className={classes.titleBox}>
          <Typography variant="h4">Toll Plaza Assignment </Typography>
        </Box>
        <Box className={classes.btn_container}>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            startIcon={<Person />}
            onClick={() => history.push("/user-dashboard")}
          >
            User
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            startIcon={<Receipt />}
            onClick={() => history.push("/toll-dashboard")}
          >
            Check All Recipts
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            startIcon={<Dashboard />}
            onClick={() => history.push("/toll-add")}
          >
            Add Toll Both
          </Button>
        </Box>
      </Container>
    </React.Fragment>
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
