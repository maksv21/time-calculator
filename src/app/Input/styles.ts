import { makeStyles } from "@material-ui/core";

import type { Theme } from "@material-ui/core";

export interface Props {
  fontSize: number;
}

export const inputPadding = 25;
const caretWidth = 2;

const useStyles = makeStyles<Theme>((theme) => ({
  input: {
    width: "147px",
    fontSize: "13.3px",
    alignItems: "center",
    color: "fieldtext",
    letterSpacing: "normal",
    wordSpacing: "normal",
    lineHeight: "normal",
    textTransform: "none",
    textIndent: "0px",
    textShadow: "none",
    display: "inline-block",
    textAlign: "start",
    appearance: "auto",
    "-webkit-rtl-ordering": "logical",
    cursor: "text",
    backgroundColor: "field",
    margin: "0em",
    padding: "1px 2px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgb(133, 133, 133)",
    borderImage: "initial",
    borderRadius: "2px",

    "&:hover": {
      borderColor: "rgb(79, 79, 79)",
    },
  },
  inputFocused: {
    outlineOffset: 0,
    outline: "-webkit-focus-ring-color auto 1px",
  },
}));

export default useStyles;
