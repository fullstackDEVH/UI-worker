import { ROLES } from "../constant/type.js";
import { isAlphaNumericKey } from "./helper/checkKeyCode.js";
import { removeClassList } from "./helper/classList.js";
import { addClassList, removeAllClassList } from "./helper/classList.js";
import { handleKeyDown } from "./helper/event.js";
import { handleKeyUp } from "./helper/event.js";
import { setCustomSettingLocalStorage } from "./helper/localStorage.js";

import { parent_modal_dom } from "./variablesDom.js";

let ctrlKeyPressed = false;
let altKeyPressed = false;

const shortcutItem = (shortcut_name, shortcut_items_name = "") => {
  // Tạo phần tử div chứa tất cả các phần tử
  const modalShortcutItem = document.createElement("div");
  modalShortcutItem.classList.add("modal__shortcut__item");

  // Tạo phần tử div cho tên phím tắt
  const modalShortcutItemName = document.createElement("div");
  modalShortcutItemName.classList.add("modal__shortcut__item__name");
  modalShortcutItemName.textContent = shortcut_name;
  modalShortcutItem.appendChild(modalShortcutItemName);

  // Tạo phần tử div cho khung phím tắt
  const modalShortcutItemKey = document.createElement("div");
  modalShortcutItemKey.classList.add("modal__shortcut__item__key");
  modalShortcutItem.appendChild(modalShortcutItemKey);

  // Tạo phần tử input cho khung phím tắt
  const modalShortcutItemInput = document.createElement("input");
  modalShortcutItemInput.setAttribute("type", "text");
  modalShortcutItemInput.setAttribute("placeholder", "Type a shortcut.");
  modalShortcutItemInput.value =
    shortcut_items_name.length > 1
      ? `${shortcut_items_name[0]} + ${shortcut_items_name[1]}`
      : "";
  modalShortcutItemKey.appendChild(modalShortcutItemInput);

  // Tạo phần tử div cho nút xóa
  const modalShortcutItemKeyDel = document.createElement("div");
  modalShortcutItemKeyDel.classList.add("modal__shortcut__item__key__del");
  modalShortcutItemKey.appendChild(modalShortcutItemKeyDel);

  // Tạo phần tử i cho biểu tượng xóa
  const modalShortcutItemKeyDelI = document.createElement("i");
  modalShortcutItemKeyDelI.classList.add("fa-solid", "fa-xmark");
  modalShortcutItemKeyDel.appendChild(modalShortcutItemKeyDelI);

  // Tạo phần tử div cho thông báo lỗi
  const modalShortcutItemError = document.createElement("div");
  modalShortcutItemError.classList.add("modal__shortcut__item__error");
  modalShortcutItemError.textContent = "Include either Ctrl or Alt!";
  modalShortcutItemKey.appendChild(modalShortcutItemError);

  // Thêm phần tử cha vào phần tử HTML
  const modal = document.querySelector(".modal__shortcut");
  modal.appendChild(modalShortcutItem);
};

