import { dataAPI, headerAPI } from "../constant/dataApi.js";
import { header_dom } from "./variablesDom.js";

export const renderHeader = () => {
  const header = `    
            ${headerAPI
              .map(
                (item) => {
                  if(item.id === 3) {
                    return  `<div class="header__item ${item.class}">${item.name} : ${item.value}/${dataAPI.length}</div>`
                  }
                  return  `<div class="header__item ${item.class}">${item.name} : ${item.value}</div>`
                }
              )
              .join("")}
            <div class="header__item pointer">
                <img src="./assets/images/SettingOutlined.png" alt="setting icon" />
            </div>
        `;

  header_dom.innerHTML = header;
};
