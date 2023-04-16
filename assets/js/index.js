import { dataAPI, dataAPI2 } from "../constant/dataApi.js";
import { ROLES } from "../constant/type.js";
import { switchCaseShortCut } from "./helper/checkKeyCode.js";
import { addClassList, toggleClassList } from "./helper/classList.js";
import { countdown } from "./helper/countDown.js";
import {
  getCustomSettingLocalStorage,
  checkLocalStorageIsAvailable,
} from "./helper/localStorage.js";
// import { handleButtonChecker, handleButtonEntry } from "./renderButtonWorker.js";

import { renderHeader } from "./renderHeader.js";
import { renderModalAnswer } from "./renderModal.js";
import {
  checkConditionRenderImgAndValue,
  renderImgAndValue,
} from "./renderValueAndImg.js";
import { renderUIChecker, renderUIEntry } from "./renderWorker.js";
import { renderShortcut } from "./shortcut.js";
import {
  header_dom,
  modal_container_dom,
  btn_close_modal_dom,
  main__contain__right_dom,
} from "./variablesDom.js";


let currentIndex = 0;
window.addEventListener("DOMContentLoaded", (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('role'); 
  let role = page ?? ROLES.ENTRY;

  let isShowModal = false;
  let shortcutLocalStorage = [];

  shortcutLocalStorage = checkLocalStorageIsAvailable(
    ROLES[role] === "ENTRY" ? "user-shortcuts" : "checker-shortcuts"
  );
  renderHeader();
  ROLES[role] === "ENTRY" ? renderUIEntry() : renderUIChecker();

  renderImgAndValue(currentIndex, role, dataAPI, dataAPI2);
  renderShortcut(shortcutLocalStorage, role);
  countdown(25, 59, header_dom.querySelector(".header__item.times"));
  handleButtonEntry(1, role, dataAPI)

  ROLES[role] === "ENTRY" ? handleButtonEntry(currentIndex, role, dataAPI) : handleButtonChecker(currentIndex, role, dataAPI, dataAPI2);

  main__contain__right_dom.querySelector(
    ".main__contain__right__input > input"
  ).oninput = (e) => {
    dataAPI[currentIndex].value = e.target.value;
  };

  header_dom.querySelector(".header__item:last-child").onclick = () => {
    toggleClassList(modal_container_dom, "show");
    isShowModal = true;
  };

  btn_close_modal_dom.onclick = () => {
    toggleClassList(modal_container_dom, "show");
    isShowModal = false;

    shortcutLocalStorage = getCustomSettingLocalStorage(ROLES[role] === "ENTRY" ? "user-shortcuts" : "checker-shortcuts");
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
        currentIndex = switchCaseShortCut(shortcut.name, currentIndex, role, dataAPI, dataAPI2) ?? currentIndex;
      } else if (
        isAlt &&
        shortcut.key.code[0] === 18 &&
        shortcut.key.code[1] === keyEvent
      ) {
        currentIndex = switchCaseShortCut(shortcut.name, currentIndex, role, dataAPI, dataAPI2) ?? currentIndex;
      }
    });
  });
});

export const handleButtonEntry = (currentIndex1, role, dataAPI) => {
  if(role !== ROLES.ENTRY) return;
  main__contain__right_dom.querySelector("#btn_next").onclick = () => {
    currentIndex = checkConditionRenderImgAndValue(
      "NEXT",
      currentIndex,
      1,
      role,
      dataAPI
    );
  };

  main__contain__right_dom.querySelector("#btn_pre").onclick = () => {
    currentIndex = checkConditionRenderImgAndValue(
      "PREVIOUS",
      currentIndex,
      -1,
      role,
      dataAPI
    );
  };

  main__contain__right_dom.querySelector("#btn_submit").onclick = () => {
    console.log("submit : ", dataAPI);
  };

  main__contain__right_dom.querySelector("#btn_exit").onclick = () => {
    renderModalAnswer();
  };
}

export const handleButtonChecker = (currentIndex1, role, dataAPI, dataAPI2) => {
  if(role !== ROLES.CHECKER) return;

  main__contain__right_dom.querySelector("#btn_ck_entry1").onclick = () => {
    currentIndex = checkConditionRenderImgAndValue(
      "NEXT",
      currentIndex,
      1,
      role,
      dataAPI,
      dataAPI2
    );
  };

  main__contain__right_dom.querySelector("#btn_ck_entry2").onclick = () => {
    currentIndex = checkConditionRenderImgAndValue(
      "NEXT",
      currentIndex,
      1,
      role,
      dataAPI,
      dataAPI2
    );
  };

  main__contain__right_dom.querySelector("#btn_ck_both").onclick = () => {
    currentIndex = checkConditionRenderImgAndValue(
        "NEXT",
        currentIndex,
        1,
        role,
        dataAPI,
        dataAPI2
      );
  };

  main__contain__right_dom.querySelector("#btn_ck_exit").onclick = () => {
    console.log("btn_ck_exit");
  };

  main__contain__right_dom.querySelector("#btn_ck_previous").onclick = () => {
    currentIndex = checkConditionRenderImgAndValue(
        "PREVIOUS",
        currentIndex,
        -1,
        role,
        dataAPI,
        dataAPI2
      );
  };

  main__contain__right_dom.querySelector("#btn_ck_submit").onclick = () => {
    renderModalAnswer();
  };

};

/*
- lưu shortcut vào localStorage . x
- lây shortcut từ localStorage. x
- modal, popup. x
- add error message for shortcut . x
- shortcut zoom, có lẽ sử dụng modal để hiển thị hình ảnh to hơn. x

- custom modal btn có thể tuỳ chỉnh 1 hoặc 2 nút và thay đổi dữ liệu trong modal. x
- check input empty
- chia ra component render button theo role. x
- khi là màn hình checker mặc đinh chỉ readOnly, khi cần sửa thì nhấn nút edit
- sử lý sự kiện cuối cùng


* priority
- tạo màn 2 hình cho checker có 1 img và 2 result của 2 ET. và custom btn controll . x
- tạo localStorage riêng cho checkker.  x
- sử dụng shortcut cho checker. x
- tạo components button ở file riêng , cần trả về handleButtonEntry current index chính xác
- handle logic xử lý data checker choose. x
 */
