import { Link } from "react-router-dom";

const SideMenu = (props) => {
  const myInfoMenus = props.myInfoMenu || [];
  const setMyInfoMenus = props.setMyInfoMenu;
  const myShoppingMenus = props.myShoppingMenu || [];
  const setMyShoppingMenus = props.setMyShoppingMenu;

  const changeMyInfoMenu = (index) => {
    const copyMyInfoMenus = [...myInfoMenus];
    copyMyInfoMenus.forEach((item) => {
      item.active = false;
    });
    copyMyInfoMenus[index].active = true;
    setMyInfoMenus(copyMyInfoMenus);
  };

  const changeShoppingMenu = (index) => {
    const copyMyShoppingMenus = [...myShoppingMenus];
    copyMyShoppingMenus.forEach((item) => {
      item.active = false;
    });
    copyMyShoppingMenus[index].active = true;
    setMyShoppingMenus(copyMyShoppingMenus);
  };

  return (
    <div className="sideMenu">
      <ul>
        {myInfoMenus.map((myInfoMenu, index) => {
          return (
            <li key={"myInfoMenu" + index}>
              <Link
                to={myInfoMenu.url}
                className={myInfoMenu.active ? "active-side" : ""}
                onClick={() => {
                  changeMyInfoMenu(index);
                }}
              >
                {myInfoMenu.text}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul>
        {myShoppingMenus.map((myShoppingMenu, index) => {
          return (
            <li key={"myShoppingMenu" + index}>
              <Link
                to={myShoppingMenu.url}
                className={myShoppingMenu.active ? "active-side" : ""}
                onClick={() => {
                  changeShoppingMenu(index);
                }}
              >
                {myShoppingMenu.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideMenu;
