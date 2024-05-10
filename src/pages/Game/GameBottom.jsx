import React, { useState } from "react";
import { FaHome, FaGamepad, FaCog } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";

const GameBottom = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItem = [
    {
      name: "Home",
      icon: FaHome,
      link: "/dashboard",
    },
    {
      name: "Menu",
      icon: RiMenu2Line,
      onClick: () => toggleDropdown(),
    },
    {
      name: "Game",
      icon: FaGamepad,
      link: "/game/colorpridiction",
    },
    {
      name: "Settings",
      icon: FaCog,
      link: "/setting",
    },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-zinc-900 bg-[linear-gradient(to_right,#8080800a_2px,transparent_2px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:21px_30px]">
      <div className="menu_content_container">
        {menuItem.map((item, index) => (
          <div key={index} className="menu_content">
            {item.onClick ? (
              <button onClick={item.onClick} className="menu_button">
                <div className="menu_icons">
                  <item.icon className="menu_icon" />
                </div>
                <p className="text-amber-100 text-lg ">{item.name}</p>
              </button>
            ) : (
              <a href={item.link} className="menu_button">
                <div className="menu_icons">
                  <item.icon className="menu_icon" />
                </div>
                <p className="text-amber-100 text-lg ">{item.name}</p>
              </a>
            )}
          </div>
        ))}
        {isDropdownOpen && (
          <div
            className="dropdown-menu"
            style={{ position: "absolute", top: "calc(100% + 10px)", left: 0 }}
          >
            <a href="/depositform/game" className="dropdown-item">
              Deposit
            </a>
            <a href="/withdrawalform/game" className="dropdown-item">
              Account Update
            </a>
            <a
              href="#staticBackdrop2"
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop2"
            >
              Withdrawal
            </a>
            <a
              href="#staticBackdrop3"
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop3"
            >
              Withdrawal History
            </a>
            <a
              href="#staticBackdrop4"
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop4"
            >
              Deposit History
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBottom;
