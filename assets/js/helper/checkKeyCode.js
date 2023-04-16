import { renderModalZoomImg } from "../renderModal.js";
import { checkConditionRenderImgAndValue } from "../renderValueAndImg.js";

export const isAlphaNumericKey = (event) => {
  const keyCode = event.keyCode;
  const isAlphabet = keyCode >= 65 && keyCode <= 90;
  const isNumeric = keyCode >= 48 && keyCode <= 57;
  const isNumpadNumeric = keyCode >= 96 && keyCode <= 105;

  return isAlphabet || isNumeric || isNumpadNumeric;
};

export const switchCaseShortCut = (
  shortcutName,
  currentIndex,
  role,
  dataAPI1,
  dataAPI2
) => {

  switch (shortcutName) {
    case "NEXT":
      return checkConditionRenderImgAndValue(
        shortcutName,
        currentIndex,
        1,
        role,
        dataAPI1,
        dataAPI2
      );
    case "PREVIOUS":
      return checkConditionRenderImgAndValue(
        shortcutName,
        currentIndex,
        -1,
        role,
        dataAPI1,
        dataAPI2
      );

    case "ZOOM":
      renderModalZoomImg(currentIndex);
      return;

    case "ENTRY1":
      return checkConditionRenderImgAndValue(
        shortcutName,
        currentIndex,
        1,
        role,
        dataAPI1,
        dataAPI2
      );

    case "ENTRY2":
      return checkConditionRenderImgAndValue(
        shortcutName,
        currentIndex,
        1,
        role,
        dataAPI1,
        dataAPI2
      );
    case "BOTH":
      return checkConditionRenderImgAndValue(
        shortcutName,
        currentIndex,
        1,
        role,
        dataAPI1,
        dataAPI2
      );
    default:
      return;
  }
};
