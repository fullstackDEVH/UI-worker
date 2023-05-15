import { dataChecker, dataEntry } from "../constant/dataApi.js";
import { ROLES } from "../constant/type.js";
import {
  addClassList,
  removeAllClassList,
  removeClassList,
} from "./helper/classList.js";
import { renderModalAnswer } from "./renderModal.js";
import { renderUIChecker, renderUIEntry } from "./renderWorker.js";
import {
  header_dom,
  img_input_dom,
  main__contain__right_dom,
} from "./variablesDom.js";

let isDuplicateLastIndex = false;

export const renderImgAndValue = (
  currentIndex,
  role = "ENTRY",
  dataAPI1 = [],
  dataAPI2 = [],
  btnName = "ENTRY1"
) => {
  console.log(currentIndex);
  ROLES[role] === "ENTRY"
    ? renderUIEntry(currentIndex)
    : renderUIChecker(currentIndex);

  let inputEntry = main__contain__right_dom.querySelectorAll(
    ".main__contain__right__input.entry_1 > input"
  );

  let inputEntry2 = main__contain__right_dom.querySelectorAll(
    ".main__contain__right__input.entry_2 > input"
  );

  let formatNumber =
    dataAPI1[currentIndex].numberInput ?? dataAPI2[currentIndex].numberInput;

  header_dom.querySelector(
    ".header__item.pictures"
  ).textContent = `Remaining Pictures : ${currentIndex + 1}/${dataAPI1.length}`;

  img_input_dom.src = dataAPI1[currentIndex]?.urlImg;

  if (role === "ENTRY") {
    for (var i = 0; i <= formatNumber - 1; i++) {
      if (!dataAPI1[currentIndex]?.values[i]) {
        inputEntry[i].value = "";
        continue;
      }
      inputEntry[i].value = dataAPI1[currentIndex]?.values[i];
    }

    dataEntry[currentIndex] = dataAPI1[currentIndex]?.values;
  } else if (ROLES[role] === "CHECKER") {
    for (var i = 0; i <= formatNumber - 1; i++) {
      inputEntry[i].value = dataAPI1[currentIndex]?.values[i] ?? "";
      inputEntry2[i].value = dataAPI2[currentIndex]?.values[i] ?? "";
    }

    switch (btnName) {
      case "ENTRY1":
        if (currentIndex === 1) {
          dataChecker[0] = dataAPI1[0]?.values;
        }
        dataChecker[currentIndex] = dataAPI1[currentIndex]?.values;
        break;
      case "ENTRY2":
        if (currentIndex === 1) {
          dataChecker[0] = dataAPI2[0]?.values;
        }
        dataChecker[currentIndex] = dataAPI2[currentIndex]?.values;
        break;
      case "BOTH":
        dataChecker[currentIndex] = dataAPI1[currentIndex]?.values;
        break;
      case "PREVIOUS":
        isDuplicateLastIndex = false;
        dataChecker[currentIndex] = dataAPI1[currentIndex]?.values;
        break;
      default:
        break;
    }

    if (dataAPI1.length - 1 === currentIndex) {
      isDuplicateLastIndex && renderModalAnswer();

      if (["ENTRY1", "ENTRY2", "BOTH"].includes(btnName)) {
        isDuplicateLastIndex = true;
      }
    }
  }
};

export const checkConditionRenderImgAndValue = (
  btnName,
  currentIndex,
  number,
  role = "ENTRY",
  dataAPI1 = [],
  dataAPI2 = []
) => {
  let inputEntry1 = main__contain__right_dom.querySelectorAll(
    ".main__contain__right__input.entry_1 > input"
  );

  let inputEntry2 = main__contain__right_dom.querySelectorAll(
    ".main__contain__right__input.entry_2 > input"
  );

  let error = false;

  if (role === ROLES.CHECKER) {
    // if (!inputEntry[0].value || !inputEntry[1].value) return;
    removeAllClassList(inputEntry1, "warning");
    removeAllClassList(inputEntry2, "warning");

    for (let i = 0; i <= inputEntry1.length - 1; i++) {
      if (!inputEntry1[i].value) {
        addClassList(inputEntry1[i], "warning");
        error = true;
      }

      if (!inputEntry2[i].value) {
        addClassList(inputEntry2[i], "warning");
        error = true;
      }
    }

    if (error) return currentIndex;
  } else if (role === ROLES.ENTRY) {
    removeAllClassList(inputEntry1, "warning");

    for (let i = 0; i <= inputEntry1.length - 1; i++) {
      if (!inputEntry1[i].value) {
        addClassList(inputEntry1[i], "warning");
        error = true;
      }
    }

    if (error) return currentIndex;

    for (let i = 0; i <= inputEntry1.length - 1; i++) {
      if (!inputEntry1[i].value) {
        addClassList(inputEntry1[i], "warning");
        error = true;
      }
    }
  }

  if (
    ["NEXT", "ENTRY1", "ENTRY2", "BOTH"].includes(btnName) &&
    currentIndex >= dataAPI1.length - 1
  ) {
    renderImgAndValue(currentIndex, role, dataAPI1, dataAPI2, btnName);

    return currentIndex;
  }

  if (btnName === "PREVIOUS" && currentIndex < 1) return currentIndex;

  currentIndex += number;

  renderImgAndValue(currentIndex, role, dataAPI1, dataAPI2, btnName);
  return currentIndex;
};
