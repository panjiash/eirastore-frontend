/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import * as FiIcon from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const iconMap = {
  // THIS FILE IS AUTO GENERATED
  FiActivity: <FiIcon.FiActivity />,
  FiAirplay: <FiIcon.FiAirplay />,
  FiAlertCircle: <FiIcon.FiAlertCircle />,
  FiAlertOctagon: <FiIcon.FiAlertOctagon />,
  FiAlertTriangle: <FiIcon.FiAlertTriangle />,
  FiAlignCenter: <FiIcon.FiAlignCenter />,
  FiAlignJustify: <FiIcon.FiAlignJustify />,
  FiAlignLeft: <FiIcon.FiAlignLeft />,
  FiAlignRight: <FiIcon.FiAlignRight />,
  FiAnchor: <FiIcon.FiAnchor />,
  FiAperture: <FiIcon.FiAperture />,
  FiArchive: <FiIcon.FiArchive />,
  FiArrowDownCircle: <FiIcon.FiArrowDownCircle />,
  FiArrowDownLeft: <FiIcon.FiArrowDownLeft />,
  FiArrowDownRight: <FiIcon.FiArrowDownRight />,
  FiArrowDown: <FiIcon.FiArrowDown />,
  FiArrowLeftCircle: <FiIcon.FiArrowLeftCircle />,
  FiArrowLeft: <FiIcon.FiArrowLeft />,
  FiArrowRightCircle: <FiIcon.FiArrowRightCircle />,
  FiArrowRight: <FiIcon.FiArrowRight />,
  FiArrowUpCircle: <FiIcon.FiArrowUpCircle />,
  FiArrowUpLeft: <FiIcon.FiArrowUpLeft />,
  FiArrowUpRight: <FiIcon.FiArrowUpRight />,
  FiArrowUp: <FiIcon.FiArrowUp />,
  FiAtSign: <FiIcon.FiAtSign />,
  FiAward: <FiIcon.FiAward />,
  FiBarChart2: <FiIcon.FiBarChart2 />,
  FiBarChart: <FiIcon.FiBarChart />,
  FiBatteryCharging: <FiIcon.FiBatteryCharging />,
  FiBattery: <FiIcon.FiBattery />,
  FiBellOff: <FiIcon.FiBellOff />,
  FiBell: <FiIcon.FiBell />,
  FiBluetooth: <FiIcon.FiBluetooth />,
  FiBold: <FiIcon.FiBold />,
  FiBookOpen: <FiIcon.FiBookOpen />,
  FiBook: <FiIcon.FiBook />,
  FiBookmark: <FiIcon.FiBookmark />,
  FiBox: <FiIcon.FiBox />,
  FiBriefcase: <FiIcon.FiBriefcase />,
  FiCalendar: <FiIcon.FiCalendar />,
  FiCameraOff: <FiIcon.FiCameraOff />,
  FiCamera: <FiIcon.FiCamera />,
  FiCast: <FiIcon.FiCast />,
  FiCheckCircle: <FiIcon.FiCheckCircle />,
  FiCheckSquare: <FiIcon.FiCheckSquare />,
  FiCheck: <FiIcon.FiCheck />,
  FiChevronDown: <FiIcon.FiChevronDown />,
  FiChevronLeft: <FiIcon.FiChevronLeft />,
  FiChevronRight: <FiIcon.FiChevronRight />,
  FiChevronUp: <FiIcon.FiChevronUp />,
  FiChevronsDown: <FiIcon.FiChevronsDown />,
  FiChevronsLeft: <FiIcon.FiChevronsLeft />,
  FiChevronsRight: <FiIcon.FiChevronsRight />,
  FiChevronsUp: <FiIcon.FiChevronsUp />,
  FiChrome: <FiIcon.FiChrome />,
  FiCircle: <FiIcon.FiCircle />,
  FiClipboard: <FiIcon.FiClipboard />,
  FiClock: <FiIcon.FiClock />,
  FiCloudDrizzle: <FiIcon.FiCloudDrizzle />,
  FiCloudLightning: <FiIcon.FiCloudLightning />,
  FiCloudOff: <FiIcon.FiCloudOff />,
  FiCloudRain: <FiIcon.FiCloudRain />,
  FiCloudSnow: <FiIcon.FiCloudSnow />,
  FiCloud: <FiIcon.FiCloud />,
  FiCode: <FiIcon.FiCode />,
  FiCodepen: <FiIcon.FiCodepen />,
  FiCodesandbox: <FiIcon.FiCodesandbox />,
  FiCoffee: <FiIcon.FiCoffee />,
  FiColumns: <FiIcon.FiColumns />,
  FiCommand: <FiIcon.FiCommand />,
  FiCompass: <FiIcon.FiCompass />,
  FiCopy: <FiIcon.FiCopy />,
  FiCornerDownLeft: <FiIcon.FiCornerDownLeft />,
  FiCornerDownRight: <FiIcon.FiCornerDownRight />,
  FiCornerLeftDown: <FiIcon.FiCornerLeftDown />,
  FiCornerLeftUp: <FiIcon.FiCornerLeftUp />,
  FiCornerRightDown: <FiIcon.FiCornerRightDown />,
  FiCornerRightUp: <FiIcon.FiCornerRightUp />,
  FiCornerUpLeft: <FiIcon.FiCornerUpLeft />,
  FiCornerUpRight: <FiIcon.FiCornerUpRight />,
  FiCpu: <FiIcon.FiCpu />,
  FiCreditCard: <FiIcon.FiCreditCard />,
  FiCrop: <FiIcon.FiCrop />,
  FiCrosshair: <FiIcon.FiCrosshair />,
  FiDatabase: <FiIcon.FiDatabase />,
  FiDelete: <FiIcon.FiDelete />,
  FiDisc: <FiIcon.FiDisc />,
  FiDivideCircle: <FiIcon.FiDivideCircle />,
  FiDivideSquare: <FiIcon.FiDivideSquare />,
  FiDivide: <FiIcon.FiDivide />,
  FiDollarSign: <FiIcon.FiDollarSign />,
  FiDownloadCloud: <FiIcon.FiDownloadCloud />,
  FiDownload: <FiIcon.FiDownload />,
  FiDribbble: <FiIcon.FiDribbble />,
  FiDroplet: <FiIcon.FiDroplet />,
  FiEdit2: <FiIcon.FiEdit2 />,
  FiEdit3: <FiIcon.FiEdit3 />,
  FiEdit: <FiIcon.FiEdit />,
  FiExternalLink: <FiIcon.FiExternalLink />,
  FiEyeOff: <FiIcon.FiEyeOff />,
  FiEye: <FiIcon.FiEye />,
  FiFacebook: <FiIcon.FiFacebook />,
  FiFastForward: <FiIcon.FiFastForward />,
  FiFeather: <FiIcon.FiFeather />,
  FiFigma: <FiIcon.FiFigma />,
  FiFileMinus: <FiIcon.FiFileMinus />,
  FiFilePlus: <FiIcon.FiFilePlus />,
  FiFileText: <FiIcon.FiFileText />,
  FiFile: <FiIcon.FiFile />,
  FiFilm: <FiIcon.FiFilm />,
  FiFilter: <FiIcon.FiFilter />,
  FiFlag: <FiIcon.FiFlag />,
  FiFolderMinus: <FiIcon.FiFolderMinus />,
  FiFolderPlus: <FiIcon.FiFolderPlus />,
  FiFolder: <FiIcon.FiFolder />,
  FiFramer: <FiIcon.FiFramer />,
  FiFrown: <FiIcon.FiFrown />,
  FiGift: <FiIcon.FiGift />,
  FiGitBranch: <FiIcon.FiGitBranch />,
  FiGitCommit: <FiIcon.FiGitCommit />,
  FiGitMerge: <FiIcon.FiGitMerge />,
  FiGitPullRequest: <FiIcon.FiGitPullRequest />,
  FiGithub: <FiIcon.FiGithub />,
  FiGitlab: <FiIcon.FiGitlab />,
  FiGlobe: <FiIcon.FiGlobe />,
  FiGrid: <FiIcon.FiGrid />,
  FiHardDrive: <FiIcon.FiHardDrive />,
  FiHash: <FiIcon.FiHash />,
  FiHeadphones: <FiIcon.FiHeadphones />,
  FiHeart: <FiIcon.FiHeart />,
  FiHelpCircle: <FiIcon.FiHelpCircle />,
  FiHexagon: <FiIcon.FiHexagon />,
  FiHome: <FiIcon.FiHome />,
  FiImage: <FiIcon.FiImage />,
  FiInbox: <FiIcon.FiInbox />,
  FiInfo: <FiIcon.FiInfo />,
  FiInstagram: <FiIcon.FiInstagram />,
  FiItalic: <FiIcon.FiItalic />,
  FiKey: <FiIcon.FiKey />,
  FiLayers: <FiIcon.FiLayers />,
  FiLayout: <FiIcon.FiLayout />,
  FiLifeBuoy: <FiIcon.FiLifeBuoy />,
  FiLink2: <FiIcon.FiLink2 />,
  FiLink: <FiIcon.FiLink />,
  FiLinkedin: <FiIcon.FiLinkedin />,
  FiList: <FiIcon.FiList />,
  FiLoader: <FiIcon.FiLoader />,
  FiLock: <FiIcon.FiLock />,
  FiLogIn: <FiIcon.FiLogIn />,
  FiLogOut: <FiIcon.FiLogOut />,
  FiMail: <FiIcon.FiMail />,
  FiMapPin: <FiIcon.FiMapPin />,
  FiMap: <FiIcon.FiMap />,
  FiMaximize2: <FiIcon.FiMaximize2 />,
  FiMaximize: <FiIcon.FiMaximize />,
  FiMeh: <FiIcon.FiMeh />,
  FiMenu: <FiIcon.FiMenu />,
  FiMessageCircle: <FiIcon.FiMessageCircle />,
  FiMessageSquare: <FiIcon.FiMessageSquare />,
  FiMicOff: <FiIcon.FiMicOff />,
  FiMic: <FiIcon.FiMic />,
  FiMinimize2: <FiIcon.FiMinimize2 />,
  FiMinimize: <FiIcon.FiMinimize />,
  FiMinusCircle: <FiIcon.FiMinusCircle />,
  FiMinusSquare: <FiIcon.FiMinusSquare />,
  FiMinus: <FiIcon.FiMinus />,
  FiMonitor: <FiIcon.FiMonitor />,
  FiMoon: <FiIcon.FiMoon />,
  FiMoreHorizontal: <FiIcon.FiMoreHorizontal />,
  FiMoreVertical: <FiIcon.FiMoreVertical />,
  FiMousePointer: <FiIcon.FiMousePointer />,
  FiMove: <FiIcon.FiMove />,
  FiMusic: <FiIcon.FiMusic />,
  FiNavigation2: <FiIcon.FiNavigation2 />,
  FiNavigation: <FiIcon.FiNavigation />,
  FiOctagon: <FiIcon.FiOctagon />,
  FiPackage: <FiIcon.FiPackage />,
  FiPaperclip: <FiIcon.FiPaperclip />,
  FiPauseCircle: <FiIcon.FiPauseCircle />,
  FiPause: <FiIcon.FiPause />,
  FiPenTool: <FiIcon.FiPenTool />,
  FiPercent: <FiIcon.FiPercent />,
  FiPhoneCall: <FiIcon.FiPhoneCall />,
  FiPhoneForwarded: <FiIcon.FiPhoneForwarded />,
  FiPhoneIncoming: <FiIcon.FiPhoneIncoming />,
  FiPhoneMissed: <FiIcon.FiPhoneMissed />,
  FiPhoneOff: <FiIcon.FiPhoneOff />,
  FiPhoneOutgoing: <FiIcon.FiPhoneOutgoing />,
  FiPhone: <FiIcon.FiPhone />,
  FiPieChart: <FiIcon.FiPieChart />,
  FiPlayCircle: <FiIcon.FiPlayCircle />,
  FiPlay: <FiIcon.FiPlay />,
  FiPlusCircle: <FiIcon.FiPlusCircle />,
  FiPlusSquare: <FiIcon.FiPlusSquare />,
  FiPlus: <FiIcon.FiPlus />,
  FiPocket: <FiIcon.FiPocket />,
  FiPower: <FiIcon.FiPower />,
  FiPrinter: <FiIcon.FiPrinter />,
  FiRadio: <FiIcon.FiRadio />,
  FiRefreshCcw: <FiIcon.FiRefreshCcw />,
  FiRefreshCw: <FiIcon.FiRefreshCw />,
  FiRepeat: <FiIcon.FiRepeat />,
  FiRewind: <FiIcon.FiRewind />,
  FiRotateCcw: <FiIcon.FiRotateCcw />,
  FiRotateCw: <FiIcon.FiRotateCw />,
  FiRss: <FiIcon.FiRss />,
  FiSave: <FiIcon.FiSave />,
  FiScissors: <FiIcon.FiScissors />,
  FiSearch: <FiIcon.FiSearch />,
  FiSend: <FiIcon.FiSend />,
  FiServer: <FiIcon.FiServer />,
  FiSettings: <FiIcon.FiSettings />,
  FiShare2: <FiIcon.FiShare2 />,
  FiShare: <FiIcon.FiShare />,
  FiShieldOff: <FiIcon.FiShieldOff />,
  FiShield: <FiIcon.FiShield />,
  FiShoppingBag: <FiIcon.FiShoppingBag />,
  FiShoppingCart: <FiIcon.FiShoppingCart />,
  FiShuffle: <FiIcon.FiShuffle />,
  FiSidebar: <FiIcon.FiSidebar />,
  FiSkipBack: <FiIcon.FiSkipBack />,
  FiSkipForward: <FiIcon.FiSkipForward />,
  FiSlack: <FiIcon.FiSlack />,
  FiSlash: <FiIcon.FiSlash />,
  FiSliders: <FiIcon.FiSliders />,
  FiSmartphone: <FiIcon.FiSmartphone />,
  FiSmile: <FiIcon.FiSmile />,
  FiSpeaker: <FiIcon.FiSpeaker />,
  FiSquare: <FiIcon.FiSquare />,
  FiStar: <FiIcon.FiStar />,
  FiStopCircle: <FiIcon.FiStopCircle />,
  FiSun: <FiIcon.FiSun />,
  FiSunrise: <FiIcon.FiSunrise />,
  FiSunset: <FiIcon.FiSunset />,
  FiTable: <FiIcon.FiTable />,
  FiTablet: <FiIcon.FiTablet />,
  FiTag: <FiIcon.FiTag />,
  FiTarget: <FiIcon.FiTarget />,
  FiTerminal: <FiIcon.FiTerminal />,
  FiThermometer: <FiIcon.FiThermometer />,
  FiThumbsDown: <FiIcon.FiThumbsDown />,
  FiThumbsUp: <FiIcon.FiThumbsUp />,
  FiToggleLeft: <FiIcon.FiToggleLeft />,
  FiToggleRight: <FiIcon.FiToggleRight />,
  FiTool: <FiIcon.FiTool />,
  FiTrash2: <FiIcon.FiTrash2 />,
  FiTrash: <FiIcon.FiTrash />,
  FiTrello: <FiIcon.FiTrello />,
  FiTrendingDown: <FiIcon.FiTrendingDown />,
  FiTrendingUp: <FiIcon.FiTrendingUp />,
  FiTriangle: <FiIcon.FiTriangle />,
  FiTruck: <FiIcon.FiTruck />,
  FiTv: <FiIcon.FiTv />,
  FiTwitch: <FiIcon.FiTwitch />,
  FiTwitter: <FiIcon.FiTwitter />,
  FiType: <FiIcon.FiType />,
  FiUmbrella: <FiIcon.FiUmbrella />,
  FiUnderline: <FiIcon.FiUnderline />,
  FiUnlock: <FiIcon.FiUnlock />,
  FiUploadCloud: <FiIcon.FiUploadCloud />,
  FiUpload: <FiIcon.FiUpload />,
  FiUserCheck: <FiIcon.FiUserCheck />,
  FiUserMinus: <FiIcon.FiUserMinus />,
  FiUserPlus: <FiIcon.FiUserPlus />,
  FiUserX: <FiIcon.FiUserX />,
  FiUser: <FiIcon.FiUser />,
  FiUsers: <FiIcon.FiUsers />,
  FiVideoOff: <FiIcon.FiVideoOff />,
  FiVideo: <FiIcon.FiVideo />,
  FiVoicemail: <FiIcon.FiVoicemail />,
  FiVolume1: <FiIcon.FiVolume1 />,
  FiVolume2: <FiIcon.FiVolume2 />,
  FiVolumeX: <FiIcon.FiVolumeX />,
  FiVolume: <FiIcon.FiVolume />,
  FiWatch: <FiIcon.FiWatch />,
  FiWifiOff: <FiIcon.FiWifiOff />,
  FiWifi: <FiIcon.FiWifi />,
  FiWind: <FiIcon.FiWind />,
  FiXCircle: <FiIcon.FiXCircle />,
  FiXOctagon: <FiIcon.FiXOctagon />,
  FiXSquare: <FiIcon.FiXSquare />,
  FiX: <FiIcon.FiX />,
  FiYoutube: <FiIcon.FiYoutube />,
  FiZapOff: <FiIcon.FiZapOff />,
  FiZap: <FiIcon.FiZap />,
  FiZoomIn: <FiIcon.FiZoomIn />,
  FiZoomOut: <FiIcon.FiZoomOut />,
};
const Sidebar = ({ userLogin }) => {
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});
  const toggleDropdown = (title) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  const IconComponent = ({ iconName }) => {
    const Icon = iconMap[iconName];
    return Icon ? Icon : null;
  };
  const navigate = useNavigate();
  const menus = userLogin?.role?.main_menu;
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
                <div className="flex items-center truncate w-52">
                  {menu.icon && (
                    <span className="mr-2 text-2xl">
                      <IconComponent iconName={menu?.icon} />
                    </span>
                  )}
                  {menu.title}
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
    <div className="h-full bg-eiraButton text-eiraButtonText w-64">
      {renderMenu(menus)}
    </div>
  );
};

export default Sidebar;
