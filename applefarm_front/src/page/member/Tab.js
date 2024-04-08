import { useState } from "react";
const Tab = (props) => {
  const { currentTab, tabMenu, setTabMenu, setCurrentTab } = props;

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <>
      <div className="history-menu-wrap">
        <ul>
          {tabMenu.map((item, index) => (
            <li
              key={"tab" + index}
              className={
                index === currentTab
                  ? "history-menu history-menu-focus"
                  : "history-menu"
              }
              onClick={() => selectMenuHandler(index)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div>{tabMenu[currentTab].content}</div>
      </div>
    </>
  );
};
export default Tab;
