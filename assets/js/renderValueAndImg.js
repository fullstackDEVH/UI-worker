import {
  dataAPI,
  dataAPI2,
  dataChecker,
  dataEntry,
} from "../constant/dataApi.js";
import { ROLES } from "../constant/type.js";
import { addClassList, removeAllClassList } from "./helper/classList.js";
import { renderUIChecker, renderUIEntry } from "./renderWorker.js";
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

  /*
    .main__contain__right__input.entry_1 > input
    nếu là checker thì thêm: 
    .main__contain__right__input.entry_2 > input

  */

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
  } else if (ROLES[role] === "CHECKER") {
    for (var i = 0; i <= formatNumber - 1; i++) {
      inputEntry[i].value = dataAPI1[currentIndex]?.values[i]
        ? dataAPI1[currentIndex]?.values[i]
        : "";
      inputEntry2[i].value = dataAPI2[currentIndex]?.values[i]
        ? dataAPI2[currentIndex]?.values[i]
        : "";
    }
  };
};

export const checkConditionRenderImgAndValue = (
  btnName,
  currentIndex,
  number,
  role = "ENTRY",
  dataAPI1 = [],
  dataAPI2 = []
) => {
  // if(enter_input_dom.value.length < 1){
  //   alert('length must be > 1')
  //   return;
  // }

  let inputEntry1 = main__contain__right_dom.querySelectorAll(
    ".main__contain__right__input.entry_1 > input"
  );

  let inputEntry2 = main__contain__right_dom.querySelectorAll(
    ".main__contain__right__input.entry_2 > input"
  );

  if (role === ROLES.CHECKER) {
    // if (!inputEntry[0].value || !inputEntry[1].value) return;
    let error = false;
    removeAllClassList(inputEntry1, "warning");
    removeAllClassList(inputEntry2, "warning");

    for (let i = 0; i <= inputEntry1.length - 1; i++) {
      if (!inputEntry1[i].value) {
        addClassList(inputEntry1[i], "warning")
        error= true;
      };
      
      if (!inputEntry2[i].value) {
        addClassList(inputEntry2[i], "warning")
        error= true;
      };
    };

    if(error) return currentIndex;

    switch (btnName) {
      case "ENTRY1":
        dataChecker[currentIndex] = {
          ...dataAPI1[currentIndex],
          value: inputEntry1[0].value,
        };
        break;
      case "ENTRY2":
        dataChecker[currentIndex] = {
          ...dataAPI2[currentIndex],
          value: inputEntry1[1].value,
        };
        break;
      case "BOTH":
        dataChecker[currentIndex] = {
          ...dataAPI1[currentIndex],
          value: inputEntry1[0].value,
        } ?? {
          ...dataAPI2[currentIndex],
          value: inputEntry1[1].value,
        };
        break;
      default:
        break;
    }
  } else if (role === ROLES.ENTRY) {
    let error = false;
    removeAllClassList(inputEntry1, "warning")
    for (let i = 0; i <= inputEntry1.length - 1; i++) {
      if (!inputEntry1[i].value) {
        addClassList(inputEntry1[i], "warning")
        error= true;
      };

    };

    if(error) return currentIndex;
  
    dataEntry[currentIndex] = {
      ...dataAPI1[currentIndex],
      value: inputEntry1[0].value,
    };
  }

  if (
    ["NEXT", "ENTRY1", "ENTRY2", "BOTH"].includes(btnName) &&
    currentIndex >= dataAPI1.length - 1
  )
    return currentIndex;

  if (btnName === "PREVIOUS" && currentIndex < 1) return currentIndex;

  currentIndex += number;

  renderImgAndValue(currentIndex, role, dataAPI1, dataAPI2);
  return currentIndex;
};

// gọi lại hàm handle btn