const handleClickItem = (e, item, index, shortcutLocalStorage, role) => {
  const list_input_keycode = parent_modal_dom.querySelectorAll(
    ".modal__shortcut__item__key > input"
  );

  const list_shortcut_item = parent_modal_dom.querySelectorAll(
    ".modal__shortcut__item__key"
  );

  const list_shortcut_item_error = parent_modal_dom.querySelectorAll(
    ".modal__shortcut__item__error"
  );

  const list_shortcut_item_input = parent_modal_dom.querySelectorAll(
    ".modal__shortcut__item__key > input"
  );

  const is_input_keycode = e.target.closest(
    ".modal__shortcut__item__key > input"
  );
  const btn_close_shortcut = e.target.closest(
    ".modal__shortcut__item__key__del"
  );

  if (is_input_keycode) {
    removeAllClassList(list_shortcut_item, "active");
    removeAllClassList(list_shortcut_item, "error");

    addClassList(item, "active");

    is_input_keycode.onkeyup = (e) => {
      // const keyUp = handleKeyUp(e);

      // ctrlKeyPressed = keyUp.ctrlKeyPressed;
      // altKeyPressed = keyUp.altKeyPressed;

      if (
        shortcutLocalStorage[index].key.name.length < 2 &&
        shortcutLocalStorage[index].key.code.length < 2
      ) {
        shortcutLocalStorage[index].key.name = [];
        shortcutLocalStorage[index].key.code = [];
        list_input_keycode[index].value = "";

        // addClassList(list_shortcut_item[index], "error");
        // list_shortcut_item_error[index].textContent =
        //   "Include either Ctrl or Alt";
      }
    };

    is_input_keycode.onkeydown = (e) => {
      const keyDown = handleKeyDown(e);

      if (shortcutLocalStorage[index].key.name.length >= 2) {
        list_input_keycode[index].blur();
        removeClassList(list_shortcut_item[index], "active");
        return;
      }

      if (e.ctrlKey) {
        // ctrlKeyPressed = keyDown.ctrlKeyPressed; // fix error

        shortcutLocalStorage[index].key.name[0] = "Ctrl";
        shortcutLocalStorage[index].key.code[0] = 17;

        if (shortcutLocalStorage[index].key.name.length === 1) {
          addClassList(list_shortcut_item[index], "error");
          list_shortcut_item_error[index].textContent =
            "must be more than one letter";
        }

        list_input_keycode[index].value = shortcutLocalStorage[index].key
          .name[1]
          ? `Ctrl + ${shortcutLocalStorage[index].key.name[1]}`
          : "Ctrl + ";
      } else if (e.altKey) {
        // altKeyPressed = keyDown.altKeyPressed; // fix error
        shortcutLocalStorage[index].key.name[0] = "Alt";
        shortcutLocalStorage[index].key.code[0] = 18;

        if (shortcutLocalStorage[index].key.name.length === 1) {
          addClassList(list_shortcut_item[index], "error");
          list_shortcut_item_error[index].textContent =
            "must be more than one letter";
        }

        list_input_keycode[index].value = shortcutLocalStorage[index].key
          .name[1]
          ? `Alt + ${shortcutLocalStorage[index].key.name[1]}`
          : "Alt + ";
      } else {
        // list_input_keycode[index].blur();
        addClassList(list_shortcut_item[index], "error");
        list_shortcut_item_error[index].textContent =
          "Include either Ctrl or Alt";
      }

      if (e.ctrlKey || e.altKey) {
        e.preventDefault();

        if (isAlphaNumericKey(e)) {
          const isControll = e.getModifierState("Control");
          const isAlt = e.getModifierState("Alt");

          if (shortcutLocalStorage[index].key.name.length < 2) {
            let check = shortcutLocalStorage.filter((shortcut) => {
              if (isControll) {
                return (
                  shortcut.key.code[1] === e.keyCode &&
                  shortcut.key.code[0] === 17
                );
              } else if (isAlt) {
                return (
                  shortcut.key.code[1] === e.keyCode &&
                  shortcut.key.code[0] === 18
                );
              }
            });

            if (
              e.ctrlKey &&
              check?.some((element) => element?.key?.code[0] === 17)
            ) {
              list_input_keycode[index].value = "";

              addClassList(list_shortcut_item[index], "error");
              list_shortcut_item_error[index].textContent = "Shortcut is exist";

              return;
            }
            if (
              e.altKey &&
              check?.some((element) => element?.key?.code[0] === 18)
            ) {
              list_input_keycode[index].value = "";

              addClassList(list_shortcut_item[index], "error");
              list_shortcut_item_error[index].textContent = "Shortcut is exist";

              return;
            }

            shortcutLocalStorage[index].key.name.push(e.key.toUpperCase());
            shortcutLocalStorage[index].key.code.push(e.keyCode);

            list_input_keycode[
              index
            ].value = `${shortcutLocalStorage[index].key.name[0]} + ${shortcutLocalStorage[index].key.name[1]}`;

            list_shortcut_item[index].classList.remove("error");
            list_shortcut_item_error[index].textContent = "";

            setCustomSettingLocalStorage(
              ROLES.ENTRY === role ? "user-shortcuts" : "checker-shortcuts",
              shortcutLocalStorage
            );

            removeClassList(list_shortcut_item[index], "active");
            list_input_keycode[index].blur();
          } else {
            list_input_keycode[index].blur();
            removeClassList(list_shortcut_item[index], "active");
            removeClassList(list_shortcut_item[index], "error");
            list_shortcut_item_error[index].textContent = "";
          }
        }
      }
    };
  } else if (btn_close_shortcut) {
    list_input_keycode[index].value = "";
    shortcutLocalStorage[index].key.name = [];
    shortcutLocalStorage[index].key.code = [];
    list_input_keycode[index].blur();

    removeClassList(list_shortcut_item[index], "active");
    setCustomSettingLocalStorage(
      ROLES.ENTRY === role ? "user-shortcuts" : "checker-shortcuts",
      shortcutLocalStorage
    );
  }
};

export const renderShortcut = (shortcutLocalStorage, role) => {
  console.log(shortcutLocalStorage);
  shortcutLocalStorage.forEach((shortcut) =>
    shortcutItem(shortcut.name, shortcut.key.name)
  );

  const listItem = parent_modal_dom.querySelectorAll(
    ".modal__shortcut__item__key"
  );

  parent_modal_dom.onclick = (e) => {
    e.stopPropagation();
    if (!e.target.closest(".modal__shortcut__item__key ")) {
      removeAllClassList(listItem, "active");
    }
  };

  listItem.forEach((item, index) => {
    item.onclick = (e) => {
      handleClickItem(e, item, index, shortcutLocalStorage, role);
    };
  });
};
