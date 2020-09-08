import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../api/index";
export default function CheckoutToll() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    receipt_id: "",
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
      if (state.receipt_id) {
        const { data } = await axios.post("/api/user/validate-receipt", {
          ...state,
        });
        alert(data.message);
      } else {
        alert("Receipt ID cannot be empty");
      }
    } catch (err) {
      if (err.response.status === 500) {
        alert("Error Validating ");
      } else {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <Container fixed>
      <Box className={classes.titleBox}>
        <Typography variant="h4">Check Out Toll</Typography>
      </Box>
      <Box className={classes.btn_container}>
        <TextField
          label="Enter Receipt ID"
          variant="outlined"
          name="receipt_id"
          value={state.receipt_id}
          className={classes.textInput}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.textInput}
          onClick={() => submit()}
        >
          Validate Receipt
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
