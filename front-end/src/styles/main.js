import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
  textInput: {
    margin: theme.spacing(2),
    minWidth: 300,
  },
}));

export default useStyles;
