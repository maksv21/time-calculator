import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    background: theme.palette.background.default,
  },

  expressionInput: {
    background: theme.palette.background.paper,
    height: "30%",
    position: "relative",
    boxShadow: "0px 0px 7px rgb(0 0 0 / 25%)",
  },

  keyboard: {
    height: "70%",
    maxWidth: "900px",
    margin: "0 auto",
  },

  inputFocused: {
    "&:focus": {
      border: "solid 2px black",
    },
  },
}));

export default useStyles;
