import { main__contain__right_dom } from "./variablesDom.js";

export const renderUIChecker = () => {
    // passing parameter to custom
  main__contain__right_dom.innerHTML = `
    <div class="main__contain__right__item">
        <div class="main__contain__right__title">Entry 1 </div>
        <div class="main__contain__right__input">
            <input type="text" placeholder="Enter Your Answer" />
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
        <div class="main__contain__right__input">
            <input type="text" placeholder="Enter Your Answer" />
        </div>
    </div>
    `;
};

export const renderUIEntry = () => {
  main__contain__right_dom.innerHTML = `
    <div class="main__contain__right__item">
        <div class="main__contain__right__title">Answer : </div>
        <div class="main__contain__right__input">
            <input type="text" placeholder="Enter Your Answer" />
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
};
