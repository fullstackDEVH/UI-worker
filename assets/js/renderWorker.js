import { dataAPI3, dataAPI4 } from "../constant/dataApi.js";
import { main__contain__right_dom } from "./variablesDom.js";

export const renderUIChecker = (currentIndex) => {
  let inputs = "";
  let inputs2= "";
  for (var i = 0; i <= dataAPI3[currentIndex].numberInput - 1; i++) {
    inputs += '<input type="text" name="input_1_' + i + '" />';
  };

  for (var i = 0; i <= dataAPI4[currentIndex].numberInput - 1; i++) {
    inputs2 += '<input type="text" name="input_2_' + i + '" />';
  };

 
  main__contain__right_dom.innerHTML = `
    <div class="main__contain__right__item">
        <div class="main__contain__right__title">Entry 1 </div>
        <div class="main__contain__right__input entry_1">
            ${inputs}
        </div>
    </div>

    <div class="main__contain__right__btns">
        <div class="main__contain__right__btns__group column-3">
            <div class="main__contain__right__btns__btn" id="btn_ck_entry1">
                Entry1
            </div>
            <div class="main__contain__right__btns__btn" id="btn_ck_entry2">
                Entry2
            </div>
            <div class="main__contain__right__btns__btn" id="btn_ck_both" >
                Both
            </div>

            <div class="main__contain__right__btns__btn warning" id="btn_ck_exit" >
                Exit
            </div>
          
            <div class="main__contain__right__btns__btn" id="btn_ck_previous" >
                Previous
            </div>
            <div class="main__contain__right__btns__btn" id="btn_ck_submit">
                Submit
            </div>
        </div>
    </div>

    <div class="main__contain__right__item">
        <div class="main__contain__right__title">Entry 2</div>
        <div class="main__contain__right__input entry_2">
            ${inputs2}
        </div>
    </div>
    `;

    main__contain__right_dom
    .querySelectorAll(".main__contain__right__input.entry_1 > input")
    .forEach((input, ind) => {
      input.oninput = (e) => {
        dataAPI3[currentIndex].values[ind] = e.target.value;
      };
    });

    main__contain__right_dom
    .querySelectorAll(".main__contain__right__input.entry_2 > input")
    .forEach((input, ind) => {
      input.oninput = (e) => {
        dataAPI4[currentIndex].values[ind] = e.target.value;
      };
    });


};

export const renderUIEntry = (currentIndex) => {
  // lấy formatNumber dựa vào dataAPI và currentIndex

  let inputs = "";
  for (var i = 0; i <= dataAPI3[currentIndex].numberInput - 1; i++) {
    inputs += '<input type="text" name="input_' + i + '" />';
  };

  main__contain__right_dom.innerHTML = `
    <div class="main__contain__right__item">
        <div class="main__contain__right__title">Answer : </div>
        <div class="main__contain__right__input entry_1">
            
            ${inputs}
            
        </div>
    </div>

    <div class="main__contain__right__btns">
        <div class="main__contain__right__btns__group">
            <div class="main__contain__right__btns__btn" id="btn_pre">
                Previous
            </div>
            <div class="main__contain__right__btns__btn" id="btn_next">
                Next
            </div>
            <div class="main__contain__right__btns__btn warning" id="btn_exit" >
                Exit
            </div>
            <div class="main__contain__right__btns__btn" id="btn_submit">
                Submit
            </div>
        </div>
    </div>
    `;

  main__contain__right_dom
    .querySelectorAll(".main__contain__right__input > input")
    .forEach((input, ind) => {
      input.oninput = (e) => {
        dataAPI3[currentIndex].values[ind] = e.target.value;
      };
    });
};
