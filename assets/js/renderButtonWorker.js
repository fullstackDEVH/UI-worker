import { renderModalAnswer } from "./renderModal.js";
import { checkConditionRenderImgAndValue } from "./renderValueAndImg.js";
import { main__contain__right_dom } from "./variablesDom.js";

export const handleButtonChecker = (currentIndex, role, dataAPI, dataAPI2) => {
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
  return currentIndex;

};

export const handleButtonEntry = (currentIndex, role, dataAPI) => {
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

};
