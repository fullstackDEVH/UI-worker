import { dataAPI, dataChecker } from "../constant/dataApi.js";
import { BTNS } from "../constant/type.js";
import { addClassList, removeClassList } from "./helper/classList.js";
import {
  img_input_dom,
  modal__custom__container_dom,
  modal__custom__over__lay_dom,
  modal__custom_dom,
} from "./variablesDom.js";

const switchContentBtn = (name) => {
  switch (name) {
    case BTNS.SUBMIT:
      return `<div class="modal__custom__container__btns_btn" data-btn-name="submit">Submit</div>   `;
    case BTNS.CANCEL:
      return `<div class="modal__custom__container__btns_btn warning" data-btn-name="cancel">Cancel</div>`;
    case BTNS.EXIT:
      return `<div class="modal__custom__container__btns_btn warning" data-btn-name="exit">Exit</div>`;
    case BTNS.SAVE:
      return ``;

    default:
      return BTNS.CANCEL;
  }
};

export const renderModalAnswer = (
  message = "Do you want submit",
  btnTypeOne = BTNS.CANCEL,
  btnTypeTwo = BTNS.SUBMIT
) => {
  addClassList(modal__custom_dom, "show");

  modal__custom__container_dom.innerHTML = `
        <div class="modal__custom__container__global">
            <div class="modal__custom__container__icon">
                <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="modal__custom__container__desc">${message}</div>
            <div class="modal__custom__container__btns">
                ${switchContentBtn(btnTypeOne)}
                ${switchContentBtn(btnTypeTwo)}
            </div>
        </div>
    `;

  handleClickCancelModalCustom();
  handleClickModalOverlay();
};

export const renderModalZoomImg = (currentIndex) => {
  handleClickModalOverlay();
  addClassList(modal__custom_dom, "show");

  if (modal__custom_dom.querySelector(".modal__custom__container__img")) {
    removeClassList(modal__custom_dom, "show");
    modal__custom__container_dom.innerHTML = "";
    return;
  }

  modal__custom__container_dom.innerHTML = `
        <div class="modal__custom__container__img">
            <img src="${img_input_dom.src ?? ""}" alt="zoom img"/>
        </div>
    `;
};

export const handleClickModalOverlay = () => {
  modal__custom__over__lay_dom.onclick = () => {
    removeClassList(modal__custom_dom, "show");
  };
};

export const handleClickCancelModalCustom = () => {
  modal__custom__container_dom
    .querySelectorAll(".modal__custom__container__btns_btn")
    .forEach((item) => {
      item.onclick = () => {
        switch (item.getAttribute("data-btn-name")) {
          case "exit":
            window.close();
            return;

          case "cancel":
            removeClassList(modal__custom_dom, "show");
            return;

          case "submit":
            console.log(dataChecker);
            return;

          default:
            alert("custom in renderModal.js");
            return;
        }
      };
    });
};
