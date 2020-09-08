import React from "react";
import {
  TextField,
  Box,
  Container,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from "@material-ui/core";
import axios from "../api/index";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const fields = {
  vehicle_type: "",
  brand: "",
  model: "",
  license_plate: "",
};

export default function AddVehicle() {
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
      const response = await axios.post("/api/user/add-vehicle", { ...state });
      alert("Sucessfully Added Vehicle");
      history.push("/user-dashboard");
    } catch (err) {
      alert("Error adding the Vehicle");
      console.log(err);
    }
  };

  return (
    <Container fixed>
      <Box className={classes.titleBox}>
        <Typography variant="h4">Register Vechicle</Typography>
      </Box>
      <Box className={classes.btn_container}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Vehicle Type</InputLabel>
          <Select
            value={state.vehicle_type}
            onChange={handleChange}
            label="Vehicle Type"
            name="vehicle_type"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Car/Jeep/Van"}>Car/Jeep/Van</MenuItem>
            <MenuItem value={"LCV"}>LCV</MenuItem>
            <MenuItem value={"Bus/Truck"}>Bus/Truck</MenuItem>
            <MenuItem value={"3 Axle"}>3 Axle</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          label="License Plate Number"
          name="license_plate"
          value={state.license_plate}
          className={classes.textInput}
          onChange={handleChange}
        />

        <TextField
          variant="outlined"
          label="Car Brand"
          name="brand"
          value={state.brand}
          className={classes.textInput}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          label="Car Model"
          name="model"
          value={state.model}
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
