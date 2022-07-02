import { useCallback, useEffect } from "react";
import type { CaretElement, InputElement } from "../types";

interface Props {
  caretElem: CaretElement;
  onCaretPositionChange: (newPosition: number) => void;
  inputElem: InputElement;
}

export const useCaretPosition = ({
  onCaretPositionChange,
  caretElem,
  inputElem,
}: Props): void => {
  const handleCaretPositionChange = useCallback(
    (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // shouldFoucusRef.current = false;
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // shouldFoucusRef.current = true;
      }, 5000);
      const selection = window.getSelection();

      console.log("selection", selection);
      console.log("event", event);

      if (
        !selection ||
        selection.anchorNode === caretElem ||
        !inputElem?.contains(selection.anchorNode)
      )
        return;

      if (selection.type === "Caret") {
        const selectedElement = selection.anchorNode?.parentElement;

        let offset = 0;
        // value with error or just string, last children is caret
        if (inputElem?.children && inputElem.children.length > 1) {
          [...inputElem?.children].find((element) => {
            if (element !== selectedElement) {
              offset += element.textContent?.length || 0;
              return false;
            }

            offset += selection.anchorOffset;
            return true;
          });
        } else {
          offset = selection.anchorOffset;
        }

        onCaretPositionChange(offset);
      }
    },
    [caretElem, inputElem, onCaretPositionChange]
  );

  useEffect(() => {
    document.addEventListener("selectionchange", handleCaretPositionChange);
    return () => {
      document.removeEventListener(
        "selectionchange",
        handleCaretPositionChange
      );
    };
  }, [handleCaretPositionChange]);
};
