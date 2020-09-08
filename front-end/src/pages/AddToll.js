import React from "react";
import {
  TextField,
  Box,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import axios from "../api/index";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const fields = {
  location: "",
  name: "",
};

export default function AddToll() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    ...fields,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  const submit = async () => {
    try {
      const response = await axios.post("/api/toll/create-toll", { ...state });
      alert("Sucessfully Added Toll");
      history.push("/");
    } catch (err) {
      alert("Error adding the Toll");
      console.log(err);
    }
  };

  return (
    <Container fixed>
      <Box className={classes.titleBox}>
        <Typography variant="h4">Add Toll Both</Typography>
      </Box>
      <Box className={classes.btn_container}>
        <TextField
          variant="outlined"
          label="Toll Name"
          name="name"
          value={state.name}
          className={classes.textInput}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          label="Toll Location"
          name="location"
          value={state.location}
          className={classes.textInput}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.textInput}
          onClick={() => submit()}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  titleBox: {
    textAlign: "center",
  },
  btn_container: {
    margin: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 300,
  },
  textInput: {
    margin: theme.spacing(2),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
