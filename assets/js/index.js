import { dataAPI, dataAPI2, dataAPI3, dataAPI4, dataChecker, dataEntry } from "../constant/dataApi.js";
import { ROLES } from "../constant/type.js";
import { switchCaseShortCut } from "./helper/checkKeyCode.js";
import { toggleClassList } from "./helper/classList.js";
import { countdown } from "./helper/countDown.js";
import {
  getCustomSettingLocalStorage,
  checkLocalStorageIsAvailable,
} from "./helper/localStorage.js";

import {
  checkConditionRenderImgAndValue,
  renderImgAndValue,
} from "./renderValueAndImg.js";
import { renderHeader } from "./renderHeader.js";
import { renderModalAnswer } from "./renderModal.js";
import { renderShortcut } from "./shortcut.js";
import { renderUIChecker, renderUIEntry } from "./renderWorker.js";
import {
  header_dom,
  modal_container_dom,
  btn_close_modal_dom,
  main__contain__right_dom,
} from "./variablesDom.js";

let currentIndex = 0;

window.addEventListener("DOMContentLoaded", (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("role");
  let role = page ?? ROLES.ENTRY;

  let isShowModal = false;
  let shortcutLocalStorage = [];

  shortcutLocalStorage = checkLocalStorageIsAvailable(
    ROLES[role] === "ENTRY" ? "user-shortcuts" : "checker-shortcuts"
  );
  renderHeader();
  ROLES[role] === "ENTRY"
    ? renderUIEntry(currentIndex)
    : renderUIChecker(currentIndex);

  renderImgAndValue(currentIndex, role, dataAPI3, dataAPI4);
  renderShortcut(shortcutLocalStorage, role);
  countdown(25, 59, header_dom.querySelector(".header__item.times"));
  handleButtonEntry(1, role, dataAPI);

  ROLES[role] === "ENTRY"
    ? handleButtonEntry(currentIndex, role, dataAPI3)
    : handleButtonChecker(currentIndex, role, dataAPI3, dataAPI4);

  header_dom.querySelector(".header__item:last-child").onclick = () => {
    toggleClassList(modal_container_dom, "show");
    isShowModal = true;
  };

  btn_close_modal_dom.onclick = () => {
    toggleClassList(modal_container_dom, "show");
    isShowModal = false;

    shortcutLocalStorage = getCustomSettingLocalStorage(
      ROLES[role] === "ENTRY" ? "user-shortcuts" : "checker-shortcuts"
    );
  };

  document.addEventListener("keydown", (event) => {
    const isControll = event.getModifierState("Control");
    const isAlt = event.getModifierState("Alt");

    if (isShowModal) return;
    if (isControll || isAlt) event.preventDefault();

    const keyEvent = event.keyCode;

    shortcutLocalStorage.forEach((shortcut) => {
      if (
        isControll &&
        shortcut.key.code[0] === 17 &&
        shortcut.key.code[1] === keyEvent
      ) {
        currentIndex =
          switchCaseShortCut(
            shortcut.name,
            currentIndex,
            role,
            dataAPI3,
            dataAPI4
          ) ?? currentIndex;
      } else if (
        isAlt &&
        shortcut.key.code[0] === 18 &&
        shortcut.key.code[1] === keyEvent
      ) {
        currentIndex =
          switchCaseShortCut(
            shortcut.name,
            currentIndex,
            role,
            dataAPI3,
            dataAPI4
          ) ?? currentIndex;
      }
    });
  });
});

const handleButtonEntry = (currentIndex1, role, dataAPI) => {
  if (role !== ROLES.ENTRY) return;

  main__contain__right_dom.onclick = (e) => {
    if (e.target.closest("#btn_next")) {
      currentIndex = checkConditionRenderImgAndValue(
        "NEXT",
        currentIndex,
        1,
        role,
        dataAPI
      );
    }

    if (e.target.closest("#btn_pre")) {
      currentIndex = checkConditionRenderImgAndValue(
        "PREVIOUS",
        currentIndex,
        -1,
        role,
        dataAPI
      );
    }

    if (e.target.closest("#btn_exit")) {
      renderModalAnswer();
    }

    if (e.target.closest("#btn_submit")) {
      console.log(dataEntry);

    }
  };
};

const handleButtonChecker = (currentIndex1, role, dataAPI, dataAPI2) => {
  if (role !== ROLES.CHECKER) return;

  main__contain__right_dom.onclick = (e) => {
    if (e.target.closest("#btn_ck_entry1")) {
      currentIndex = checkConditionRenderImgAndValue(
        "ENTRY1",
        currentIndex,
        1,
        role,
        dataAPI,
        dataAPI2
      );
    }

    if (e.target.closest("#btn_ck_entry2")) {
      currentIndex = checkConditionRenderImgAndValue(
        "ENTRY2",
        currentIndex,
        1,
        role,
        dataAPI,
        dataAPI2
      );
    }

    if (e.target.closest("#btn_ck_both")) {
      currentIndex = checkConditionRenderImgAndValue(
        "BOTH",
        currentIndex,
        1,
        role,
        dataAPI,
        dataAPI2
      );
    }

    if (e.target.closest("#btn_ck_exit")) {
      console.log("btn_ck_exit");
    }

    if (e.target.closest("#btn_ck_previous")) {
      currentIndex = checkConditionRenderImgAndValue(
        "PREVIOUS",
        currentIndex,
        -1,
        role,
        dataAPI,
        dataAPI2
      );
    }
  };
};