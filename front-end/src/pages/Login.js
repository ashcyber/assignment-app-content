import React from "react";
import axios from "../api/index";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import useStyles from "../styles/main";

import { Link, useHistory } from "react-router-dom";

import { verifyToken, setAuthToken } from "../Service/auth";

const fields = {
  email: "",
  password: "",
};

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const isLoggedIn = verifyToken();

  const [state, setState] = React.useState({ ...fields });

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push("/user-dashboard");
    }
  }, [isLoggedIn]);

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
      const response = await axios.post("/api/user/login", {
        ...state,
      });

      localStorage.setItem("tollPlazaToken", response.data.token);

      setAuthToken(response.data.token);

      setState(fields);
    } catch (err) {
      alert("Error Log in User");
      console.log(err);
    }
  };

  return (
    <Container fixed className={classes.container}>
      <Typography variant="h4" className={classes.titleBox}>
        Login
      </Typography>
      <Box className={classes.btn_container}>
        <TextField
          label="Email"
          variant="outlined"
          className={classes.textInput}
          name="email"
          value={state.email}
          onChange={(e) => handleChange(e)}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          className={classes.textInput}
          name="password"
          value={state.password}
          onChange={(e) => handleChange(e)}
        />
        <Typography>
          Are you a new user? Then <Link to="/register">Register</Link>{" "}
        </Typography>
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
