import { shortcutsWorker } from "../../constant/shortcutApi.js";
import { switchCaseShortCut } from "./checkKeyCode.js";

let ctrlKeyPressed = false;
let altKeyPressed = false;

export const handleKeyUp = (event) => {
  if (event.ctrlKey) {
    ctrlKeyPressed = false;
  }
  else if (event.altKey) {
    altKeyPressed = false;
  }

  return {
    ctrlKeyPressed,
    altKeyPressed,
  };
};

export const handleKeyDown = (event) => {
  if (event.ctrlKey) {
    ctrlKeyPressed = true;
    ctrlKeyPressed = false;
  }
   else if (event.altKey) {
    altKeyPressed = true;
    altKeyPressed = false;

  } else {
    ctrlKeyPressed = false;
    altKeyPressed = false;
  }

  return {
    ctrlKeyPressed,
    altKeyPressed,
  };
};

export const handleShortcut = (event, isShowModal, currentIndex, data) => {
  event.preventDefault();
  if (isShowModal) return;

  const keyEvent = event.keyCode;
  const isControll = event.getModifierState("Control");
  const isAlt = event.getModifierState("Alt");


  shortcuts.forEach((shortcut) => {
    if (
      isControll &&
      shortcut.key.code[0] === 17 &&
      shortcut.key.code[1] === keyEvent
    ) {
      return switchCaseShortCut(shortcut.name, currentIndex, data);
    } else if (
      isAlt &&
      shortcut.key.code[0] === 18 &&
      shortcut.key.code[1] === keyEvent
    ) {
      return switchCaseShortCut(shortcut.name, currentIndex, data);
    }
  });
};
