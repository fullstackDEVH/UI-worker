import {
  dataAPI,
  dataAPI2,
  dataChecker,
  dataEntry,
} from "../constant/dataApi.js";
import { ROLES } from "../constant/type.js";
import {
  header_dom,
  img_input_dom,
  main__contain__right_dom,
} from "./variablesDom.js";

export const renderImgAndValue = (
  currentIndex,
  role = "ENTRY",
  dataAPI1 = [],
  dataAPI2 = []
) => {
  let inputEnter = main__contain__right_dom.querySelectorAll(
    ".main__contain__right__input > input"
  );

  header_dom.querySelector(
    ".header__item.pictures"
  ).textContent = `Remaining Pictures : ${currentIndex + 1}/${dataAPI1.length}`;

  img_input_dom.src = dataAPI1[currentIndex]?.urlImg;

  if (role === "ENTRY") {
    inputEnter[0].value = dataAPI1[currentIndex]?.value;
  } else if (ROLES[role] === "CHECKER") {
    inputEnter[0].value = dataAPI1[currentIndex]?.value;
    inputEnter[1].value = dataAPI2[currentIndex]?.value;
  }
};

export const checkConditionRenderImgAndValue = (
  btnName,
  index,
  number,
  role = "ENTRY",
  dataAPI1 = [],
  dataAPI2 = []
) => {
  // if(enter_input_dom.value.length < 1){
  //   alert('length must be > 1')
  //   return;
  // }

  let inputEnter = main__contain__right_dom.querySelectorAll(
    ".main__contain__right__input > input"
  );

  if (role === ROLES.CHECKER) {
    if (!inputEnter[0].value || !inputEnter[1].value) return;

    switch (btnName) {
      case "ENTRY1":
        dataChecker[index] = {
          ...dataAPI1[index],
          value: inputEnter[0].value,
        };
        break;
      case "ENTRY2":
        dataChecker[index] = {
          ...dataAPI2[index],
          value: inputEnter[1].value,
        };
        break;
      case "BOTH":
        dataChecker[index] = {
          ...dataAPI1[index],
          value: inputEnter[0].value,
        } ?? {
          ...dataAPI2[index],
          value: inputEnter[1].value,
        };
        break;
      default:
        break;
    }
  } else if (role === ROLES.ENTRY) {
    if (!inputEnter[0].value) return;

    dataEntry[index] = {
      ...dataAPI1[index],
      value: inputEnter[0].value,
    };
  }

  if (
    ["NEXT", "ENTRY1", "ENTRY2", "BOTH"].includes(btnName) &&
    index >= dataAPI1.length - 1
  )
    return index;

  if (btnName === "PREVIOUS" && index < 1) return index;

  index += number;

  renderImgAndValue(index, role, dataAPI1, dataAPI2);
  return index;
};
