import { useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineFileAdd,
  AiOutlineTags,
} from "react-icons/ai";
import { RiArticleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import SideItem from "./SideItem";

import images from "../../assets/images";

const Sidebar = () => {
  const [closedNav, setClosedNav] = useState(false);

  const toggleNav = () => {
    setClosedNav(!closedNav);
  };

  return (
    <div
      className={`${
        closedNav ? "w-16" : "w-56"
      } sticky top-0 min-h-screen transition-width border border-r`}
    >
      <nav>
        {/* Sidebar header */}
        <div className="flex justify-center border-gray-500 border-b">
          <Link to="/" className="p-2">
            <img src={images.logo} alt="" />
          </Link>
          <div className="absolute -right-3 top-2/4 w-6 h-6 flex justify-center items-center bg-primary border border-gray-500 rounded-full">
            <button onClick={toggleNav}>
              {closedNav ? (
                <AiOutlineArrowRight size={16} />
              ) : (
                <AiOutlineArrowLeft size={16} />
              )}
            </button>
          </div>
        </div>
        {/* Sidebar content */}
        <ul>
          <li>
            <SideItem
              to="/"
              icon={<RiArticleLine size={24} />}
              text={"Articles"}
              closed={closedNav}
            />
          </li>
          <li>
            <SideItem
              to="/create-article"
              icon={<AiOutlineFileAdd size={24} />}
              text={"Create Article"}
              closed={closedNav}
            />
          </li>
          <li>
            <SideItem
              to="/tags"
              icon={<AiOutlineTags size={24} />}
              text={"Tags"}
              closed={closedNav}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
