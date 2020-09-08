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
import { useHistory, Link } from "react-router-dom";

import { verifyToken } from "../Service/auth";

const fields = {
  full_name: "",
  driving_license: "",
  email: "",
  phone: "",
  password: "",
};

export default function Register(props) {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = React.useState({ ...fields });

  const isLoggedIn = verifyToken();

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
      await axios.post("/api/user/register", {
        ...state,
      });
      setState(fields);
      history.push("/login");
      alert("User Created Successfully");
    } catch (err) {
      alert("Error Creating the User");

      console.log(err);
    }
  };

  return (
    <Container fixed className={classes.container}>
      <Typography variant="h4" className={classes.titleBox}>
        Register
      </Typography>
      <Box className={classes.btn_container}>
        <TextField
          label="Full Name"
          variant="outlined"
          name="full_name"
          className={classes.textInput}
          value={state.full_name}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          label="Driving License"
          variant="outlined"
          name="driving_license"
          className={classes.textInput}
          value={state.driving_license}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          className={classes.textInput}
          value={state.email}
          type="email"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          label="Phone"
          variant="outlined"
          name="phone"
          type="number"
          className={classes.textInput}
          value={state.phone}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          className={classes.textInput}
          value={state.password}
          onChange={(e) => handleChange(e)}
        />
        <Typography>
          Already have an account? Then <Link to="/login">Login</Link>{" "}
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
