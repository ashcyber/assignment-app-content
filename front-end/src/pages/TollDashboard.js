import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
} from "@material-ui/core";

import axios from "../api/index";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    padding: 50,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function TollDashboard() {
  const classes = useStyles();
  const [state, setState] = React.useState([]);

  useEffect(() => {
    (async function () {
      const { data } = await axios.get("/api/toll/check-history");
      setState(data);
    })();
  }, []);
  return (
    <Container fixed className={classes.container}>
      <Typography align="center" variant="h4">
        Receipts
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>Toll Name</TableCell>
              <TableCell align="right">Toll Location </TableCell>
              <TableCell align="right">Trip Type</TableCell>
              <TableCell align="right">Vehicle Type</TableCell>
              <TableCell align="right">Amount Collected</TableCell>
              <TableCell align="right">Issued timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map((row, index) => {
              console.log(row);

              return (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.toll_both_data.name}
                  </TableCell>
                  <TableCell align="right">
                    {row.toll_both_data.location}
                  </TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">
                    {row.vehicle_data.vehicle_type}
                  </TableCell>
                  <TableCell align="right">&#8377; {row.total}</TableCell>
                  <TableCell align="right"> {row.created_at}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
