/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconMap } from "./IconMap";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../redux/authSlice";
const Sidebar = ({ openSidebar }) => {
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});
  const toggleDropdown = (title) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  const IconComponent = ({ iconName }) => {
    const Icon = IconMap[iconName];
    return Icon ? Icon : null;
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  const menus = user?.role?.main_menu;
  const renderMenu = (menuItems) => {
    return (
      <ul>
        {menuItems?.map((menu, index) => {
          // Check if the current path matches the menu's path or any submenus' path
          const isActive =
            location.pathname === menu.pathname ||
            (menu.subMenu &&
              menu.subMenu.some((sub) => location.pathname === sub.pathname));
          const isDropdownOpen = openDropdowns[menu.title] || isActive;

          return (
            <li
              key={index}
              onClick={() => {
                menu?.pathname && navigate(menu?.pathname);
              }}
            >
              <div
                className={`p-4 hover:bg-eiraParagraph cursor-pointer flex justify-between ${
                  isActive && "bg-eiraParagraph"
                }`}
                onClick={() =>
                  menu.subMenu.length > 0 && toggleDropdown(menu.title)
                }
              >
                <div
                  className={`flex items-center truncate ${
                    openSidebar ? "w-52" : "w-20"
                  }`}
                >
                  {menu.icon && (
                    <span className="mr-2 text-2xl">
                      <IconComponent iconName={menu?.icon} />
                    </span>
                  )}
                  {openSidebar ? menu.title : ""}
                </div>
                {menu.subMenu.length > 0 && (
                  <span>{isDropdownOpen ? "▲" : "▼"}</span>
                )}
              </div>

              {/* Render submenu if the dropdown is open */}
              {menu.subMenu.length > 0 && isDropdownOpen && (
                <div className="bg-eiraParagraph/25 pl-1">
                  {renderMenu(menu.subMenu)}{" "}
                  {/* Recursive call for nested submenus */}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    // Automatically open the dropdown if the URL is under a parent menu
    const checkMenuMatch = (menu, pathname) => {
      if (menu.pathname === pathname) {
        return true;
      }
      return menu.subMenu.some((sub) => checkMenuMatch(sub, pathname));
    };
    menus?.forEach((menu) => {
      if (menu.subMenu.length > 0) {
        const isActive =
          location.pathname === menu.pathname ||
          menu.subMenu.some((menu) => checkMenuMatch(menu, location.pathname));

        if (isActive) {
          setOpenDropdowns((prev) => ({ ...prev, [menu.title]: true }));
        }
      }
    });
  }, [location, menus]);

  return (
    <div
      className={`h-full bg-eiraButton text-eiraButtonText ${
        openSidebar ? "w-64" : "w-24"
      }`}
    >
      {renderMenu(menus)}
    </div>
  );
};

export default Sidebar;
