import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "../api/index";

export default function CheckInToll() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    toll_booth_id: "",
    vehicle_id: "",
    type: "",
  });

  const [tolls, setTolls] = React.useState([]);
  const [vehicles, setVehicles] = React.useState([]);
  const [render, setRender] = React.useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [vehicleRes, tollRes] = await Promise.all([
          axios.get("api/user/get-vehicles"),
          axios.get("api/user/get-tolls"),
        ]);
        setTolls(tollRes.data);
        setVehicles(vehicleRes.data);
        setRender(true);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const submit = async () => {
    try {
      const receipt = await axios.post("api/user/issue-receipt", {
        ...state,
      });

      history.push("/receipt", { ...receipt.data });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    render && (
      <Container fixed>
        <Box className={classes.titleBox}>
          <Typography variant="h4">Check In Toll</Typography>
        </Box>
        <Box className={classes.btn_container}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Select Toll</InputLabel>
            <Select
              value={state.toll_booth_id}
              onChange={handleChange}
              label="Select Toll"
              name="toll_booth_id"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {tolls.map((t) => (
                <MenuItem value={t._id}>{t.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Select Vehicle</InputLabel>
            <Select
              value={state.vehicle_id}
              onChange={handleChange}
              label="Select Vehicle"
              name="vehicle_id"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {vehicles.map((v) => (
                <MenuItem value={v._id}>
                  {v.brand} - {v.model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Trip Type</InputLabel>
            <Select
              value={state.type}
              onChange={handleChange}
              label="Trip Type"
              name="type"
            >
              <MenuItem value={"one_way"}>One Way</MenuItem>
              <MenuItem value={"round"}>Round Trip</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className={classes.textInput}
            onClick={() => submit()}
          >
            Pay
          </Button>
        </Box>
      </Container>
    )
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
