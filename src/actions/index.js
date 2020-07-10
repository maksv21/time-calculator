import {
  KEY_PRESSED
} from "../constants";

export const keyPressed = keyValue => ({
  type: KEY_PRESSED,
  keyValue,
});

